import { defaultSettings, defaultSliderSettings, initialSlidersEnabled, modelsOptions } from '@DAL/constants';
import { saveModel, updateModel } from '@DAL/server-requests/models';
import { ChipsInput } from '@components/common/ChipsInput';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { ModelType } from '@models/AppModels';
import {
    Box,
    Checkbox,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
    Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { MainContainer, SaveButton } from './ModelForm.s';

interface ModelFormProps {
    editModel: any;
    models: ModelType[];
    setModels: (any) => void;
    closeDialog: () => void;
    isEditMode: boolean;
}

const ModelForm: React.FC<ModelFormProps> = ({
    editModel,
    models,
    setModels,
    closeDialog,
    isEditMode = false,
}) => {
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const formTitle = useMemo(() => (!isEditMode ? 'New Model' : 'Edit Model'), []);
    const { openSnackbar } = useSnackbar();
    const [slidersEnabled, setSlidersEnabled] = useState<any>(
        isEditMode
            ? {
                  temperatureEnabled: editModel.temperature !== null,
                  maxTokensEnabled: editModel.maxTokens !== null,
                  topPEnabled: editModel.topP !== null,
                  frequencyPenaltyEnabled: editModel.frequencyPenalty !== null,
                  presencePenaltyEnabled: editModel.presencePenalty !== null,
              }
            : initialSlidersEnabled,
    );

    const [model, setModel] = useState<any>(editModel ? editModel : defaultSettings);
    console.log(model);
    const updateModelInList = (updatedModel: ModelType) => {
        const updatedSettings = models.map((model: ModelType) =>
            model._id === updatedModel._id ? updatedModel : model,
        );
        setModels(updatedSettings);
    };

    const validateModel = (): boolean => {
        let message = '';
        if (!model.title) message = 'Title is required.';
        else if (!model.chatModel) message = 'Model selection is required.';
        else if (!model.firstChatSentence) message = 'First Chat Sentence is required.';
        else if (!model.systemStarterPrompt) message = 'System Starter Prompt is required.';

        setValidationMessage(message);
        return !message;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModel({ ...model, [name]: value });
    };

    const handleSave = async () => {
        if (!validateModel()) return;

        setIsSaveLoading(true);
        try {
            if (!isEditMode) {
                const savedModel = await saveModel(model);
                setModels([...models, savedModel]);
            } else {
                await updateModel(model);
                updateModelInList(model);
            }
            openSnackbar('Model Saved !', SnackbarStatus.SUCCESS);
            setIsSaveLoading(false);
            closeDialog();
        } catch (error) {
            openSnackbar('Model Saving Failed', SnackbarStatus.ERROR);
            setIsSaveLoading(false);
        }
    };

    const handleSliderChange = (newValue: number | number[], field: string) => {
        setModel({ ...model, [field]: newValue });
    };

    const renderSlider = (
        field: string,
        name: string,
        min: number,
        max: number,
        step: number,
        enabled: boolean,
    ) => (
        <FormControl fullWidth margin="normal">
            <Typography gutterBottom>{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
            <Box display="flex" alignItems="center" gap={1}>
                <Checkbox
                    checked={enabled}
                    onChange={(e) => {
                        handleSliderChange(e.target.checked ? defaultSliderSettings[field] : null, field);
                        setSlidersEnabled({
                            ...slidersEnabled,
                            [`${field}Enabled`]: e.target.checked,
                        });
                    }}
                    name={`${field}Enabled`}
                />
                <Slider
                    value={enabled && model[field]}
                    onChange={(e, newValue) => handleSliderChange(newValue, field)}
                    min={min}
                    max={max}
                    step={step}
                    valueLabelDisplay="auto"
                    name={name}
                    disabled={!enabled}
                />
            </Box>
        </FormControl>
    );

    return (
        <MainContainer maxWidth="md" style={{ paddingBottom: '32px' }}>
            <Typography variant="h4" gutterBottom margin="normal">
                {formTitle}
            </Typography>
            <TextField
                fullWidth
                required
                label="Title"
                name="title"
                value={model.title}
                onChange={handleChange}
                size="small"
                margin="normal"
            />
            <TextField
                maxRows={3}
                rows={3}
                multiline
                fullWidth
                label="Summary"
                name="summary"
                value={model.summary}
                onChange={handleChange}
                size="small"
                margin="normal"
            />
            <FormControl fullWidth margin="normal" size="small" required>
                <InputLabel id="model-select-label">Model</InputLabel>
                <Select
                    labelId="model-select-label"
                    value={model.chatModel}
                    onChange={handleChange}
                    label="Model"
                    name="chatModel"
                >
                    {modelsOptions.map((model) => (
                        <MenuItem key={model} value={model}>
                            {model}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                required
                multiline
                maxRows={4}
                rows={4}
                label="First Chat Sentence"
                name="firstChatSentence"
                value={model.firstChatSentence}
                onChange={handleChange}
                size="small"
                margin="normal"
            />
            <TextField
                fullWidth
                required
                multiline
                maxRows={8}
                rows={8}
                label="System Starter Prompt"
                name="systemStarterPrompt"
                value={model.systemStarterPrompt}
                onChange={handleChange}
                size="small"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Before User Sentence Prompt"
                name="beforeUserSentencePrompt"
                value={model.beforeUserSentencePrompt}
                onChange={handleChange}
                size="small"
                margin="normal"
            />
            <TextField
                fullWidth
                label="After User Sentence Prompt"
                name="afterUserSentencePrompt"
                value={model.afterUserSentencePrompt}
                onChange={handleChange}
                size="small"
                margin="normal"
            />
            {renderSlider('temperature', 'temperature', 0, 2, 0.01, slidersEnabled.temperatureEnabled)}
            {renderSlider('maxTokens', 'max tokens', 1, 4096, 1, slidersEnabled.maxTokensEnabled)}
            {renderSlider('topP', 'top p', 0, 1, 0.01, slidersEnabled.topPEnabled)}
            {renderSlider(
                'frequencyPenalty',
                'frequency penalty',
                0,
                2,
                0.01,
                slidersEnabled.frequencyPenaltyEnabled,
            )}
            {renderSlider(
                'presencePenalty',
                'presence_penalty',
                0,
                2,
                0.01,
                slidersEnabled.presencePenaltyEnabled,
            )}
            <ChipsInput
                list={model.stopSequences}
                setList={(stops) => setModel({ ...model, stopSequences: stops })}
                id={'stop'}
                label={'Stop Sequences'}
            />
            <SaveButton variant="contained" color="primary" onClick={handleSave} style={{ marginBottom: 0 }}>
                {isSaveLoading ? <CircularProgress size={28} sx={{ color: 'white' }} /> : 'Save Model'}
            </SaveButton>
            {validationMessage && <Typography color="error">{validationMessage}</Typography>}
        </MainContainer>
    );
};

export default ModelForm;
