import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '@root/Theme';

export const StyledContainer = styled(Box)({
    width: '100%',
    marginTop: '16px',
    maxHeight: '75vh',
});

export const FormContainer = styled(Grid)({
    width: '100%',
});

export const NoteText = styled(Typography)({
    fontSize: '0.75rem',
    color: 'rgba(0, 0, 0, 0.6)',
    padding: '8px',
});

export const FormButton = styled(Button)({
    marginTop: '20px',
    paddingLeft: '48px',
    paddingRight: '48px',
    backgroundColor: 'white',
    border: `2px solid ${theme.palette.secondary.main}`,
});

export const FitButton = styled(Button)({
    width: 'fit-content',
    marginTop: '8px',
});
