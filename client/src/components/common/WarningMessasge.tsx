import { WarningAmber } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { SaveButton } from '../../screens/Admin/components/agents-panel/agent-form/AgentForm.s';

export const WarningMessage: React.FC<{
    handleYes: () => void;
    handleNO: () => void;
    children: React.ReactNode;
}> = ({ handleYes, handleNO, children }) => (
    <Box padding={4}>
        <Box display={'flex'} flexDirection={'row'}>
            <WarningAmber color="warning" style={{ marginRight: '8px' }} />
            <Typography whiteSpace={'pre-line'}>{children}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" gap={4}>
            <SaveButton variant="contained" color="primary" onClick={handleYes}>
                Yes
            </SaveButton>
            <SaveButton variant="outlined" color="secondary" onClick={handleNO}>
                No
            </SaveButton>
        </Box>
    </Box>
);
