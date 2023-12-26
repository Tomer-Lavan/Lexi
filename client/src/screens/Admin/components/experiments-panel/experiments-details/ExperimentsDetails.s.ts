import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const GridContainerStyled = styled(Grid)({
    minHeight: '80px',
});

export const AdressContainer = styled(Grid)({
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    marginBottom: '8px',
});

export const TypographyStyled = styled(Typography)({
    fontSize: '0.875rem',
});

export const GridItemStyled = styled(Grid)({
    gap: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
