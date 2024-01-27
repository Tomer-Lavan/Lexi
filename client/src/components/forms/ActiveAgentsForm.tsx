import { defaultAbAgents, defaultSettings } from '@DAL/constants';
import { AbAgentsType, AgentType, AgentsModes, ExperimentType } from '@models/AppModels';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { AbAgents } from '@screens/Admin/components/agents-panel/active-agents/AbAgents';
import { MainContainer } from '@screens/Admin/components/agents-panel/agent-form/AgentForm.s';
import React, { useState } from 'react';

const agentsModes = ['Single', 'A/B'] as const;

interface ActiveAgentsFormProps {
    experiment: ExperimentType;
    setExperiment: (experiment: ExperimentType) => void;
    agents: AgentType[];
    isRow?: boolean;
}

export const ActiveAgentsForm: React.FC<ActiveAgentsFormProps> = ({
    experiment,
    setExperiment,
    agents,
    isRow = true,
}) => {
    const [abAgents, setAbAgents] = useState<AbAgentsType>(experiment.abAgents || defaultAbAgents);

    const handleActiveAgentChange = (event) => {
        const { value } = event.target;
        const selectedAgent = agents.find((agent) => agent.title === value);
        setExperiment({ ...experiment, activeAgent: selectedAgent || defaultSettings });
    };

    const handleAgentsModeChange = (event) => {
        const { value } = event.target;
        setExperiment({ ...experiment, agentsMode: value });
    };

    const handleChangeAB = (event) => {
        const { name, value } = event.target;
        if (name !== 'distA' && name !== 'distB') {
            const selectedAgent = agents.find((agent) => agent.title === value);
            setAbAgents({ ...abAgents, [name]: selectedAgent });
            setExperiment({ ...experiment, abAgents: { ...abAgents, [name]: selectedAgent } });
        } else {
            setAbAgents({
                ...abAgents,
                [name]: Number(value),
                ['distA' === name ? 'distB' : 'distA']: 100 - value,
            });
            setExperiment({
                ...experiment,
                abAgents: { ...abAgents, [name]: value, ['distA' === name ? 'distB' : 'distA']: 100 - value },
            });
        }
    };

    return (
        <MainContainer
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: isRow ? 'row' : 'column',
                alignItems: 'start',
                width: '100%',
                gap: isRow ? 4 : 0,
                padding: 0,
                justifyContent: 'start',
            }}
            disableGutters
        >
            <FormControl
                margin="normal"
                size="small"
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
            >
                <Typography>Experimental Design:</Typography>
                <Select
                    labelId="agent-mode-select-label"
                    value={experiment.agentsMode}
                    onChange={handleAgentsModeChange}
                    name="agentsMode"
                >
                    {agentsModes.map((mode) => (
                        <MenuItem key={mode} value={mode}>
                            {mode === AgentsModes.SINGLE ? 'Single Condition' : AgentsModes.AB}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {experiment.agentsMode === AgentsModes.SINGLE ? (
                <FormControl
                    margin="normal"
                    size="small"
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
                >
                    <Typography>Active Agent:</Typography>
                    <Select
                        labelId="active-agent-select-label"
                        value={experiment.activeAgent ? experiment.activeAgent.title : ''}
                        onChange={handleActiveAgentChange}
                        name="activeAgent"
                        style={{ minWidth: '100px' }}
                    >
                        {agents.map((agent) => (
                            <MenuItem key={agent.title} value={agent.title}>
                                {agent.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                <AbAgents agents={agents} abAgents={abAgents} handleChangeAB={handleChangeAB} isRow={isRow} />
            )}
        </MainContainer>
    );
};
