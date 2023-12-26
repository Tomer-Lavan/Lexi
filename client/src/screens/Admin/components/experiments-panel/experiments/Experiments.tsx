import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Typography } from '@mui/material';
import { useState } from 'react';
import { getExperiments, updateExperimentsStatus } from '../../../../../DAL/server-requests/experimentsDAL';
import useEffectAsync from '../../../../../hooks/useEffectAsync';
import { ModelType } from '../../../../../models/AppModels';
import ExperimentForm from '../ExperimentForm';
import ExperimentsList from '../experiments-list/ExperimentsList';
import { FlexContainer, IconButtonStyled, MainContainerStyled, PointerDiv } from './Experiments.s';

export const Experiments = ({ models }) => {
    const [experiments, setExperiments] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tempExperiments, setTempExperiments] = useState([]);
    const [modifiedExperiments, setModifiedExperiments] = useState({});
    const [openExperimentFormDialog, setOpenExperimentFormDialog] = useState(false);
    const [editExperiment, setEditExperiment] = useState<ModelType | undefined>(null);

    useEffectAsync(async () => {
        const res = await getExperiments();
        setExperiments(res);
        setTempExperiments(res);
    }, []);

    const closeDialog = () => {
        setOpenExperimentFormDialog(false);
        if (editExperiment) {
            setEditExperiment(null);
            setIsEditMode(false);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setTempExperiments((prev) => prev.map((exp) => (exp._id === id ? { ...exp, isActive: newStatus } : exp)));
        setModifiedExperiments((prev) => {
            const originalStatus = experiments.find((exp) => exp._id === id)?.isActive;
            if (originalStatus === newStatus) {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            } else {
                return { ...prev, [id]: { ...prev[id], id, isActive: newStatus } };
            }
        });
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        const updatedExperiments = Object.values(modifiedExperiments);
        await updateExperimentsStatus(updatedExperiments);
        setIsLoading(false);
        setExperiments(tempExperiments);
        setModifiedExperiments({});
    };

    const handleCancelChanges = () => {
        setTempExperiments(experiments);
        setModifiedExperiments({});
    };

    return (
        <MainContainerStyled>
            <FlexContainer>
                <Typography variant="h4" gutterBottom>
                    Experiments
                </Typography>
                <PointerDiv onClick={() => setOpenExperimentFormDialog(true)}>
                    <AddIcon />
                </PointerDiv>
            </FlexContainer>
            <ExperimentsList
                experiments={tempExperiments}
                modifiedExperiments={modifiedExperiments}
                handleStatusChange={handleStatusChange}
                handleSaveChanges={handleSaveChanges}
                handleCancelChanges={handleCancelChanges}
                isLoading={isLoading}
                setEditExperiment={setEditExperiment}
                setOpenExperimentFormDialog={setOpenExperimentFormDialog}
                setIsEditMode={setIsEditMode}
            />
            <Dialog open={openExperimentFormDialog} fullWidth>
                <IconButtonStyled aria-label="close" onClick={closeDialog}>
                    <CloseIcon />
                </IconButtonStyled>
                <ExperimentForm
                    editExperiment={editExperiment}
                    tempExperiments={tempExperiments}
                    setTempExperiments={setTempExperiments}
                    models={models}
                    experiments={experiments}
                    setExperiments={setExperiments}
                    closeDialog={closeDialog}
                    isEditMode={isEditMode}
                />
            </Dialog>
        </MainContainerStyled>
    );
};
