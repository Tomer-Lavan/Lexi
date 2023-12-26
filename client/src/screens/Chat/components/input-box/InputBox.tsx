import SendIcon from '@mui/icons-material/Send';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { sendStreamMessage } from '../../../../DAL/server-requests/conversationsDAL';
import { useSnackbar } from '../../../../contexts/SnackbarProvider';
import { StyledInputBase, StyledInputBox } from './InputBox.s';

const InputBox = (props) => {
    const { messages, setMessages, conversationId, setIsMessageLoading, fontSize } = props;
    const { openSnackbar } = useSnackbar();
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSendMessage = async () => {
        if (!message && !errorMessage && !messages.trim().length) {
            openSnackbar('Message cannot be empty', 'warning');
            return;
        }
        const messageContent = message || errorMessage;
        const conversation = [...messages, { content: messageContent, role: 'user' }];
        setMessages(conversation);
        setMessage('');
        setIsMessageLoading(true);
        try {
            sendStreamMessage({ content: messageContent, role: 'user' }, conversationId, onStreamMessage, () =>
                onMessageError(conversation, messageContent),
            );
        } catch (err) {
            onMessageError(conversation, messageContent);
        }
    };

    const onMessageError = (conversation, messageContent) => {
        setIsMessageLoading(false);
        setMessages([...conversation, { content: 'Network Error', role: 'assistant' }]);
        openSnackbar('Failed to send message', 'error');
        setErrorMessage(messageContent);
    };

    const onStreamMessage = (assistantMessagePart) => {
        setIsMessageLoading(false);
        setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant') {
                return [
                    ...prevMessages.slice(0, -1),
                    { ...lastMessage, content: lastMessage.content + assistantMessagePart },
                ];
            } else {
                return [...prevMessages, { content: assistantMessagePart, role: 'assistant' }];
            }
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
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
        </div>
    );
};

export default InputBox;
