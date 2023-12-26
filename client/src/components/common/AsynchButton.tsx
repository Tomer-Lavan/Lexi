import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react';

// Extend the props of AsynchButton to include all standard button properties
interface AsynchButtonProps extends ButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
    progressColor?: string;
}

const AsynchButton: React.FC<AsynchButtonProps> = ({ isLoading, children, progressColor, ...otherProps }) => (
    <Button variant="contained" color="primary" {...otherProps}>
        {isLoading ? <CircularProgress size={28} sx={{ color: progressColor || 'white' }} /> : children}
    </Button>
);

export default AsynchButton;
