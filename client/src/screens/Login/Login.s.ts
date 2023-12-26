// Login.styles.ts
import { Button, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IsMobile } from '../../models/StylesModels';

export const MainContainer = styled('div')<IsMobile>(({ isMobile }) => ({
    display: 'flex',
    height: '100vh',
    flexDirection: isMobile ? 'column' : 'row',
}));

export const FormSide = styled(Paper)({
    flex: '7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
});

export const GradientSide = styled('div')<IsMobile>(({ isMobile }) => ({
    flex: '3',
    background:
        'url(https://images.unsplash.com/photo-1591530201596-c5076b7c60ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: isMobile ? 'center' : 'left',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    backgroundSize: 'cover',
}));

export const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#102C57',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#102C57',
        },
        '&:hover fieldset': {
            borderColor: '#102C57',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#102C57',
        },
    },
    marginBottom: '16px',
    width: '100%',
});

export const DividerButtonsContainer = styled('div')<IsMobile>(({ isMobile }) => ({
    display: 'flex',
    flexDirection: isMobile ? 'row' : 'column',
    justifyContent: isMobile ? 'center' : 'start',
    alignItems: 'center',
    gap: '16px',
}));

interface DividerButtonProps {
    isActive: boolean;
    isMobile?: boolean;
}

export const DividerButton = styled(Button)<DividerButtonProps>(({ isActive, isMobile }) => ({
    minWidth: '120px',
    color: isActive ? 'black' : 'white',
    background: isActive ? 'white' : 'transparent',
    boxShadow: 'none',
    borderRadius: isMobile ? '32px 32px 32px 32px' : '0 16px 16px 0',
    padding: !isMobile && '10px 36px',
    height: isMobile && '10vh',
    fontSize: '1rem',
    '&& .MuiButton-root': {
        boxShadow: 'none',
        padding: '10px 32px',
        fontSize: '1rem',
    },
    '&:hover': {
        background: isActive && 'white',
    },
}));
