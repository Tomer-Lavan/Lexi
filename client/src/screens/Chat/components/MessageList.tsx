import { Box } from '@mui/material';
import LoadingDots from '../../../components/loadig-dots/LoadingDots';
import Message from './Message';

const MessageList = (props) => {
    const { messages, isMessageLoading, size } = props;

    return (
        <Box sx={{ height: '100%', padding: 2 }}>
            {messages.map((message, index) => (
                <Message key={index} message={message} role={message.role} size={size} />
            ))}
            {isMessageLoading && <LoadingDots />}
        </Box>
    );
};

export default MessageList;
