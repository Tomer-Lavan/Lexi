import mongoose from 'mongoose';
import { IAgent } from '../types/agents.type';

export interface IConversation {
    conversationId: string;
    content: string;
    role: string;
    createdAt: Date;
    timestamp: number;
    messageNumber: number;
}

export interface IMetadataConversation {
    _id: mongoose.Types.ObjectId;
    experimentId: string;
    messagesNumber: number;
    createdAt: Date;
    timestamp: number;
    lastMessageDate: Date;
    lastMessageTimestamp: number;
    conversationNumber: number;
    model: IAgent;
    userId: string;
    imsPre?: object;
    imsPost?: object;
}
