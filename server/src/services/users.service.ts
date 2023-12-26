/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UserDocument, userSchema } from '../models/DbModels';
import { mongoDbProvider } from '../mongoDBProvider';
import { experimentsService } from './experiments.service';

dotenv.config();

class UsersService {
    createUser = async (user: UserDocument, experimentId) => {
        const {
            nickname,
            age,
            gender,
            biologicalSex,
            maritalStatus,
            religiousAffiliation,
            ethnicity,
            politicalAffiliation,
            childrenNumber,
        } = user;
        const usersModel = mongoDbProvider.getModel('users', userSchema);
        // const hashedPassword = await bcrypt.hash(password, 10);
        const model = await experimentsService.getActiveModel(experimentId);
        const res = await usersModel.create({
            experimentId,
            nickname,
            age,
            gender,
            biologicalSex,
            maritalStatus,
            religiousAffiliation,
            ethnicity,
            politicalAffiliation,
            childrenNumber,
            model,
            // password: hashedPassword
        });

        experimentsService.addParticipant(experimentId);
        const token = jwt.sign({ id: res._id }, process.env.JWT_SECRET_KEY);
        return { user: res, token };
    };

    login = async (nickname, experimentId?, userPassword?) => {
        const user: UserDocument = await this.getUserByName(nickname, experimentId);

        if (!user) {
            const error = new Error('Invalid Nickname');
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

    getActiveUser = async (token) => {
        const usersModel = mongoDbProvider.getModel('users', userSchema);

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user: UserDocument = await usersModel.findOne({ _id: decoded.id }).lean();

        if (!user) throw Object.assign(new Error('User not found'), { status: 401 });

        const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY);
        const { password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, newToken };
    };

    updateUser = async (filter, fields) => {
        const usersModel = mongoDbProvider.getModel('users', userSchema);

        const res = await usersModel.updateMany(filter, { $set: fields });

        return res;
    };

    getUserByName = async (userName, experimentId) => {
        const usersModel = mongoDbProvider.getModel('users', userSchema);

        const user: UserDocument = await usersModel
            .findOne({
                $or: [
                    { nickname: userName, isAdmin: true },
                    { nickname: userName, experimentId },
                ],
            })
            .lean();
        return user;
    };

    getUserById = async (userId) => {
        const usersModel = mongoDbProvider.getModel('users', userSchema);

        const user: UserDocument = await usersModel.findOne({ _id: new mongoose.Types.ObjectId(userId) }).lean();
        return user;
    };

    getExperimentUsers = async (experimentId) => {
        const usersModel = mongoDbProvider.getModel('users', userSchema);

        const users = await usersModel.aggregate([
            { $match: { experimentId } },
            { $group: { _id: '$model', data: { $push: '$$ROOT' } } },
            { $project: { _id: 0, model: '$_id', data: 1 } },
        ]);

        return users;
    };
}

export const usersService = new UsersService();
