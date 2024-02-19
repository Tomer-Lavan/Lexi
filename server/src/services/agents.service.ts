import { UpdateWriteOpResult } from 'mongoose';
import { IAgent } from 'src/types';
import { AgentsModel } from '../models/AgentsModel';

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
