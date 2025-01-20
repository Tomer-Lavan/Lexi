import { deleteExperiment, getExperiments, updateExperimentsStatus } from '@DAL/server-requests/experiments';
import { WarningMessage } from '@components/common/WarningMessasge';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import useEffectAsync from '@hooks/useEffectAsync';
import { ExperimentType } from '@models/AppModels';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, Typography } from '@mui/material';
import { useState } from 'react';
import ExperimentForm from '../ExperimentForm';
import ExperimentsList from '../experiments-list/ExperimentsList';
import { AddButton, IconButtonStyled, MainContainerStyled, NextPrevButton} from './Experiments.s';

export const Experiments = ({ agents, forms }) => {
    const { openSnackbar } = useSnackbar();
    const [experiments, setExperiments] = useState<ExperimentType[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoadingStatusChange, setIsLoadingStatusChange] = useState(false);
    const [isLoadingExperiments, setIsLoadingExperiments] = useState(true);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [tempExperiments, setTempExperiments] = useState<ExperimentType[]>([]);
    const [modifiedExperiments, setModifiedExperiments] = useState<Record<string, ExperimentType>>({});
    const [openExperimentFormDialog, setOpenExperimentFormDialog] = useState(false);
    const [openDeleteExpDialog, setOpenDeleteExpDialog] = useState(false);
    const [editExperiment, setEditExperiment] = useState<ExperimentType | undefined>(null);
    const [pageNumber, setPageNumber] = useState("1");
    const expLimit = "4";

    useEffectAsync(async () => {
        setIsLoadingExperiments(true);
        try {
            const res = await getExperiments(pageNumber , expLimit);
            setExperiments(res);
            setTempExperiments(res);
        } catch (error) {
            openSnackbar('Failed to load experiments', SnackbarStatus.ERROR);
            setExperiments([]);
            setTempExperiments([]);
        }
        setIsLoadingExperiments(false);
    }, [pageNumber]);

    const closeDialog = () => {
        setOpenExperimentFormDialog(false);
        if (editExperiment) {
            setEditExperiment(null);
            setIsEditMode(false);
        }
    };

    const handleStatusChange = (id: string, newStatus: boolean) => {
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
        setIsLoadingStatusChange(true);
        const updatedExperiments = Object.values(modifiedExperiments);
        try {
            await updateExperimentsStatus(updatedExperiments);
            setExperiments(tempExperiments);
            setModifiedExperiments({});
        } catch {
            openSnackbar('Failed to update experiments status', SnackbarStatus.ERROR);
            setTempExperiments(experiments);
            setModifiedExperiments({});
        }
        setIsLoadingStatusChange(false);
    };

    const handleCancelChanges = () => {
        setTempExperiments(experiments);
        setModifiedExperiments({});
    };

    const handleDeleteExperiment = async () => {
        try {
            setIsLoadingDelete(true);
            openSnackbar('Deleting Experiment...', SnackbarStatus.INFO);
            await deleteExperiment(editExperiment._id);
            setTempExperiments(tempExperiments.filter((exp) => exp._id !== editExperiment._id));
            setExperiments(experiments.filter((exp) => exp._id !== editExperiment._id));
            openSnackbar('Delete Experiment Success !', SnackbarStatus.SUCCESS);
        } catch (err) {
            openSnackbar('Failed to Delete Experiment', SnackbarStatus.ERROR);
        } finally {
            setIsLoadingDelete(false);
            setOpenDeleteExpDialog(false);
            setEditExperiment(null);
        }
    };

    return (
        <MainContainerStyled>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid gray', marginBottom: '24px' }}>
                Experiments
            </Typography>
            <Typography variant="h5" gutterBottom fontWeight={500}>
                Experiments Manager
            </Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="body2" gutterBottom fontWeight={500} marginBottom={2}>
                    Manage your experiments, attach to them a agent, launch them, share with participants and
                    more.
                </Typography>
                <Box display={'flex'} justifyContent={'end'}>
                    <AddButton onClick={() => setOpenExperimentFormDialog(true)} size="small">
                        <AddIcon style={{ color: 'floralwhite' }} />
                        <Typography variant="body2" fontWeight={500} color={'floralwhite'}>
                            Add Experiment
                        </Typography>
                    </AddButton>
                </Box>
            </Box>
            <ExperimentsList
                experiments={tempExperiments}
                modifiedExperiments={modifiedExperiments}
                handleStatusChange={handleStatusChange}
                handleSaveChanges={handleSaveChanges}
                handleCancelChanges={handleCancelChanges}
                isLoadingStatusChange={isLoadingStatusChange}
                setEditExperiment={setEditExperiment}
                setOpenExperimentFormDialog={setOpenExperimentFormDialog}
                setIsEditMode={setIsEditMode}
                isLoadingExperiments={isLoadingExperiments}
                setOpenDeleteExpDialog={setOpenDeleteExpDialog}
            />
            <Dialog open={openExperimentFormDialog} fullWidth maxWidth="md">
                <IconButtonStyled aria-label="close" onClick={closeDialog}>
                    <CloseIcon />
                </IconButtonStyled>
                <ExperimentForm
                    editExperiment={editExperiment}
                    tempExperiments={tempExperiments}
                    setTempExperiments={setTempExperiments}
                    agents={agents}
                    experiments={experiments}
                    setExperiments={setExperiments}
                    closeDialog={closeDialog}
                    isEditMode={isEditMode}
                    forms={forms}
                />
            </Dialog>
            <Dialog open={openDeleteExpDialog} fullWidth maxWidth="md">
                <WarningMessage
                    handleYes={handleDeleteExperiment}
                    handleNO={() => {
                        setOpenDeleteExpDialog(false);
                        setEditExperiment(null);
                    }}
                    isLoading={isLoadingDelete}
                >
                    Deleting the experiment will delete all experiment users and conversation. Are you sure you
                    want to delete?
                </WarningMessage>
            </Dialog>
            <Box display={'flex'} justifyContent={'center'}>
                <NextPrevButton disabled={pageNumber==="1"} onClick={() => setPageNumber(String(Number(pageNumber) - 1))} size="small">
                            <Typography variant="body2" fontWeight={500} color={'floralwhite'}>
                                prev
                            </Typography>
                </NextPrevButton>
                <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid gray', marginBottom: '24px' }}>
                    {pageNumber}
                </Typography>
                <NextPrevButton disabled={Number(expLimit) > experiments.length} onClick={() => setPageNumber(String(Number(pageNumber) + 1))} size="small">
                            <Typography variant="body2" fontWeight={500} color={'floralwhite'}>
                                next
                            </Typography>
                </NextPrevButton>
            </Box>
        </MainContainerStyled>
    );
};
