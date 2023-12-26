import axiosInstance from './AxiosInstance';

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const CONVERSATIONS_PATH = 'conversations';

const serialize = (obj) =>
    Object.keys(obj)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');

export const sendMessage = async (message: Message, conversationId: string): Promise<{ message: string }> => {
    try {
        const response = await axiosInstance.post(`/${CONVERSATIONS_PATH}/message`, { message, conversationId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendStreamMessage = (message: Message, conversationId: string, onMessageReceived, onError?) => {
    const eventSource = new EventSource(
        `${process.env.REACT_APP_API_URL}/${CONVERSATIONS_PATH}/message/stream?${serialize(
            message,
        )}&conversationId=${conversationId}`,
    );

    eventSource.addEventListener('close', () => {
        console.log('Server is closing the connection.');
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

    eventSource.onerror = () => {
        if (eventSource.readyState === EventSource.CLOSED) {
            console.log('Connection was closed normally.');
        } else if (onError) {
            onError();
        }
        eventSource.close();
    };
};

export const createConversation = async (userId, numberOfConversations, experimentId): Promise<string> => {
    try {
        const response = await axiosInstance.post(`/${CONVERSATIONS_PATH}/create`, {
            userId,
            numberOfConversations,
            experimentId,
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getConversation = async (conversationId): Promise<Message[]> => {
    try {
        const response = await axiosInstance.get(
            `/${CONVERSATIONS_PATH}/conversation?conversationId=${conversationId}`,
        );
        return response.data;
    } catch (error) {
        return null;
    }
};

export const updateIMS = async (conversationId, imsValues, isPreConversation): Promise<any> => {
    try {
        const response = await axiosInstance.put(`/${CONVERSATIONS_PATH}/ims`, {
            conversationId,
            imsValues,
            isPreConversation,
        });
        return response.data;
    } catch (error) {
        return null;
    }
};
