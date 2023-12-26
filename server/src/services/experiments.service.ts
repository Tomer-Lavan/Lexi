import mongoose from 'mongoose';
import {
    ExperimentsDocument,
    ModelConfig,
    ModelsMode,
    SettingsDocument,
    experimentsSchema,
} from '../models/DbModels';
import { mongoDbProvider } from '../mongoDBProvider';

const ExperimentsModel = mongoDbProvider.getModel('experiments', experimentsSchema);

class ExperimentsService {
    async createExperiment(experiment) {
        const response = await ExperimentsModel.create(experiment);
        return response;
    }

    async getExperiment(experimentId): Promise<ExperimentsDocument> {
        const experiment: ExperimentsDocument = await ExperimentsModel.findOne({
            _id: new mongoose.Types.ObjectId(experimentId),
        });
        return experiment;
    }

    async getExperiments(): Promise<any[]> {
        const experiments = await ExperimentsModel.find({});
        return experiments;
    }

    updateExperiment = async (experiment): Promise<any> => {
        const response = await ExperimentsModel.updateOne({ _id: experiment._id }, { $set: experiment });
        return response;
    };

    addParticipant = async (experimentId): Promise<any> => {
        const experimentModel = mongoDbProvider.getModel('experiments', experimentsSchema);

        const updatedExperiment = await experimentModel.findOneAndUpdate(
            { _id: experimentId },
            { $inc: { numberOfParticipants: 1 } },
            { new: true },
        );

        return updatedExperiment;
    };

    updateActiveModel = async (experimentId, model: SettingsDocument, modelsConfig?, abModels?) => {
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

    updateExperimentDisplaySettings = async (experimentId, displaySettings) => {
        const response = await ExperimentsModel.updateOne(
            { _id: new mongoose.Types.ObjectId(experimentId) },
            { $set: { displaySettings } },
        );

        return response;
    };

    updateExperimentsStatus = async (experimentsUpdates) => {
        const bulkOperations = experimentsUpdates.map((update) => ({
            updateOne: {
                filter: { _id: new mongoose.Types.ObjectId(update.id) }, // assuming _id is used as the identifier
                update: { $set: { isActive: update.isActive } },
            },
        }));
        const response = await ExperimentsModel.bulkWrite(bulkOperations);

        return response;
    };

    async getActiveModel(experimentId): Promise<SettingsDocument> {
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
