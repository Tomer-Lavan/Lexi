import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react';

interface AsyncButtonProps extends ButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
    progressColor?: string;
}

const AsyncButton: React.FC<AsyncButtonProps> = ({ isLoading, children, progressColor, ...otherProps }) => (
    <Button variant="contained" color="primary" {...otherProps}>
        {isLoading ? <CircularProgress size={28} sx={{ color: progressColor || 'white' }} /> : children}
    </Button>
);

export default AsyncButton;
