import mongoose from 'mongoose';
import { IAgent } from '../types/agents.type';

export interface ABAgents {
    agentA: IAgent | mongoose.Types.ObjectId | string;
    distA: number;
    agentB: IAgent | mongoose.Types.ObjectId | string;
    distB: number;
}

export interface DisplaySettings {
    welcomeContent: string;
    welcomeHeader: string;
}

export interface IExperimentLean {
    _id: mongoose.Types.ObjectId;
    title: string;
}

export interface IExperiment {
    _id: mongoose.Types.ObjectId;
    agentsMode: string;
    activeAgent: IAgent | mongoose.Types.ObjectId | string;
    abAgents: ABAgents;
    createdAt: Date;
    timestamp: number;
    displaySettings: DisplaySettings;
    isActive: boolean;
    title: string;
    description: string;
    numberOfParticipants: number;
    maxMessages: number;
    maxConversations: number;
    maxParticipants: number;
    totalSessions: number;
    openSessions: number;
}
