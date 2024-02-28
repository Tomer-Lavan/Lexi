import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Box, Typography } from '@mui/material';
import theme from '@root/Theme';
import { MessageType } from '@root/models/AppModels';

interface MessageProps {
    message: MessageType;
    role: string;
    size?: 'sm' | 'lg';
    experimentHasUserAnnotation: boolean;
    handleUpdateUserAnnotation: (messageId, userAnnotation) => void;
}

const Message: React.FC<MessageProps> = ({
    experimentHasUserAnnotation,
    size = 'lg',
    message,
    role,
    handleUpdateUserAnnotation,
}) => {
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
                maxWidth: '80%',
                display: 'inline-block',
                float: isUser ? 'right' : 'left',
                clear: 'both',
            }}
        >
            <Box display={'flex'} flexDirection={'column'}>
                <Box
                    sx={{
                        marginBottom: 1,
                        padding: '16px 16px 24px 16px',
                        borderRadius: isUser ? '26px 26px 0 26px' : '26px 26px 26px 0',
                        background: isUser ? theme.palette.userMessage.main : theme.palette.assistantMessage.main,
                        // maxWidth: '80%',
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
                {!isUser && experimentHasUserAnnotation && (
                    <Box display={'flex'} gap={1}>
                        {message.userAnnotation === 1 ? (
                            <ThumbUpIcon
                                color="secondary"
                                style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                                onClick={async () => handleUpdateUserAnnotation(message._id, 0)}
                            />
                        ) : (
                            <ThumbUpOutlinedIcon
                                color="secondary"
                                style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                                onClick={async () => handleUpdateUserAnnotation(message._id, 1)}
                            />
                        )}
                        {message.userAnnotation === -1 ? (
                            <ThumbDownIcon
                                color="secondary"
                                style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                                onClick={async () => handleUpdateUserAnnotation(message._id, 0)}
                            />
                        ) : (
                            <ThumbDownOutlinedIcon
                                color="secondary"
                                style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                                onClick={async () => handleUpdateUserAnnotation(message._id, -1)}
                            />
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Message;
