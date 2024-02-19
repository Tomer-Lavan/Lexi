import { getConversation } from '@DAL/server-requests/conversations';
import FinishConversationDialog from '@components/common/FinishConversationDialog';
import LoadingPage from '@components/common/LoadingPage';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { useConversationId } from '@hooks/useConversationId';
import useEffectAsync from '@hooks/useEffectAsync';
import { Dialog, Grid, useMediaQuery } from '@mui/material';
import theme from '@root/Theme';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExperimentCoversationForms } from '../../DAL/server-requests/experiments';
import { ConversationForm } from '../../components/forms/conversation-form/ConversationForm';
import { useExperimentId } from '../../hooks/useExperimentId';
import { MainContainer, MessageListContainer, SectionContainer, SectionInnerContainer } from './ChatPage.s';
import MessageList from './components/MessageList';
import InputBox from './components/input-box/InputBox';
import { SidebarChat } from './components/side-bar-chat/SideBarChat';

interface ChatPageProps {
    isFinishDialogOpen: boolean;
    setIsFinishDialogOpen: (open: boolean) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ isFinishDialogOpen, setIsFinishDialogOpen }) => {
    const navigate = useNavigate();
    const messagesRef = useRef(null);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const { openSnackbar } = useSnackbar();
    const [messages, setMessages] = useState([]);
    const [conversationForms, setConversationForms] = useState({
        preConversation: null,
        postConversation: null,
    });
    const [messageFontSize, setMessageFontSize] = useState<'sm' | 'lg'>('lg');
    const [surveyOpen, setIsSurveyOpen] = useState(false);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const questionnaireLink = 'https://docs.google.com/forms/u/0/?tgif=d&ec=asw-forms-hero-goto';
    const conversationId = useConversationId();
    const experimentId = useExperimentId();

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    useEffectAsync(async () => {
        const imsAnsweredKey = `imsPreAnswered-${conversationId}`;
        const imsAnswered = sessionStorage.getItem(imsAnsweredKey);
        try {
            const [conversation, conversationForms] = await Promise.all([
                getConversation(conversationId),
                getExperimentCoversationForms(experimentId),
            ]);
            if (!imsAnswered && conversationForms.preConversation) {
                setIsSurveyOpen(true);
            }
            setConversationForms(conversationForms);
            setMessages(conversation.length ? conversation : []);
            setIsPageLoading(false);
        } catch (err) {
            openSnackbar('Failed to load conversation', SnackbarStatus.ERROR);
            navigate(-1);
        }
    }, []);

    const handleImsSurveyDone = () => {
        const imsAnsweredKey = `imsPreAnswered-${conversationId}`;
        sessionStorage.setItem(imsAnsweredKey, 'true');
        setIsSurveyOpen(false);
    };

    return isPageLoading ? (
        <LoadingPage />
    ) : (
        // isMobile && surveyOpen ? (
        //     <Dialog open={surveyOpen} maxWidth={'md'} fullScreen={isMobile}>
        //         <ConversationForm
        //             form={conversationForms.preConversation}
        //             isPreConversation={true}
        //             handleDone={handleImsSurveyDone}
        //         />
        //     </Dialog>
        // ) : (
        <MainContainer container>
            {!isMobile && (
                <Grid item xs={2} sm={2} md={2} lg={2} style={{ backgroundColor: '#f5f5f5' }}>
                    <SidebarChat
                        setIsOpen={setIsFinishDialogOpen}
                        setMessageFontSize={setMessageFontSize}
                        messageFontSize={messageFontSize}
                    />
                </Grid>
            )}
            <Grid item xs={12} sm={10} md={10} lg={10}>
                <SectionContainer>
                    <SectionInnerContainer container direction="column">
                        <MessageListContainer ref={messagesRef} item>
                            <MessageList
                                isMobile={isMobile}
                                messages={messages}
                                isMessageLoading={isMessageLoading}
                                size={messageFontSize}
                            />
                        </MessageListContainer>
                        <Grid item display={'flex'} justifyContent={'center'}>
                            <InputBox
                                isMobile={isMobile}
                                messages={messages}
                                setMessages={setMessages}
                                conversationId={conversationId}
                                setIsMessageLoading={setIsMessageLoading}
                                fontSize={messageFontSize}
                            />
                        </Grid>
                    </SectionInnerContainer>
                </SectionContainer>
            </Grid>
            {isFinishDialogOpen && (
                <FinishConversationDialog
                    open={isFinishDialogOpen}
                    setIsOpen={setIsFinishDialogOpen}
                    questionnaireLink={questionnaireLink}
                    form={conversationForms.postConversation}
                />
            )}
            <Dialog
                open={surveyOpen}
                maxWidth={'md'}
                fullScreen={isMobile}
                PaperProps={{
                    style: {
                        maxHeight: isMobile ? 'none' : '70vh',
                        overflow: 'auto',
                    },
                }}
            >
                <ConversationForm
                    form={conversationForms.preConversation}
                    isPreConversation={true}
                    handleDone={handleImsSurveyDone}
                />
            </Dialog>
        </MainContainer>
    );
    // );
};

export default ChatPage;
