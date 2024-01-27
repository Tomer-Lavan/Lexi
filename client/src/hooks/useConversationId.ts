import { useParams } from 'react-router-dom';

export const useConversationId = () => {
    const { conversationId } = useParams();
    return conversationId;
};
