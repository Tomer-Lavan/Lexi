import { IsMobile } from '@models/StylesModels';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ConversationFormContainer = styled(Box)<IsMobile>(({ isMobile }) => ({
    width: isMobile ? '100%' : '52vw',
    padding: isMobile ? '8px' : '16px',
}));

export const ConversationFormTitle = styled(Typography)({
    margin: '16px',
    marginBottom: '32px',
});

export const ConversationFormFieldTitle = styled(Typography)<IsMobile>(({ isMobile }) => ({
    textAlign: isMobile ? 'justify' : 'center',
    fontSize: isMobile ? '0.875rem' : '1rem',
}));

export const ConversationFormButtonContainer = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '24px',
});
