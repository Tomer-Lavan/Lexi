import mongoose from 'mongoose';

export interface ABAgents {
    agentA: string;
    distA: number;
    agentB: string;
    distB: number;
}

export interface DisplaySettings {
    welcomeContent: string;
    welcomeHeader: string;
}

export interface ExperimentForms {
    registration: string;
    preConversation: string;
    postConversation: string;
}

export interface ExperimentFeatures {
    userAnnotation: boolean;
    streamMessage: boolean;
}

export interface IExperimentLean {
    _id: mongoose.Types.ObjectId;
    title: string;
}

export interface IExperiment {
    _id: mongoose.Types.ObjectId;
    agentsMode: string;
    activeAgent: string;
    abAgents: ABAgents;
    createdAt: Date;
    timestamp: number;
    displaySettings: DisplaySettings;
    isActive: boolean;
    title: string;
    description: string;
    numberOfParticipants: number;
    experimentForms: ExperimentForms;
    maxMessages: number;
    maxConversations: number;
    maxParticipants: number;
    totalSessions: number;
    openSessions: number;
    experimentFeatures: ExperimentFeatures;
}
