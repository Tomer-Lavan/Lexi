import LoadingDots from '@components/loadig-dots/LoadingDots';
import { Box } from '@mui/material';
import { MessageType } from '@root/models/AppModels';
import Message from './Message';

interface MessageListProps {
    messages: MessageType[];
    isMessageLoading: boolean;
    size: 'sm' | 'lg';
}

const MessageList: React.FC<MessageListProps> = ({ messages, isMessageLoading, size }) => (
    <Box sx={{ height: '100%', padding: 2 }}>
        {messages.map((message, index) => (
            <Message key={index} message={message} role={message.role} size={size} />
        ))}
        {isMessageLoading && <LoadingDots />}
    </Box>
);

export default MessageList;
