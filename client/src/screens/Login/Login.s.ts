// Login.styles.ts
import { IsMobile } from '@models/StylesModels';
import { Box, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '@root/Theme';

export const MainContainer = styled(Box)({
    display: 'flex',
    height: '92vh',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
});

export const FormSide = styled(Paper)<IsMobile>(({ isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isMobile ? '16px' : '32px',
    overflowY: 'auto',
    marginBottom: '5vh',
    maxHeight: '75vh',
    width: isMobile ? '90%' : 'auto',
}));

export const DividerButtonsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    flex: '0 0 auto',
});

export const FormTypeButton = styled(Button)<{ isSignUp: boolean }>(({ isSignUp }) => ({
    borderBottom: isSignUp ? `2px solid ${theme.palette.secondary.main}` : '',
    borderRadius: 0,
    fontSize: '1.2rem',
    fontWeight: 600,
    textTransform: 'none',
}));
