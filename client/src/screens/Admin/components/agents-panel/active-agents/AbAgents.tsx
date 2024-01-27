import { AbAgentsType, AgentType } from '@models/AppModels';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';

interface AbAgentsProps {
    agents: AgentType[];
    abAgents: AbAgentsType;
    handleChangeAB?: (any) => void;
    isRow?: boolean;
    setAbAgents?;
}

export const AbAgents: React.FC<AbAgentsProps> = ({ agents, abAgents, handleChangeAB, isRow = true }) => (
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
            <Select
                value={abAgents ? abAgents.agentA.title : ''}
                onChange={handleChangeAB}
                name="agentA"
                size="small"
                style={{ minWidth: '100px' }}
            >
                {agents.map((agent) => (
                    <MenuItem key={agent.title} value={agent.title}>
                        {agent.title}
                    </MenuItem>
                ))}
            </Select>
            <input
                type="number"
                name="distA"
                value={abAgents ? abAgents.distA : 50}
                onChange={handleChangeAB}
                style={{ width: '40px' }}
            />
        </FormControl>
        <FormControl
            margin="normal"
            size="small"
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
        >
            <Typography>Agent B:</Typography>
            <Select
                value={abAgents ? abAgents.agentB.title : ''}
                onChange={handleChangeAB}
                name="agentB"
                size="small"
                style={{ minWidth: '100px' }}
            >
                {agents.map((agent) => (
                    <MenuItem key={agent.title} value={agent.title}>
                        {agent.title}
                    </MenuItem>
                ))}
            </Select>
            <input
                type="number"
                name="distB"
                value={abAgents ? abAgents.distB : 50}
                onChange={handleChangeAB}
                style={{ width: '40px' }}
            />
        </FormControl>
    </Box>
);
