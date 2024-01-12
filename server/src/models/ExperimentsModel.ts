import { Schema } from 'mongoose';
import { mongoDbProvider } from '../mongoDBProvider';
import { ABAgents, IExperiment } from '../types';
import { agentsSchema } from './AgentsModel';

const AbAgentsSchema = new Schema<ABAgents>({
    distA: { type: Number, required: true },
    modelA: { type: agentsSchema, required: true },
    distB: { type: Number, required: true },
    modelB: { type: agentsSchema, required: true },
});

export const experimentsSchema = new Schema<IExperiment>(
    {
        modelsMode: { type: String, required: true },
        activeModel: { type: agentsSchema },
        abModels: { type: AbAgentsSchema },
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
