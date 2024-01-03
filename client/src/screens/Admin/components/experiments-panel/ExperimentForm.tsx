import { defaultExperiment } from '@DAL/constants';
import { saveExperiment, updateExperiment } from '@DAL/server-requests/experiments';
import { ActiveModelsForm } from '@components/forms/ActiveModelsForm';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { ExperimentType } from '@models/AppModels';
import { Box, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { MainContainer, SaveButton } from '../models-panel/model-form/ModelForm.s';

const ExperimentForm = ({
    editExperiment,
    experiments,
    tempExperiments,
    setTempExperiments,
    models,
    setExperiments,
    closeDialog,
    isEditMode = false,
}) => {
    const [experiment, setExperiment] = useState<any>(editExperiment || defaultExperiment);
    const [isActive, setIsActive] = useState(experiment.isActive);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const formTitle = useMemo(() => (!isEditMode ? 'New Experiment' : 'Edit Experiment'), []);
    const { openSnackbar } = useSnackbar();

    const updateExperimentInList = (updatedExp: ExperimentType) => {
        const updatedSettings = experiments.map((experiment: ExperimentType) =>
            experiment._id === updatedExp._id ? updatedExp : experiment,
        );
        setTempExperiments(updatedSettings);
        setExperiments(updatedSettings);
    };

    const validateModel = (): boolean => {
        let message = '';
        if (!experiment.title) message = 'Title is required.';
        else if (!experiment.modelsMode) message = 'Model selection is required.';
        else if (experiment.modelsMode === 'Single' && !experiment.activeModel)
            message = 'Active Model selection is required.';
        else if (experiment.modelsMode === 'A/B' && (!experiment.abModels.modelA || !experiment.abModels.modelB))
            message = 'Models selection is required.';

        setValidationMessage(message);
        return !message;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExperiment({ ...experiment, [name]: value });
    };

    const handleSave = async () => {
        if (!validateModel()) return;

        setIsSaveLoading(true);
        try {
            if (experiment.modelsMode === 'Single') {
                experiment.abModels = null;
            } else {
                experiment.activeModel = null;
            }
            const parsedExperiment = { ...experiment, isActive };
            if (!isEditMode) {
                const savedExperiment = await saveExperiment(parsedExperiment);
                setTempExperiments([...tempExperiments, savedExperiment]);
                setExperiments([...experiments, savedExperiment]);
            } else {
                await updateExperiment(parsedExperiment);
                updateExperimentInList(parsedExperiment);
            }
            openSnackbar('Experiment Saved !', SnackbarStatus.SUCCESS);
            setIsSaveLoading(false);
            closeDialog();
        } catch (error) {
            openSnackbar('Experiment Saving Failed', SnackbarStatus.ERROR);
            setIsSaveLoading(false);
        }
    };

    return (
        <MainContainer style={{ paddingBottom: '32px' }}>
            <Typography variant="h4" gutterBottom margin="normal">
                {formTitle}
            </Typography>
            <TextField
                fullWidth
                required
                label="Title"
                name="title"
                value={experiment.title}
                onChange={handleChange}
                size="small"
                margin="normal"
            />
            <TextField
                maxRows={3}
                rows={3}
                multiline
                fullWidth
                label="Description"
                name="description"
                value={experiment.description}
                onChange={handleChange}
                size="small"
                margin="normal"
            />
            <ActiveModelsForm
                models={models}
                experiment={experiment}
                setExperiment={setExperiment}
                isRow={false}
            />
            <Box style={{ width: '100%' }}>
                <FormControlLabel
                    control={
                        <Checkbox checked={isActive} onClick={() => setIsActive(!isActive)} name="isActive" />
                    }
                    label="Activate Experiment"
                />
            </Box>
            <SaveButton variant="contained" color="primary" onClick={handleSave} style={{ marginBottom: 0 }}>
                {isSaveLoading ? <CircularProgress size={28} sx={{ color: 'white' }} /> : 'Save Experiment'}
            </SaveButton>
            {validationMessage && <Typography color="error">{validationMessage}</Typography>}
        </MainContainer>
    );
};

export default ExperimentForm;
