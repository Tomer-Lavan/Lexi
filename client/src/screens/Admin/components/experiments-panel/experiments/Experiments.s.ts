import { Button, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import theme from '@root/Theme';

export const MainContainerStyled = styled('div')({
    maxWidth: 'lg',
    width: '100%',
    padding: '2%',
});

export const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export const AddButton = styled(Button)({
    height: 'fit-content',
    display: 'flex',
    borderRadius: '8px',
    cursor: 'pointer',
    width: 'fit-content',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '4px',
    paddingRight: '16px',
    textDecoration: 'none',
    textTransform: 'none',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
});
