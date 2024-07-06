import { defaultExperiment } from '@DAL/constants';
import { saveExperiment, updateExperiment } from '@DAL/server-requests/experiments';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { AgentsModes } from '@models/AppModels';
import {
    Box,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import StyledSelection from '../../../../components/common/StyledSelection';
import { getFormErrorMessage } from '../../../../utils/commonFunctions';
import { AbAgents } from '../agents-panel/active-agents/AbAgents';
import { MainContainer, SaveButton } from '../agents-panel/agent-form/AgentForm.s';

const ExperimentForm = ({
    editExperiment,
    experiments,
    tempExperiments,
    setTempExperiments,
    agents,
    setExperiments,
    closeDialog,
    isEditMode = false,
    forms,
}) => {
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: editExperiment || defaultExperiment,
    });
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const formTitle = useMemo(() => (!isEditMode ? 'New Experiment' : 'Edit Experiment'), []);
    const { openSnackbar } = useSnackbar();
    const agentsMode = watch('agentsMode');

    const updateExperimentInList = (updatedExp) => {
        const updatedSettings = experiments.map((exp) => (exp._id === updatedExp._id ? updatedExp : exp));
        setTempExperiments(updatedSettings);
        setExperiments(updatedSettings);
    };

    const handleSave = async (data) => {
        setIsSaveLoading(true);
        try {
            if (data.agentsMode === 'Single') {
                data.abAgents = null;
            } else {
                data.activeAgent = null;
            }
            const parsedExperiment = {
                ...data,
                activeAgent: !data.activeAgent ? null : data.activeAgent.toString(),
                maxMessages: !data.maxMessages ? null : Number(data.maxMessages),
                maxConversations: !data.maxConversations ? null : Number(data.maxConversations),
                maxParticipants: !data.maxParticipants ? null : Number(data.maxParticipants),
                isActive: data.isActive,
            };
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
        <MainContainer as="form" onSubmit={handleSubmit(handleSave)} style={{ padding: '32px' }}>
            <Typography variant="h4" gutterBottom margin="normal">
                {formTitle}
            </Typography>
            <TextField
                fullWidth
                required
                label="Title"
                {...register('title', { required: 'Title is required.' })}
                error={!!errors.title}
                helperText={getFormErrorMessage(errors.title)}
                size="small"
                margin="normal"
            />
            <TextField
                maxRows={3}
                rows={3}
                multiline
                fullWidth
                label="Description"
                {...register('description')}
                size="small"
                margin="normal"
            />
            <Typography
                style={{
                    color: 'grey',
                    marginBottom: '4px',
                    marginTop: '8px',
                    borderBottom: '1px solid grey',
                }}
            >
                Experiment Agents:
            </Typography>
            <FormControl
                margin="dense"
                size="small"
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
            >
                <Typography>Experimental Design:</Typography>
                <Controller
                    name="agentsMode"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} labelId="agent-mode-select-label" style={{ minWidth: '100px' }}>
                            {Object.values(AgentsModes).map((mode) => (
                                <MenuItem key={mode} value={mode}>
                                    {mode === AgentsModes.SINGLE ? 'Single Condition' : AgentsModes.AB}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>
            {agentsMode === AgentsModes.SINGLE ? (
                <FormControl
                    margin="dense"
                    size="small"
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
                >
                    <Typography>Active Agent:</Typography>
                    <Controller
                        name="activeAgent"
                        control={control}
                        defaultValue={agents.length ? agents[0] : ''}
                        rules={{ required: 'Active agent is required.' }}
                        render={({ field }) => (
                            <Select {...field} labelId="active-agent-select-label" style={{ minWidth: '100px' }}>
                                {agents.map((agent) => (
                                    <MenuItem key={agent._id} value={agent._id}>
                                        {agent.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.activeAgent && (
                        <Typography color="error">{getFormErrorMessage(errors.activeAgent)}</Typography>
                    )}
                </FormControl>
            ) : (
                <AbAgents agents={agents} control={control} setValue={setValue} isRow={false} errors={errors} />
            )}
            <Typography
                style={{
                    color: 'grey',
                    marginBottom: '4px',
                    marginTop: '8px',
                    borderBottom: '1px solid grey',
                }}
            >
                Experiment Features:
            </Typography>
            <Box style={{ width: '100%' }}>
                <Controller
                    name="experimentFeatures.userAnnotation"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="User Annotation"
                        />
                    )}
                />
            </Box>
            <Box style={{ width: '100%' }}>
                <Controller
                    name="experimentFeatures.streamMessage"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Stream Message"
                        />
                    )}
                />
            </Box>

            <Typography
                style={{
                    color: 'grey',
                    marginBottom: '4px',
                    marginTop: '8px',
                    borderBottom: '1px solid grey',
                }}
            >
                Experiment Forms:
            </Typography>
            <Box width={'100%'} paddingLeft={'16px'} style={{ marginBottom: '24px' }}>
                <StyledSelection
                    label="Registration"
                    options={forms}
                    control={control}
                    name="experimentForms.registration"
                    placeholder={'No Form'}
                />
                <StyledSelection
                    label="Before Conversation"
                    options={forms}
                    control={control}
                    name="experimentForms.preConversation"
                    placeholder={'No Form'}
                />
                <StyledSelection
                    label="After Conversation"
                    options={forms}
                    control={control}
                    name="experimentForms.postConversation"
                    placeholder={'No Form'}
                />
            </Box>
            <Typography
                style={{
                    color: 'grey',
                    marginBottom: '4px',
                    marginTop: '8px',
                    borderBottom: '1px solid grey',
                }}
            >
                Experiment Boundaries:
            </Typography>
            <Typography style={{ fontSize: '0.75rem', color: 'rgba(0, 0, 0, 0.6)', padding: '8px' }}>
                * Leave blank for no limit
            </Typography>
            <TextField
                fullWidth
                label="Max Participants"
                {...register('maxParticipants')}
                size="small"
                margin="dense"
                type="number"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                fullWidth
                label="Max Conversations"
                {...register('maxConversations')}
                size="small"
                margin="dense"
                type="number"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                fullWidth
                label="Max Messages"
                {...register('maxMessages')}
                size="small"
                margin="dense"
                type="number"
                InputLabelProps={{ shrink: true }}
                style={{ marginBottom: '12px' }}
            />
            <Box style={{ width: '100%' }}>
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Activate Experiment"
                        />
                    )}
                />
            </Box>
            <SaveButton type="submit" variant="contained" color="primary" style={{ marginBottom: 0 }}>
                {isSaveLoading ? <CircularProgress size={28} sx={{ color: 'white' }} /> : 'Save Experiment'}
            </SaveButton>
        </MainContainer>
    );
};

export default ExperimentForm;
