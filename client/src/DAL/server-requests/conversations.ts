import { MessageType } from '@root/models/AppModels';
import { ApiPaths } from '../constants';
import axiosInstance from './AxiosInstance';

const serialize = (obj) =>
    Object.keys(obj)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');

export const sendMessage = async (message: MessageType, conversationId: string): Promise<MessageType> => {
    try {
        const response = await axiosInstance.post(`/${ApiPaths.CONVERSATIONS_PATH}/message`, {
            message,
            conversationId,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendStreamMessage = (
    message: MessageType,
    conversationId: string,
    onMessageReceived: (message: string) => void,
    onCloseStream: (message: MessageType) => void,
    onError: (error?: Event | { code: number; message: string }) => void,
) => {
    const eventSource = new EventSource(
        `${process.env.REACT_APP_API_URL}/${ApiPaths.CONVERSATIONS_PATH}/message/stream?${serialize(
            message,
        )}&conversationId=${conversationId}`,
    );

    eventSource.addEventListener('close', (event) => {
        console.log('Server is closing the connection.');
        const message = JSON.parse(event.data);
        onCloseStream(message);
        eventSource.close();
    });

    eventSource.onmessage = (event) => {
        if (!event.data.trim()) {
            return;
        }

        const data = JSON.parse(event.data);

        if (data.error) {
            if (onError) {
                onError(data.error);
            }
            eventSource.close();
            return;
        }

        onMessageReceived(data.message);
    };

    eventSource.onerror = (error) => {
        if (eventSource.readyState === EventSource.CLOSED) {
            console.log('Connection was closed normally.');
        } else if (onError) {
            onError(error);
        }
        eventSource.close();
    };
};

export const createConversation = async (
    userId: string,
    numberOfConversations: number,
    experimentId: string,
): Promise<string> => {
    try {
        const response = await axiosInstance.post(`/${ApiPaths.CONVERSATIONS_PATH}/create`, {
            userId,
            numberOfConversations,
            experimentId,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getConversation = async (conversationId: string): Promise<MessageType[]> => {
    try {
        const response = await axiosInstance.get(
            `/${ApiPaths.CONVERSATIONS_PATH}/conversation?conversationId=${conversationId}`,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateConversationMetadata = async (
    conversationId: string,
    data: object,
    isPreConversation: boolean,
): Promise<void> => {
    try {
        await axiosInstance.put(`/${ApiPaths.CONVERSATIONS_PATH}/metadata`, {
            conversationId,
            data,
            isPreConversation,
        });
        return;
    } catch (error) {
        throw error;
    }
};

export const finishConversation = async (
    conversationId: string,
    experimentId: string,
    isAdmin: boolean,
): Promise<void> => {
    try {
        await axiosInstance.post(`/${ApiPaths.CONVERSATIONS_PATH}/finish`, {
            conversationId,
            experimentId,
            isAdmin,
        });
        return;
    } catch (error) {
        throw error;
    }
};

export const updateUserAnnotation = async (messageId: string, userAnnotation: number): Promise<void> => {
    try {
        await axiosInstance.put(`/${ApiPaths.CONVERSATIONS_PATH}/annotation`, {
            messageId,
            userAnnotation,
        });
        return;
    } catch (error) {
        throw error;
    }
};
