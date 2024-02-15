import { Schema } from 'mongoose';
import { mongoDbProvider } from '../mongoDBProvider';
import { IAgent } from '../types';

export const agentsSchema = new Schema<IAgent>(
    {
        title: { type: String, required: true },
        summary: { type: String, required: false },
        systemStarterPrompt: { type: String, required: false },
        beforeUserSentencePrompt: { type: String, required: false },
        afterUserSentencePrompt: { type: String, required: false },
        firstChatSentence: { type: String, required: true },
        model: { type: String, required: true },
        temperature: { type: Number },
        maxTokens: { type: Number },
        topP: { type: Number },
        frequencyPenalty: { type: Number },
        presencePenalty: { type: Number },
        stopSequences: { type: [String] },
        createdAt: { type: Date, default: Date.now },
        timestamp: { type: Number, default: () => Date.now() },
    },
    { versionKey: false },
);

export const AgentsModel = mongoDbProvider.getModel('agents', agentsSchema);
