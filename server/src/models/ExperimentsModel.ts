import { Schema } from 'mongoose';
import { mongoDbProvider } from '../mongoDBProvider';
import { ABAgents, IExperiment } from '../types';
import { agentsSchema } from './AgentsModel';

const AbAgentsSchema = new Schema<ABAgents>({
    distA: { type: Number, required: true },
    agentA: { type: agentsSchema, required: true },
    distB: { type: Number, required: true },
    agentB: { type: agentsSchema, required: true },
});

export const experimentsSchema = new Schema<IExperiment>(
    {
        agentsMode: { type: String, required: true },
        activeAgent: { type: agentsSchema },
        abAgents: { type: AbAgentsSchema },
        createdAt: { type: Date, default: Date.now },
        timestamp: { type: Number, default: () => Date.now() },
        displaySettings: { type: Object },
        isActive: { type: Boolean },
        title: { type: String },
        description: { type: String },
        numberOfParticipants: { type: Number, default: () => 0 },
    },
    { versionKey: false },
);

export const ExperimentsModel = mongoDbProvider.getModel('experiments', experimentsSchema);
