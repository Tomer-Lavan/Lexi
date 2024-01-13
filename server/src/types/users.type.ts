import mongoose from 'mongoose';
import { IAgent } from '../types/agents.type';

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    experimentId: string;
    username: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    biologicalSex: string;
    maritalStatus: string;
    religiousAffiliation: string;
    ethnicity: string;
    politicalAffiliation: string;
    childrenNumber: number;
    createdAt: Date;
    timestamp: number;
    isAdmin: boolean;
    password?: string;
    numberOfConversations: number;
    agent: IAgent;
}
