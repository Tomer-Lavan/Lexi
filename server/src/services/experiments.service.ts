import mongoose, { UpdateWriteOpResult } from 'mongoose';
import { ExperimentsModel } from '../models/ExperimentsModel';
import { ABAgents, DisplaySettings, IAgent, IExperiment, ModelConfig, ModelsMode } from '../types';

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

    updateActiveModel = async (
        experimentId: string,
        model: IAgent,
        modelsConfig: ModelConfig,
        abModels: ABAgents,
    ): Promise<UpdateWriteOpResult> => {
        const updateFields = { modelsConfig };
        if (modelsConfig === ModelConfig.SINGLE) {
            updateFields['activeModel'] = model;
        } else {
            updateFields['abModels'] = abModels;
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

    async getActiveModel(experimentId: string): Promise<IAgent> {
        const experiment = await this.getExperiment(experimentId);
        if (experiment.modelsMode === ModelsMode.SINGLE) {
            return experiment.activeModel;
        }

        const rand = Math.random() * 100;
        if (experiment.abModels.distA >= rand) {
            return experiment.abModels.modelA;
        }
        return experiment.abModels.modelB;
    }
}

export const experimentsService = new ExperimentsService();
