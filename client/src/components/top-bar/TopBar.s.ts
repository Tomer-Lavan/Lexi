import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)({
    height: 'fit-content',
});

export const StyledToolBar = styled(Toolbar)({
    width: '100%',
    height: '2vh',
    minHeight: '7vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const StyledIconButton = styled(IconButton)({
    padding: '0px',
});

export const AppBarText = styled(Typography)({
    fontSize: '1.1rem',
    fontWeight: '500',
});
