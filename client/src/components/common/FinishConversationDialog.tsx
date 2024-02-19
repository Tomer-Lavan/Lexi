import { Pages } from '@app/App';
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
import { ConversationForm } from '../forms/conversation-form/ConversationForm';

const FinishConversationDialog = ({ open, setIsOpen, questionnaireLink, form }) => {
    const [page, setPage] = useState(1);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const experimentId = useExperimentId();
    const navigate = useNavigate();

    const handleYes = () => {
        if (form) {
            setPage(2);
        } else if (questionnaireLink) {
            setPage(3);
        } else {
            handleDone();
        }
    };

    const handleNo = () => setIsOpen(false);

    const handleDone = () => {
        navigate(`${Pages.EXPERIMENT.replace(':experimentId', experimentId)}`);
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
            ) : page === 2 && form ? (
                <ConversationForm
                    form={form}
                    isPreConversation={false}
                    handleDone={() => (questionnaireLink ? setPage(3) : handleDone())}
                />
            ) : page === 3 || (!form && questionnaireLink) ? (
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
            ) : null}
        </Dialog>
    );
};

export default FinishConversationDialog;
