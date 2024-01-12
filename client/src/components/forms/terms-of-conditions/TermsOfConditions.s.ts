import { Box, FormControlLabel, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TermsMainContainer = styled(Box)({
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
});

export const TermsPaper = styled(Paper)({
    maxHeight: 230,
    overflow: 'auto',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',
});

export const TermsBox = styled(Box)({
    width: '100%',
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    padding: '8px',
    overflowY: 'scroll',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
});

export const TermsMenuContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});

export const TermsFormControl = styled(FormControlLabel)({
    marginLeft: '28px',
});

export const TermsButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});
