import mongoose from 'mongoose';
import { IAgent } from '../types/agents.type';

export interface ABAgents {
    modelA: IAgent;
    distA: number;
    modelB: IAgent;
    distB: number;
}

export interface DisplaySettings {
    welcomeContent: string;
    welcomeHeader: string;
}

export interface IExperiment {
    _id: mongoose.Types.ObjectId;
    modelsMode: string;
    activeModel: IAgent;
    abModels: ABAgents;
    createdAt: Date;
    timestamp: number;
    displaySettings: DisplaySettings;
    isActive: boolean;
    title: string;
    description: string;
    numberOfParticipants: number;
}
