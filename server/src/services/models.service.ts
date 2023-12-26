import { SettingsDocument, settingsSchema } from '../models/DbModels';
import { mongoDbProvider } from '../mongoDBProvider';

const ModelsModel = mongoDbProvider.getModel('settings', settingsSchema);

class ModelsService {
    saveModel = async (settings: SettingsDocument): Promise<any> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...settingsWithNoId } = settings;
        const response = await ModelsModel.create(settingsWithNoId);
        return response;
    };

    async getAllModels(): Promise<any[]> {
        const models = await ModelsModel.find({});
        return models;
    }

    async updateModels(model): Promise<any> {
        const response = await ModelsModel.updateOne({ _id: model._id }, { $set: model });
        return response;
    }
}

export const modelsService = new ModelsService();
