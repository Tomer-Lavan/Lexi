import { Box, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '@root/Theme';

export const MainContainer = styled(Box)({
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    height: '92vh',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    paddingBottom: '32px',
});

export const ContentContainer = styled(Box)({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

export const StyledTypography = styled(Typography)({
    fontFamily: 'Work Sans',
});

export const StyledPaper = styled(Paper)({
    padding: '8px',
    elevation: '48px',
    border: '0.5px solid rgba(0, 0, 0, 0.1)',
});

export const StyledButton = styled(Button)({
    marginRight: '8px',
    border: `2px solid ${theme.palette.secondary.main}`,
});

export const FooterText = styled(Typography)({
    color: 'grey.500',
    paddingBottom: '8px',
    textAlign: 'center',
});
