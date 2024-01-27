import LoadingDots from '@components/loadig-dots/LoadingDots';
import { Box } from '@mui/material';
import { MessageType } from '@root/models/AppModels';
import Message from './Message';

interface MessageListProps {
    isMobile: boolean;
    messages: MessageType[];
    isMessageLoading: boolean;
    size: 'sm' | 'lg';
}

const MessageList: React.FC<MessageListProps> = ({ isMobile, messages, isMessageLoading, size }) => (
    <Box height="100%" width={isMobile ? '100%' : '85%'} padding={2}>
        {messages.map((message, index) => (
            <Message key={index} message={message} role={message.role} size={size} />
        ))}
        {isMessageLoading && <LoadingDots />}
    </Box>
);

export default MessageList;
