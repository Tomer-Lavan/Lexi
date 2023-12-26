import axiosInstance from './AxiosInstance';

const MODELS_PATH = 'models';

export const saveModel = async (model, isActiveModel = false): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/${MODELS_PATH}`, { model, isActiveModel });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateModel = async (model): Promise<any> => {
    try {
        const response = await axiosInstance.put(`/${MODELS_PATH}`, { model });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getModels = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/${MODELS_PATH}`);
        return response.data;
    } catch (error) {
        return null;
    }
};
