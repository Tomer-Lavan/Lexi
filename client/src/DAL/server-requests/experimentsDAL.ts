import axiosInstance from './AxiosInstance';

const EXPERIMENTS_PATH = 'experiments';

export const saveExperiment = async (experiment): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/${EXPERIMENTS_PATH}/create`, { experiment });
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getExperiments = async (): Promise<any[]> => {
    try {
        const response = await axiosInstance.get(`/${EXPERIMENTS_PATH}`);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const updateExperimentsStatus = async (modifiedExperiments): Promise<any[]> => {
    try {
        const response = await axiosInstance.put(`/${EXPERIMENTS_PATH}/status`, { modifiedExperiments });
        return response.data;
    } catch (error) {
        return null;
    }
};

export const isExperimentActive = async (experimentId): Promise<boolean> => {
    try {
        const response = await axiosInstance.get(`/${EXPERIMENTS_PATH}/${experimentId}/active`);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getExperimentContent = async (experimentId): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/${EXPERIMENTS_PATH}/${experimentId}/content`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateExperiment = async (experiment): Promise<boolean> => {
    try {
        const response = await axiosInstance.put(`/${EXPERIMENTS_PATH}`, { experiment });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateExperimentDisplaySettings = async (experimentId, displaySettings): Promise<boolean> => {
    try {
        const response = await axiosInstance.put(`/${EXPERIMENTS_PATH}/content`, {
            experimentId,
            displaySettings,
        });
        return response.data;
    } catch (error) {
        return null;
    }
};
