/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UsersModel } from '../models/UsersModel';
import { IAgent, IUser } from '../types';
import { experimentsService } from './experiments.service';

dotenv.config();

class UsersService {
    createAdminUser = async (username: string, password: string): Promise<IUser> => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UsersModel.create({
            username,
            password: hashedPassword,
            isAdmin: true,
        });

        return user;
    };

    createUser = async (user: IUser, experimentId: string): Promise<{ user: IUser; token: string }> => {
        const { username, age, gender, biologicalSex, maritalStatus, childrenNumber, nativeEnglishSpeaker } = user;
        const [agent, experiment] = await Promise.all([
            experimentsService.getActiveAgent(experimentId),
            experimentsService.getExperiment(experimentId),
        ]);

        if (experiment.maxParticipants && experiment.numberOfParticipants + 1 > experiment.maxParticipants) {
            const error = new Error('Experiment Participants Limit Exceeded');
            error['code'] = 403;
            throw error;
        }

        const res = await UsersModel.create({
            experimentId,
            username,
            age,
            gender,
            biologicalSex,
            maritalStatus,
            childrenNumber,
            nativeEnglishSpeaker,
            agent,
        });

        const savedUser = res.toObject() as IUser;

        await experimentsService.addParticipant(experimentId);
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY);
        return { user: savedUser, token };
    };

    login = async (
        username: string,
        experimentId?: string,
        userPassword?: string,
    ): Promise<{ user: IUser; token?: string }> => {
        const user: IUser = await this.getUserByName(username, experimentId);

        if (!user) {
            const error = new Error('Invalid User Name');
            error['code'] = 401;
            throw error;
        }

        if (user.isAdmin && !userPassword) {
            const { password, ...userWithoutPassword } = user;
            return { user: userWithoutPassword };
        }

        if (user.isAdmin && userPassword) {
            const passwordIsValid = await bcrypt.compare(userPassword, user.password);
            if (!passwordIsValid) {
                const error = new Error('Invalid Password');
                error['code'] = 401;
                throw error;
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        const { password, ...userWithoutPassword } = user;

        return { token, user: userWithoutPassword };
    };

    getActiveUser = async (token: string): Promise<{ user: IUser; newToken: string }> => {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user: IUser = await UsersModel.findOne({ _id: decoded.id }).lean();

        if (!user) throw Object.assign(new Error('User not found'), { status: 401 });

        const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY);
        const { password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, newToken };
    };

    addConversation = async (userId: string): Promise<IUser> => {
        const updatedUser: IUser = await UsersModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(userId) },
            { $inc: { numberOfConversations: 1 } },
            { new: true },
        );

        return updatedUser;
    };

    getUserByName = async (userName: string, experimentId: string): Promise<IUser> => {
        const user: IUser = await UsersModel.findOne({
            $or: [
                { username: userName, isAdmin: true },
                { username: userName, experimentId },
            ],
        }).lean();
        return user;
    };

    getUserById = async (userId: string): Promise<IUser> => {
        const user: IUser = await UsersModel.findOne({ _id: new mongoose.Types.ObjectId(userId) }).lean();
        return user;
    };

    getExperimentUsers = async (experimentId: string): Promise<any[]> => {
        const users = await UsersModel.aggregate([
            { $match: { experimentId } },
            { $group: { _id: '$agent._id', agent: { $first: '$agent' }, data: { $push: '$$ROOT' } } },
            { $project: { _id: 0, agent: 1, data: 1 } },
        ]);

        return users;
    };

    updateUsersAgent = async (agent: IAgent): Promise<void> => {
        const agentId = new mongoose.Types.ObjectId(agent._id);
        await UsersModel.updateMany({ 'agent._id': agentId }, { $set: { agent } });
    };

    deleteExperimentUsers = async (experimentId: string): Promise<void> => {
        await UsersModel.deleteMany({ experimentId });
    };
}

export const usersService = new UsersService();
