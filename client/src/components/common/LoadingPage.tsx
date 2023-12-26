import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingPage: React.FC = () => (
    <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
        <CircularProgress size={80} />
    </Box>
);

export default LoadingPage;
