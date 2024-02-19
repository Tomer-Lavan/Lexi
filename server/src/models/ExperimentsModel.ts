import mongoose, { Schema } from 'mongoose';
import { mongoDbProvider } from '../mongoDBProvider';
import { ABAgents, IExperiment } from '../types';

const AbAgentsSchema = new Schema<ABAgents>({
    distA: { type: Number, required: true },
    agentA: { type: mongoose.Schema.Types.Mixed, required: true },
    distB: { type: Number, required: true },
    agentB: { type: mongoose.Schema.Types.Mixed, required: true },
});

export const experimentsSchema = new Schema<IExperiment>(
    {
        agentsMode: { type: String, required: true },
        activeAgent: { type: mongoose.Schema.Types.Mixed },
        abAgents: { type: AbAgentsSchema },
        createdAt: { type: Date, default: Date.now },
        timestamp: { type: Number, default: () => Date.now() },
        displaySettings: { type: Object },
        isActive: { type: Boolean },
        title: { type: String },
        description: { type: String },
        numberOfParticipants: { type: Number, default: () => 0 },
        maxMessages: { type: Number },
        maxConversations: { type: Number },
        maxParticipants: { type: Number },
        totalSessions: { type: Number, default: () => 0 },
        openSessions: { type: Number, default: () => 0 },
    },
    { versionKey: false },
);

export const ExperimentsModel = mongoDbProvider.getModel('experiments', experimentsSchema);
