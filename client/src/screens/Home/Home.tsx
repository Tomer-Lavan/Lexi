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
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import theme from '@root/Theme';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import {
    BodyContent,
    Container,
    ContentContainer,
    DividerGrid,
    GridItem,
    StartButton,
    TextFieldStyled,
    TitleBackgroundHighlight,
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
        console.log('Starting a new conversation...');
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
            openSnackbar('Failed to start a new conversation', SnackbarStatus.ERROR);
        }
    };

    return isLoadingPage ? (
        <LoadingPage />
    ) : (
        <Container container isMobile={isMobile}>
            <GridItem item md={8} xs={10}>
                <ContentContainer isMobile={isMobile}>
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
                    <TitleBackgroundHighlight />
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
                        <BodyContent variant={'h6'}>
                            {experimentContent ? experimentContent.welcomeContent : ''}
                        </BodyContent>
                    )}
                </ContentContainer>
            </GridItem>
            <DividerGrid item md={4} xs={6} isMobile={isMobile}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <StartButton
                            variant="contained"
                            color="primary"
                            onClick={startConversation}
                            isMobile={isMobile}
                        >
                            Start Conversation
                        </StartButton>
                    </Grid>
                </Grid>
            </DividerGrid>
            {activeUser?.isAdmin && (
                <Box style={{ position: 'absolute', top: '8vh', right: '1vw', display: 'flex' }}>
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
                </Box>
            )}
        </Container>
    );
};

export default Home;
