import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { createContext, useContext, useState } from 'react';

export type SnackbarStatusType = 'success' | 'error' | 'warning' | 'info';

export const SnackbarStatus = { SUCCESS: 'success', ERROR: 'error', WARNING: 'warning', INFO: 'info' } as const;

interface SnackbarContextProps {
    openSnackbar: (message: string, status: SnackbarStatusType) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

interface SnackbarProviderProps {
    children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<SnackbarStatusType>(SnackbarStatus.SUCCESS);

    const openSnackbar = (message: string, status: SnackbarStatusType) => {
        setMessage(message);
        setStatus(status);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar }}>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
