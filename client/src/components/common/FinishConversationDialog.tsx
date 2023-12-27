import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import theme from '../../Theme';
import { Pages } from '../../app/App';
import SurveyComponent from '../forms/SurveyForm';

const FinishConversationDialog = ({ open, setIsOpen, questionnaireLink, conversationId }) => {
    const [page, setPage] = useState(1);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { experimentId } = useParams();
    const navigate = useNavigate();

    const handleYes = () => {
        setPage(2);
    };

    const handleDone = () => {
        navigate(`${Pages.EXPERIMENT.replace(':experimentId', experimentId)}`);
        setIsOpen(false);
    };

    const handleNo = () => {
        setIsOpen(false);
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
                    handleDone={() => setPage(3)}
                />
            ) : (
                <>
                    <DialogTitle>Questionnaire</DialogTitle>
                    <DialogContent>
                        <DialogContentText color={'black'}>
                            Please fill the following questionnaire:
                        </DialogContentText>
                        <a href={questionnaireLink} target="_blank" rel="noopener noreferrer">
                            {questionnaireLink}
                        </a>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDone}>Done</Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default FinishConversationDialog;
