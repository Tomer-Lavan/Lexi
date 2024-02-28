import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { MessageType } from '@models/AppModels';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { sendMessage, sendStreamMessage } from '../../../../DAL/server-requests/conversations';
import { StyledInputBase, StyledInputBox } from './InputBox.s';

interface InputBoxProps {
    isMobile: boolean;
    messages: MessageType[];
    setMessages: (messages: MessageType[] | ((prevMessages: MessageType[]) => MessageType[])) => void;
    conversationId: string;
    setIsMessageLoading: (isLoading: boolean) => void;
    fontSize: string;
    isStreamMessage: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
    isMobile,
    messages,
    fontSize,
    conversationId,
    setMessages,
    setIsMessageLoading,
    isStreamMessage,
}) => {
    const { openSnackbar } = useSnackbar();
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSendMessage = async () => {
        if (!message && !errorMessage && !message.trim().length) {
            openSnackbar('Message cannot be empty', SnackbarStatus.WARNING);
            return;
        }
        const messageContent: string = message || errorMessage;
        const conversation: MessageType[] = [...messages, { content: messageContent, role: 'user' }];
        setMessages(conversation);
        setMessage('');
        setIsMessageLoading(true);
        try {
            if (isStreamMessage) {
                sendStreamMessage(
                    { content: messageContent, role: 'user' },
                    conversationId,
                    onStreamMessage,
                    onCloseStream,
                    (error) => onMessageError(conversation, messageContent, error),
                );
            } else {
                const response = await sendMessage({ content: messageContent, role: 'user' }, conversationId);
                setMessages((prevMessages) => [...prevMessages, response]);
                setIsMessageLoading(false);
                setErrorMessage(null);
            }
        } catch (err) {
            onMessageError(conversation, messageContent, err);
        }
    };

    const onMessageError = (conversation, messageContent, error) => {
        setIsMessageLoading(false);
        setMessages([
            ...conversation,
            {
                content:
                    error.response && error.response.status && error.response.status === 403
                        ? 'Messeges Limit Exceeded'
                        : error?.response?.status === 400
                          ? 'Message Is Too Long'
                          : 'Network Error',
                role: 'assistant',
            },
        ]);
        openSnackbar('Failed to send message', SnackbarStatus.ERROR);
        setErrorMessage(messageContent);
    };

    const onCloseStream = (message: MessageType) => {
        setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { ...prevMessages[prevMessages.length - 1], _id: message._id, userAnnotation: message.userAnnotation },
        ]);
    };

    const onStreamMessage = (assistantMessagePart: string) => {
        setIsMessageLoading(false);
        setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant') {
                return [
                    ...prevMessages.slice(0, -1),
                    { ...lastMessage, content: lastMessage.content + assistantMessagePart },
                ];
            }

            return [...prevMessages, { content: assistantMessagePart, role: 'assistant' }];
        });
        setErrorMessage(null);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: isMobile ? '95%' : '85%',
                alignItems: 'center',
            }}
        >
            {errorMessage ? (
                <Button
                    variant="contained"
                    onClick={() => {
                        setMessage(errorMessage);
                        handleSendMessage();
                    }}
                    style={{ width: 'fit-content', marginBottom: '24px' }}
                >
                    Resend Message
                </Button>
            ) : (
                <StyledInputBox>
                    <StyledInputBase
                        fullWidth
                        placeholder="Type a message…"
                        multiline
                        maxRows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        fontSize={fontSize === 'sm' ? '1rem' : '1.25rem'}
                    />
                    <IconButton color="primary" onClick={handleSendMessage}>
                        <SendIcon />
                    </IconButton>
                </StyledInputBox>
            )}
        </Box>
    );
};

export default InputBox;
