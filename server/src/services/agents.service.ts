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
//     chatAgent: string;
//     temperature: number;
//     maxTokens: number;
//     topP: number;
//     frequencyPenalty: number;
//     presencePenalty: number;
//     stopSequences: string[];
// }

class AgentsService {
    saveAgent = async (settings: IAgent): Promise<IAgent> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...settingsWithNoId } = settings;
        const response = await AgentsModel.create(settingsWithNoId);
        const agent: IAgent = response.toObject();
        return agent;
    };

    getAllAgents = async (): Promise<IAgent[]> => {
        const agents: IAgent[] = await AgentsModel.find({});
        return agents;
    };

    updateAgents = async (agent: IAgent): Promise<UpdateWriteOpResult> => {
        const response: UpdateWriteOpResult = await AgentsModel.updateOne({ _id: agent._id }, { $set: agent });
        return response;
    };
}

export const agentsService = new AgentsService();
