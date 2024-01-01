import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../../../Theme';

export const MainContainerStyled = styled('div')({
    maxWidth: 'lg',
    width: '100%',
    padding: '2%',
});

export const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
});

export const TypographyStyled = styled(Typography)({
    variant: 'h4',
    gutterBottom: true,
});

export const IconButtonStyled = styled(IconButton)({
    position: 'absolute',
    right: 8,
    top: 8,
    color: theme.palette.grey[500],
});

export const PointerDiv = styled('div')({
    border: '1px solid black',
    height: 'fit-content',
    display: 'flex',
    borderRadius: '8px',
    cursor: 'pointer',
});