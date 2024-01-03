import { UpdateWriteOpResult } from 'mongoose';
import { IAgent } from 'src/types';
import { AgentsModel } from '../models/AgentsModel';

// export interface IAgent {
//     _id: mongoose.Types.ObjectId;
//     title: string;
//     summary: string;
//     systemStarterPrompt: string;
//     beforeUserSentencePrompt: string;
//     afterUserSentencePrompt: string;
//     firstChatSentence: string;
//     chatModel: string;
//     temperature: number;
//     maxTokens: number;
//     topP: number;
//     frequencyPenalty: number;
//     presencePenalty: number;
//     stopSequences: string[];
// }

class ModelsService {
    saveModel = async (settings: IAgent): Promise<IAgent> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...settingsWithNoId } = settings;
        const response = await AgentsModel.create(settingsWithNoId);
        const agent: IAgent = response.toObject();
        return agent;
    };

    getAllModels = async (): Promise<IAgent[]> => {
        const models: IAgent[] = await AgentsModel.find({});
        return models;
    };

    updateModels = async (model: IAgent): Promise<UpdateWriteOpResult> => {
        const response: UpdateWriteOpResult = await AgentsModel.updateOne({ _id: model._id }, { $set: model });
        return response;
    };
}

export const modelsService = new ModelsService();
