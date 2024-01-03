import { getConversation } from '@DAL/server-requests/conversations';
import FinishConversationDialog from '@components/common/FinishConversationDialog';
import FontSizeSwitch from '@components/common/FontSizeSwitch';
import LoadingPage from '@components/common/LoadingPage';
import SurveyComponent from '@components/forms/SurveyForm';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { useConversationId } from '@hooks/useConversationId';
import useEffectAsync from '@hooks/useEffectAsync';
import { Dialog, Grid, useMediaQuery } from '@mui/material';
import theme from '@root/Theme';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemText } from '../Admin/components/sidebar-admin/SideBar.s';
import {
    EmptySection,
    MainContainer,
    MessageListContainer,
    SectionContainer,
    SectionInnerContainer,
} from './ChatPage.s';
import MessageList from './components/MessageList';
import { SidebarChat } from './components/SideBarChat';
import InputBox from './components/input-box/InputBox';

const ChatPage = ({ open, setIsOpen }) => {
    const navigate = useNavigate();
    const messagesRef = useRef(null);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const { openSnackbar } = useSnackbar();
    const [messages, setMessages] = useState([]);
    const [messageFontSize, setMessageFontSize] = useState<'sm' | 'lg'>('lg');
    const [surveyOpen, setIsSurveyOpen] = useState(false);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const questionnaireLink = 'https://docs.google.com/forms/u/0/?tgif=d&ec=asw-forms-hero-goto';
    const conversationId = useConversationId();

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    useEffectAsync(async () => {
        const imsAnsweredKey = `imsPreAnswered-${conversationId}`;
        const imsAnswered = sessionStorage.getItem(imsAnsweredKey);
        if (!imsAnswered) {
            setIsSurveyOpen(true);
        }
        try {
            const conversation = await getConversation(conversationId);
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
        <MainContainer container>
            {!isMobile && (
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <SidebarChat setIsOpen={setIsOpen} />
                </Grid>
            )}
            <Grid item xs={12} sm={8} md={8} lg={8}>
                <SectionContainer>
                    <SectionInnerContainer container direction="column">
                        <MessageListContainer ref={messagesRef} item>
                            <MessageList
                                messages={messages}
                                isMessageLoading={isMessageLoading}
                                size={messageFontSize}
                            />
                        </MessageListContainer>
                        <Grid item>
                            <InputBox
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
            {!isMobile && (
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <EmptySection>
                        <ListItemText width={'80%'} textAlign={'left'}>
                            Font Size:
                        </ListItemText>
                        <FontSizeSwitch fontSize={messageFontSize} setFontSize={setMessageFontSize} />
                    </EmptySection>
                </Grid>
            )}
            {open && (
                <FinishConversationDialog
                    open={open}
                    setIsOpen={setIsOpen}
                    questionnaireLink={questionnaireLink}
                    conversationId={conversationId}
                />
            )}
            <Dialog open={surveyOpen} maxWidth={'md'} fullScreen={isMobile}>
                <SurveyComponent
                    conversationId={conversationId}
                    isPreConversation={true}
                    handleDone={handleImsSurveyDone}
                />
            </Dialog>
        </MainContainer>
    );
};

export default ChatPage;
