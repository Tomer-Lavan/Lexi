import mongoose from 'mongoose';

export interface IAgent {
    _id?: mongoose.Types.ObjectId | string;
    title: string;
    summary: string;
    systemStarterPrompt: string;
    beforeUserSentencePrompt: string;
    afterUserSentencePrompt: string;
    firstChatSentence: string;
    model: string;
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    stopSequences: string[];
    createdAt: Date;
    timestamp: number;
}

export interface IAgentLean {
    _id?: mongoose.Types.ObjectId | string;
    title: string;
}
