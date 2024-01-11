import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)({
    height: 'fit-content',
});

export const StyledToolBar = styled(Toolbar)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '8vh',
    '&.MuiToolbar-root': {
        minHeight: '8vh',
    },
});

export const StyledIconButton = styled(IconButton)({
    padding: '0px',
    gap: '4px',
});

export const AppBarText = styled(Typography)({
    fontSize: '1.1rem',
    fontWeight: '500',
});

export const LogoutButton = styled(Button)({
    borderBottom: '2px solid red',
    color: 'white',
    backgroundColor: 'transparent',
    height: '50%',
    fontSize: '1.1rem',
    fontFamily: 'Work Sans',
    borderRadius: '0',
    padding: 0,
    textTransform: 'none',
    marginRight: '4px',
});
