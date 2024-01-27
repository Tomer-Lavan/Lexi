import { AgentType } from '@models/AppModels';
import { ApiPaths } from '../constants';
import axiosInstance from './AxiosInstance';

export const saveAgent = async (agent: AgentType, isActiveAgent = false): Promise<AgentType> => {
    try {
        const response = await axiosInstance.post(`/${ApiPaths.AGENTS_PATH}`, { agent, isActiveAgent });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateAgent = async (agent: AgentType): Promise<void> => {
    try {
        await axiosInstance.put(`/${ApiPaths.AGENTS_PATH}`, { agent });
        return;
    } catch (error) {
        throw error;
    }
};

export const getAgents = async (): Promise<AgentType[]> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.AGENTS_PATH}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
