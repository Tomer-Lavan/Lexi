import { UpdateWriteOpResult } from 'mongoose';
import { IAgent, IAgentLean } from 'src/types';
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

    getAgent = async (agentId: string): Promise<IAgent> => {
        const agent: IAgent = await AgentsModel.findOne({ _id: agentId });
        return agent;
    };

    getAgentLean = async (agentId: string): Promise<IAgentLean> => {
        const agent: IAgentLean = await AgentsModel.findOne({ _id: agentId }, { _id: 1, title: 1 });
        return agent;
    };

    updateAgents = async (agent: IAgent): Promise<UpdateWriteOpResult> => {
        const response: UpdateWriteOpResult = await AgentsModel.updateOne({ _id: agent._id }, { $set: agent });
        return response;
    };

    deleteAgent = async (agentId: string): Promise<void> => {
        await AgentsModel.deleteOne({ _id: agentId });
    };
}

export const agentsService = new AgentsService();
