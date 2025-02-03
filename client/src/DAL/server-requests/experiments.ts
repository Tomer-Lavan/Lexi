import {
    DisplaySettings,
    ExperimentContentType,
    ExperimentFeatures,
    ExperimentLeanType,
    ExperimentType,
} from '@models/AppModels';
import { ApiPaths } from '../constants';
import axiosInstance from './AxiosInstance';

export const saveExperiment = async (experiment: ExperimentType): Promise<ExperimentType> => {
    try {
        const response = await axiosInstance.post(`/${ApiPaths.EXPERIMENTS_PATH}/create`, { experiment });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getExperiments = async (pageNumber: string, limit: string): Promise<ExperimentType[]> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.EXPERIMENTS_PATH}?page=${pageNumber}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateExperimentsStatus = async (modifiedExperiments: ExperimentType[]): Promise<void> => {
    try {
        await axiosInstance.put(`/${ApiPaths.EXPERIMENTS_PATH}/status`, { modifiedExperiments });
        return;
    } catch (error) {
        throw error;
    }
};

export const getExperimentContent = async (experimentId: string): Promise<ExperimentContentType> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.EXPERIMENTS_PATH}/${experimentId}/content`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getExperimentsByAgent = async (agentId: string): Promise<ExperimentLeanType[]> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.EXPERIMENTS_PATH}/agent?agentId=${agentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateExperiment = async (experiment: ExperimentType): Promise<void> => {
    try {
        await axiosInstance.put(`/${ApiPaths.EXPERIMENTS_PATH}`, { experiment });
        return;
    } catch (error) {
        throw error;
    }
};

export const updateExperimentDisplaySettings = async (
    experimentId: string,
    displaySettings: DisplaySettings,
): Promise<void> => {
    try {
        await axiosInstance.put(`/${ApiPaths.EXPERIMENTS_PATH}/content`, {
            experimentId,
            displaySettings,
        });
        return;
    } catch (error) {
        throw error;
    }
};

export const getExperimentRegistrationForm = async (experimentId) => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.EXPERIMENTS_PATH}/${experimentId}/registrationForm`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getExperimentCoversationForms = async (experimentId) => {
    try {
        const response = await axiosInstance.get(
            `/${ApiPaths.EXPERIMENTS_PATH}/${experimentId}/conversationForms`,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getExperimentFeatures = async (experimentId: string): Promise<ExperimentFeatures> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.EXPERIMENTS_PATH}/${experimentId}/features`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteExperiment = async (experimentId: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/${ApiPaths.EXPERIMENTS_PATH}/${experimentId}`);
        return;
    } catch (error) {
        throw error;
    }
};
