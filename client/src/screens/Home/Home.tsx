import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { createConversation } from '@DAL/server-requests/conversations';
import { getExperimentContent, updateExperimentDisplaySettings } from '@DAL/server-requests/experiments';
import { logout } from '@DAL/server-requests/users';
import { Pages } from '@app/App';
import AsyncButton from '@components/common/AsyncButton';
import LoadingPage from '@components/common/LoadingPage';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import useActiveUser from '@hooks/useActiveUser';
import useEffectAsync from '@hooks/useEffectAsync';
import { useExperimentId } from '@hooks/useExperimentId';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button, useMediaQuery } from '@mui/material';
import theme from '@root/Theme';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import {
    BodyContent,
    ButtonsBox,
    StartButton,
    StyledContainer,
    TextFieldStyled,
    TitleContent,
    TitleTextField,
} from './Home.s';

const Home: React.FC = () => {
    const { activeUser } = useActiveUser();
    const { openSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const experimentId = useExperimentId();
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(null);
    const [experimentContent, setExperimentContent] = useState<any>(null);

    useEffectAsync(async () => {
        try {
            const { content, isActive } = await getExperimentContent(experimentId);
            setExperimentContent(content);
            if (!isActive) {
                if (activeUser.isAdmin) {
                    openSnackbar('Experiment is not active', SnackbarStatus.WARNING);
                } else {
                    try {
                        await logout();
                    } catch (err) {
                        console.log(err);
                    }
                    navigate(Pages.PROJECT_OVERVIEW);
                    dispatch(setActiveUser(null));
                    openSnackbar('Experiment is not active', SnackbarStatus.WARNING);
                }
            }
        } catch (err) {
            openSnackbar('Failed to load experiment', SnackbarStatus.ERROR);
            navigate(Pages.PROJECT_OVERVIEW);
        }
        setIsLoadingPage(false);
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(experimentContent);
    };

    const handleContentChange = (event) => {
        const { name, value } = event.target;
        setEditedContent({ ...editedContent, [name]: value });
    };

    const handleSave = async () => {
        setIsLoadingUpdate(true);
        try {
            await updateExperimentDisplaySettings(experimentId, editedContent);
            setExperimentContent(editedContent);
            openSnackbar('Update Success', SnackbarStatus.SUCCESS);
        } catch (err) {
            openSnackbar('Update Failed', SnackbarStatus.ERROR);
        }
        setIsEditing(false);
        setIsLoadingUpdate(false);
    };

    const startConversation = async () => {
        try {
            const newConversationId = await createConversation(
                activeUser._id,
                activeUser.numberOfConversations,
                experimentId,
            );
            navigate(
                `${Pages.EXPERIMENT_CONVERSATION.replace(':experimentId', experimentId).replace(
                    ':conversationId',
                    newConversationId,
                )}`,
            );
        } catch (err) {
            if (err?.response?.status === 403) {
                openSnackbar('Converations Limit Exceeded', SnackbarStatus.ERROR);
                return;
            }
            openSnackbar('Failed to start a new conversation', SnackbarStatus.ERROR);
        }
    };

    return isLoadingPage ? (
        <LoadingPage />
    ) : (
        <StyledContainer>
            {isEditing ? (
                <TitleTextField
                    variant="outlined"
                    multiline
                    name="welcomeHeader"
                    value={editedContent.welcomeHeader}
                    onChange={handleContentChange}
                    fullWidth
                    inputProps={{ style: { whiteSpace: 'normal' } }}
                />
            ) : (
                <TitleContent variant={'h2'}>
                    {experimentContent ? experimentContent.welcomeHeader : ''}
                </TitleContent>
            )}
            {isEditing ? (
                <TextFieldStyled
                    variant="outlined"
                    multiline
                    name="welcomeContent"
                    rows={4}
                    value={editedContent.welcomeContent}
                    onChange={handleContentChange}
                    fullWidth
                    inputProps={{ style: { whiteSpace: 'normal' } }}
                />
            ) : (
                <BodyContent variant={'h6'} textAlign={'center'} width={isMobile ? '90%' : '60%'}>
                    {experimentContent ? experimentContent.welcomeContent : ''}
                </BodyContent>
            )}
            <StartButton variant="contained" color="primary" onClick={startConversation} isMobile={isMobile}>
                Start Conversation
            </StartButton>
            {activeUser?.isAdmin && (
                <ButtonsBox>
                    <AsyncButton
                        isLoading={isLoadingUpdate}
                        variant="outlined"
                        onClick={isEditing ? handleSave : handleEdit}
                        style={{ minWidth: '36px' }}
                        size="small"
                    >
                        {isEditing ? (
                            <SaveIcon sx={{ fontSize: '1.25rem' }} />
                        ) : (
                            <EditIcon sx={{ fontSize: '1.25rem' }} />
                        )}
                    </AsyncButton>
                    {isEditing && (
                        <Button
                            variant="outlined"
                            onClick={() => setIsEditing(false)}
                            style={{ minWidth: '36px', marginLeft: '10px' }}
                            size="small"
                        >
                            <CancelIcon sx={{ fontSize: '1.25rem' }} />
                        </Button>
                    )}
                </ButtonsBox>
            )}
        </StyledContainer>
    );
};

export default Home;
