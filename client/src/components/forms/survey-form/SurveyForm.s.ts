import { IsMobile } from '@models/StylesModels';
import { Box, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SurveyContainer = styled(Box)<IsMobile>(({ isMobile }) => ({
    width: '100%',
    padding: isMobile ? '8px' : '16px',
}));

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
