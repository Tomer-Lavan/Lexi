import { AgentType } from '@models/AppModels';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, FieldErrors, FieldValues, UseFormSetValue } from 'react-hook-form';
import { getFormErrorMessage } from '../../../../../utils/commonFunctions';

interface AbAgentsFormData {
    abAgents: {
        agentA: string;
        agentB: string;
        distA: number;
        distB: number;
    };
}

interface AbAgentsProps {
    agents: AgentType[];
    control: any;
    setValue: UseFormSetValue<FieldValues>;
    errors: FieldErrors<AbAgentsFormData>;
    isRow?: boolean;
}

export const AbAgents: React.FC<AbAgentsProps> = ({ agents, control, setValue, isRow = true, errors }) => {
    useEffect(() => {
        setValue('abAgents.distA', 50);
        setValue('abAgents.distB', 50);
    }, [setValue]);

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: isRow ? 'row' : 'column',
                gap: isRow ? '32px' : 0,
                alignItems: 'start',
            }}
        >
            <FormControl
                margin="normal"
                size="small"
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
            >
                <Typography>Agent A:</Typography>
                <Controller
                    name="abAgents.agentA"
                    control={control}
                    defaultValue={agents.length ? agents[0] : ''}
                    rules={{ required: 'Agent A is required.' }}
                    render={({ field }) => (
                        <Select {...field} size="small" style={{ minWidth: '100px' }}>
                            {agents.map((agent) => (
                                <MenuItem key={agent.title} value={agent._id}>
                                    {agent.title}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                {errors.abAgents?.agentA && (
                    <Typography color="error">{getFormErrorMessage(errors.abAgents.agentA)}</Typography>
                )}
                <Controller
                    name="abAgents.distA"
                    control={control}
                    defaultValue={50}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            style={{ width: '40px' }}
                            defaultValue={50}
                            onChange={(e) => {
                                field.onChange(Number(e.target.value));
                                setValue('abAgents.distB', 100 - Number(e.target.value));
                            }}
                        />
                    )}
                />
            </FormControl>
            <FormControl
                margin="normal"
                size="small"
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
            >
                <Typography>Agent B:</Typography>
                <Controller
                    name="abAgents.agentB"
                    control={control}
                    defaultValue={agents.length ? agents[0] : ''}
                    rules={{ required: 'Agent B is required.' }}
                    render={({ field }) => (
                        <Select {...field} size="small" style={{ minWidth: '100px' }}>
                            {agents.map((agent) => (
                                <MenuItem key={agent.title} value={agent._id}>
                                    {agent.title}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                {errors.abAgents?.agentB && (
                    <Typography color="error">{getFormErrorMessage(errors.abAgents.agentB)}</Typography>
                )}
                <Controller
                    name="abAgents.distB"
                    control={control}
                    defaultValue={50}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            style={{ width: '40px' }}
                            onChange={(e) => {
                                field.onChange(Number(e.target.value));
                                setValue('abAgents.distA', 100 - Number(e.target.value));
                            }}
                            defaultValue={50}
                        />
                    )}
                />
            </FormControl>
        </Box>
    );
};
