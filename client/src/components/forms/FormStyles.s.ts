// Login.styles.ts
import { IsMobile } from '@models/StylesModels';
import { Box, Button, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SubFormMainContainer = styled(Box)<{ size?: string }>(({ size }) => ({
    marginTop: '4px',
    width: size || '100%',
}));

export const FormContainer = styled(Grid)({
    width: '100%',
    marginTop: '4px',
});

export const ButtonBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 'fit-content',
});

export const FieldTitle = styled(Typography)({
    color: 'grey',
    marginBottom: '8px',
    borderBottom: '1px solid grey',
});

export const FormButton = styled(Button)({
    marginTop: '12px',
    marginBottom: '16px',
    paddingLeft: '48px',
    paddingRight: '48px',
});

export const SurveyContainer = styled(Box)({
    width: '100%',
    padding: '16px',
});

export const SurveyTitle = styled(Typography)({
    margin: '16px',
    marginBottom: '32px',
});

export const SurveyFieldTitle = styled(Typography)<IsMobile>(({ isMobile }) => ({
    textAlign: isMobile ? 'justify' : 'center',
    fontSize: isMobile ? '0.875rem' : '1rem',
}));

export const StyledRadioGroup = styled(RadioGroup)<IsMobile>(({ isMobile }) => ({
    gap: isMobile ? '0px' : '32px',
    justifyContent: 'center',
}));

export const StyledRadio = styled(Radio)({
    '& .MuiSvgIcon-root': {
        fontSize: 16,
    },
    padding: '4px',
});

export const StyledFormControlLabel = styled(FormControlLabel)({
    marginRight: '8px',
});

export const RadioGroupContainer = styled(Grid)({
    borderRight: '1px solid #D3D3D3',
    borderLeft: '1px solid #D3D3D3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const SurveyButtonContainer = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '24px',
});

export const FitButton = styled(Button)({
    width: 'fit-content',
    marginTop: '8px',
});

export const TermsMainContainer = styled(Box)({
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
});

export const TermsPaper = styled(Paper)({
    maxHeight: 250,
    overflow: 'auto',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',
});

export const TermsBox = styled(Box)({
    width: '95%',
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
