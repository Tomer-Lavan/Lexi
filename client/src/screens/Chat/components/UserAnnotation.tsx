import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Box } from '@mui/material';
import { MessageType } from '@root/models/AppModels';

interface MessageProps {
    message: MessageType;
    handleUpdateUserAnnotation: (messageId, userAnnotation) => void;
}

const UserAnnotation: React.FC<MessageProps> = ({ message, handleUpdateUserAnnotation }) => (
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
);

export default UserAnnotation;
