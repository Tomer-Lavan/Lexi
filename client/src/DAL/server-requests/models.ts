import { ModelType } from '@models/AppModels';
import { ApiPaths } from '../constants';
import axiosInstance from './AxiosInstance';

export const saveModel = async (model: ModelType, isActiveModel = false): Promise<ModelType> => {
    try {
        const response = await axiosInstance.post(`/${ApiPaths.MODELS_PATH}`, { model, isActiveModel });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateModel = async (model: ModelType): Promise<void> => {
    try {
        await axiosInstance.put(`/${ApiPaths.MODELS_PATH}`, { model });
        return;
    } catch (error) {
        throw error;
    }
};

export const getModels = async (): Promise<ModelType[]> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.MODELS_PATH}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
