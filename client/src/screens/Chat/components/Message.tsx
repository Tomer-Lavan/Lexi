import { Box, Typography } from '@mui/material';

const Message = ({ message, role, size = 'lg' }) => {
    const isUser = role === 'user';

    // Function to split the message content into regular and bold segments
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
                background: !isUser ? 'rgba(228, 193, 173, 0.7)' : 'rgba(0, 112, 243, 0.15)',
                maxWidth: '80%',
                display: 'inline-block',
                clear: 'both',
                float: isUser ? 'right' : 'left',
                fontFamily: 'Lato',
            }}
        >
            <Typography
                variant="body2"
                sx={{ whiteSpace: 'pre-line', fontSize: size === 'sm' ? '1rem' : '1.25rem', fontWeight: 450 }}
            >
                {getFormattedMessage(message.content)}
            </Typography>
        </Box>
    );
};

export default Message;