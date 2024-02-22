import { WarningAmber } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import AsyncButton from './AsyncButton';

interface WarningMessageProps {
    handleYes: () => void;
    handleNO: () => void;
    isLoading?: boolean;
    children: React.ReactNode;
}

export const WarningMessage: React.FC<WarningMessageProps> = ({
    handleYes,
    handleNO,
    children,
    isLoading = false,
}) => (
    <Box padding={4}>
        <Box display={'flex'} flexDirection={'row'}>
            <WarningAmber color="warning" style={{ marginRight: '8px' }} />
            <Typography whiteSpace={'pre-line'}>{children}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" gap={4} style={{ marginTop: '16px' }}>
            <AsyncButton isLoading={isLoading} variant="contained" color="primary" onClick={handleYes}>
                Yes
            </AsyncButton>
            <Button variant="outlined" color="secondary" onClick={handleNO}>
                No
            </Button>
        </Box>
    </Box>
);
