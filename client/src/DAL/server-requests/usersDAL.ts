import { UserType } from '../../models/AppModels';
import axiosInstance from './AxiosInstance';

const USERS_PATH = 'users';

export const getActiveUser = async (): Promise<UserType> => {
    try {
        const response = await axiosInstance.get(`/${USERS_PATH}/user`);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const register = async (userInfo, experimentId) => {
    const response = await axiosInstance.post(`/${USERS_PATH}/create`, { userInfo, experimentId });
    return response.data;
};

export const login = async (nickname, userPassword, experimentId) => {
    try {
        const response = await axiosInstance.post(`/${USERS_PATH}/login`, {
            nickname,
            userPassword,
            experimentId,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axiosInstance.post(`/${USERS_PATH}/logout`);
        return response.data;
    } catch {
        return null;
    }
};

export const checkUserNotExist = async (nickname, experimentId) => {
    try {
        const response = await axiosInstance.get(
            `/${USERS_PATH}/checkUserNotExist?nickname=${nickname}&experimentId=${experimentId}`,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
