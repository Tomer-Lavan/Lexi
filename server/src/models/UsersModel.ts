import { Schema } from 'mongoose';
import { mongoDbProvider } from '../mongoDBProvider';
import { IUser } from '../types';
import { agentsSchema } from './AgentsModel';

export const userSchema = new Schema<IUser>(
    {
        experimentId: {
            type: String,
            required() {
                return !this.isAdmin;
            },
        },
        nickname: { type: String, required: true, unique: true },
        age: { type: Number },
        gender: { type: String },
        biologicalSex: { type: String },
        maritalStatus: { type: String },
        religiousAffiliation: { type: String },
        ethnicity: { type: String },
        politicalAffiliation: { type: String },
        childrenNumber: { type: Number },
        createdAt: { type: Date, default: Date.now },
        timestamp: { type: Number, default: () => Date.now() },
        isAdmin: { type: Boolean, default: () => false },
        password: { type: String },
        numberOfConversations: { type: Number, default: () => 0 },
        model: {
            type: agentsSchema,
            required() {
                return !this.isAdmin;
            },
        },
    },
    { versionKey: false },
);

export const UsersModel = mongoDbProvider.getModel('users', userSchema);
