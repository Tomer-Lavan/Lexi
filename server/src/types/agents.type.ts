import mongoose from 'mongoose';

export interface IAgent {
    _id?: mongoose.Types.ObjectId;
    title: string;
    summary: string;
    systemStarterPrompt: string;
    beforeUserSentencePrompt: string;
    afterUserSentencePrompt: string;
    firstChatSentence: string;
    chatModel: string;
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    stopSequences: string[];
}
