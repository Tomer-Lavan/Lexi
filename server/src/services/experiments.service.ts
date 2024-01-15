import mongoose, { UpdateWriteOpResult } from 'mongoose';
import { ExperimentsModel } from '../models/ExperimentsModel';
import { ABAgents, AgentConfig, AgentsMode, DisplaySettings, IAgent, IExperiment } from '../types';

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

    updateActiveAgent = async (
        experimentId: string,
        agent: IAgent,
        agentsConfig: AgentConfig,
        abAgents: ABAgents,
    ): Promise<UpdateWriteOpResult> => {
        const updateFields = { agentsConfig };
        if (agentsConfig === AgentConfig.SINGLE) {
            updateFields['activeAgent'] = agent;
        } else {
            updateFields['abAgents'] = abAgents;
        }
        const response = await ExperimentsModel.updateOne(
            { _id: new mongoose.Types.ObjectId(experimentId) },
            { $set: updateFields },
        );

        return response;
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
        if (experiment.agentsMode === AgentsMode.SINGLE) {
            return experiment.activeAgent;
        }

        const rand = Math.random() * 100;
        if (experiment.abAgents.distA >= rand) {
            return experiment.abAgents.agentA;
        }
        return experiment.abAgents.agentB;
    }
}

export const experimentsService = new ExperimentsService();
