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
import { finishConversation } from '../../DAL/server-requests/conversations';
import useActiveUser from '../../hooks/useActiveUser';
import SurveyComponent from '../forms/survey-form/SurveyForm';

interface FinishConversationDialogProps {
    open: boolean;
    setIsOpen: (isOpen: boolean) => void;
    questionnaireLink: string;
    conversationId: string;
}

const FinishConversationDialog: React.FC<FinishConversationDialogProps> = ({
    open,
    conversationId,
    setIsOpen,
}) => {
    const [page, setPage] = useState(1);
    const { activeUser } = useActiveUser();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const experimentId = useExperimentId();
    // const navigate = useNavigate();

    const handleYes = () => setPage(2);

    const handleNo = () => setIsOpen(false);

    // const handleDone = () => {
    //     navigate(`${Pages.EXPERIMENT.replace(':experimentId', experimentId)}`);
    //     setIsOpen(false);
    // };

    const handleDoneSurvey = async () => {
        setPage(3);
        try {
            await finishConversation(conversationId, experimentId, activeUser.isAdmin);
        } catch (error) {
            console.error('Failed to finish conversation');
        }
    };

    return (
        <Dialog open={open} maxWidth={'md'} fullScreen={isMobile && page > 1}>
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
            ) : page === 2 ? (
                <SurveyComponent
                    conversationId={conversationId}
                    isPreConversation={false}
                    handleDone={() => handleDoneSurvey()}
                />
            ) : (
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
                    {/* <DialogActions>
                        <Button onClick={handleDone}>Done</Button>
                    </DialogActions> */}
                </>
            )}
        </Dialog>
    );
};

export default FinishConversationDialog;
