import { useExperimentId } from '@hooks/useExperimentId';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
} from '@mui/material';
import theme from '@root/Theme';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { finishConversation } from '../../DAL/server-requests/conversations';
import { Pages } from '../../app/App';
import useActiveUser from '../../hooks/useActiveUser';
import { useConversationId } from '../../hooks/useConversationId';
import { ConversationForm } from '../forms/conversation-form/ConversationForm';

const FinishConversationDialog = ({ open, setIsOpen, questionnaireLink, form }) => {
    const [page, setPage] = useState(1);
    const { activeUser } = useActiveUser();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const experimentId = useExperimentId();
    const conversationId = useConversationId();
    const navigate = useNavigate();

    const handleYes = () => {
        if (form) {
            setPage(2);
        } else if (questionnaireLink) {
            setPage(3);
            handleDone();
        } else {
            handleDone();
        }
    };

    const handleNo = () => setIsOpen(false);

    const handleDone = async () => {
        try {
            await finishConversation(conversationId, experimentId, activeUser.isAdmin);
        } catch (error) {
            console.error('Failed to finish conversation');
        }
        console.log('Finish Conversation');
    };

    const handleDoneSurvey = async () => {
        if (questionnaireLink) {
            setPage(3);
        }
        handleDone();
    };

    return (
        <Dialog open={open} maxWidth={'lg'} fullScreen={isMobile && page > 1}>
            {page === 1 ? (
                <>
                    <DialogContent>
                        <DialogContentText color={'black'}>
                            Are you sure you want to finish the conversation?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleNo}>No</Button>
                        <Button onClick={handleYes} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </>
            ) : page === 2 && form ? (
                <ConversationForm form={form} isPreConversation={false} handleDone={handleDoneSurvey} />
            ) : page === 3 || (!form && questionnaireLink) ? (
                <>
                    <DialogTitle>Thank you for completing the conversation</DialogTitle>
                    <DialogContent>
                        <DialogContentText color={'black'}>
                            Your username is <b>{activeUser.username}</b>, continue with it in the rest of the
                            study.
                        </DialogContentText>
                        {/* <a href={questionnaireLink} target="_blank" rel="noopener noreferrer">
                            {questionnaireLink}
                        </a> */}
                    </DialogContent>
                    {activeUser.isAdmin && (
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    navigate(`${Pages.EXPERIMENT.replace(':experimentId', experimentId)}`);
                                    setIsOpen(false);
                                }}
                            >
                                Done
                            </Button>
                        </DialogActions>
                    )}
                </>
            ) : null}
        </Dialog>
    );
};

export default FinishConversationDialog;
