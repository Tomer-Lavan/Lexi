import { Box, Typography } from '@mui/material';
import theme from '@root/Theme';
import { MessageType } from '@root/models/AppModels';

interface MessageProps {
    message: MessageType;
    role: string;
    size?: 'sm' | 'lg';
}

const Message: React.FC<MessageProps> = ({ message, role, size = 'lg' }) => {
    const isUser = role === 'user';

    const getFormattedMessage = (content) => {
        const parts = content
            .split(/(\*\*.*?\*\*)/g)
            .map((part) =>
                part.startsWith('**') && part.endsWith('**') ? <b key={part}>{part.slice(2, -2)}</b> : part,
            );
        return parts;
    };

    return (
        <Box
            sx={{
                marginBottom: 1.5,
                padding: '16px 16px 24px 16px',
                borderRadius: isUser ? '26px 26px 0 26px' : '26px 26px 26px 0',
                background: isUser ? theme.palette.userMessage.main : theme.palette.assistantMessage.main,
                maxWidth: '80%',
                display: 'inline-block',
                clear: 'both',
                float: isUser ? 'right' : 'left',
                fontFamily: 'Lato',
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    whiteSpace: 'pre-line',
                    fontSize: size === 'sm' ? '1rem' : '1.25rem',
                    fontWeight: 500,
                }}
            >
                {getFormattedMessage(message.content)}
            </Typography>
        </Box>
    );
};

export default Message;
