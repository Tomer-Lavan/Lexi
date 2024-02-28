import mongoose, { UpdateWriteOpResult } from 'mongoose';
import { ExperimentsModel } from '../models/ExperimentsModel';
import { AgentsMode, DisplaySettings, ExperimentFeatures, IAgent, IExperiment, IExperimentLean } from '../types';
import { agentsService } from './agents.service';

type BulkWriteResult = ReturnType<typeof ExperimentsModel.bulkWrite>;

class ExperimentsService {
    async createExperiment(experiment: IExperiment): Promise<IExperiment> {
        const response = await ExperimentsModel.create(experiment);
        return response;
    }

    async getExperiment(experimentId: string): Promise<IExperiment> {
        const experiment = await ExperimentsModel.findOne({
            _id: new mongoose.Types.ObjectId(experimentId),
        });
        return experiment;
    }

    async getExperiments(): Promise<IExperiment[]> {
        const experiments = await ExperimentsModel.find({});
        return experiments;
    }

    updateExperiment = async (experiment: IExperiment): Promise<UpdateWriteOpResult> => {
        const response = await ExperimentsModel.updateOne({ _id: experiment._id }, { $set: experiment });
        return response;
    };

    addParticipant = async (experimentId: string): Promise<IExperiment> => {
        const updatedExperiment = await ExperimentsModel.findOneAndUpdate(
            { _id: experimentId },
            { $inc: { numberOfParticipants: 1 } },
            { new: true },
        );

        return updatedExperiment;
    };

    addSession = async (experimentId: string): Promise<IExperiment> => {
        const updatedExperiment = await ExperimentsModel.findOneAndUpdate(
            { _id: experimentId },
            { $inc: { totalSessions: 1, openSessions: 1 } },
            { new: true },
        );

        return updatedExperiment;
    };

    closeSession = async (experimentId: string): Promise<IExperiment> => {
        const updatedExperiment = await ExperimentsModel.findOneAndUpdate(
            { _id: experimentId },
            { $inc: { openSessions: -1 } },
            { new: true },
        );

        return updatedExperiment;
    };

    updateExperimentDisplaySettings = async (
        experimentId: string,
        displaySettings: DisplaySettings,
    ): Promise<UpdateWriteOpResult> => {
        const response = await ExperimentsModel.updateOne(
            { _id: new mongoose.Types.ObjectId(experimentId) },
            { $set: { displaySettings } },
        );

        return response;
    };

    updateExperimentsStatus = async (experimentsUpdates: any[]): Promise<BulkWriteResult> => {
        const bulkOperations = experimentsUpdates.map((update) => ({
            updateOne: {
                filter: { _id: new mongoose.Types.ObjectId(update.id) },
                update: { $set: { isActive: update.isActive } },
            },
        }));
        const response = await ExperimentsModel.bulkWrite(bulkOperations);

        return response;
    };

    async getActiveAgent(experimentId: string): Promise<IAgent> {
        const experiment = await this.getExperiment(experimentId);
        let agentId;
        if (experiment.agentsMode === AgentsMode.SINGLE) {
            agentId = experiment.activeAgent;
        } else {
            const rand = Math.random() * 100;
            if (experiment.abAgents.distA >= rand) {
                agentId = experiment.abAgents.agentA;
            } else {
                agentId = experiment.abAgents.agentB;
            }
        }

        const agent = await agentsService.getAgent(agentId);
        return agent;
    }

    async getExperimentBoundries(
        experimentId: string,
    ): Promise<{ maxMessages: number; maxConversations: number; maxParticipants: number }> {
        const result = await ExperimentsModel.findOne(
            { _id: new mongoose.Types.ObjectId(experimentId) },
            { maxMessages: 1, maxConversations: 1, maxParticipants: 1 },
        );
        return result;
    }

    async getExperimentFeatures(experimentId: string): Promise<ExperimentFeatures> {
        const result: { experimentFeatures: ExperimentFeatures } = await ExperimentsModel.findOne(
            { _id: new mongoose.Types.ObjectId(experimentId) },
            { experimentFeatures: 1 },
        );
        return result?.experimentFeatures;
    }

    async getAllExperimentsByAgentId(agentId: string): Promise<IExperimentLean[]> {
        const result = await ExperimentsModel.find(
            {
                $or: [{ activeAgent: agentId }, { 'abAgents.agentA': agentId }, { 'abAgents.agentB': agentId }],
            },
            { _id: 1, title: 1 },
        );
        return result;
    }

    async deleteExperiment(experimentId): Promise<void> {
        await ExperimentsModel.deleteOne({ _id: experimentId });
    }
}

export const experimentsService = new ExperimentsService();
