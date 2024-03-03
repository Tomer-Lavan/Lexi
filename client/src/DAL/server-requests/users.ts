import { AgentType, NewUserInfoType, UserType } from '@models/AppModels';
import { ApiPaths } from '../constants';
import axiosInstance from './AxiosInstance';

export const getActiveUser = async (): Promise<UserType> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.USERS_PATH}/user`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (userInfo: NewUserInfoType, experimentId: string): Promise<UserType> => {
    try {
        const response = await axiosInstance.post(`/${ApiPaths.USERS_PATH}/create`, { userInfo, experimentId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (
    username: string,
    userPassword: string,
    experimentId: string,
): Promise<{ token: string; user: UserType }> => {
    try {
        const response = await axiosInstance.post(`/${ApiPaths.USERS_PATH}/login`, {
            username,
            userPassword,
            experimentId,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axiosInstance.post(`/${ApiPaths.USERS_PATH}/logout`);
        return;
    } catch (error) {
        throw error;
    }
};

export const validateUserName = async (username: string, experimentId: string): Promise<boolean> => {
    try {
        const response = await axiosInstance.get(
            `/${ApiPaths.USERS_PATH}/validate?username=${username}&experimentId=${experimentId}`,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUsersAgent = async (agent: AgentType): Promise<void> => {
    try {
        const response = await axiosInstance.put(`/${ApiPaths.USERS_PATH}/agent`, { agent });
        return response.data;
    } catch (error) {
        throw error;
    }
};
