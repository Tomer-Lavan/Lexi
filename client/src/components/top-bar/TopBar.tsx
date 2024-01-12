import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { logout } from '@DAL/server-requests/users';
import { Pages } from '@app/App';
import useActiveUser from '@hooks/useActiveUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import theme from '@root/Theme';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBarText, LogoutButton, StyledAppBar, StyledIconButton, StyledToolBar } from './TopBar.s';

interface TopBarProps {
    setIsOpen: (boolean) => void;
}

const TopBar: React.FC<TopBarProps> = (props) => {
    const { setIsOpen } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { activeUser } = useActiveUser();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isLargerThanLaptop = useMediaQuery(theme.breakpoints.up('xl'));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
        dispatch(setActiveUser(null));
        navigate(Pages.GENERAL_LOGIN);
    };

    const logoSize = isLargerThanLaptop ? { width: 142, height: 86 } : { width: 100, height: 60 };

    return (
        <StyledAppBar position="static">
            <StyledToolBar sx={{ height: '8vh', minHeight: '8vh' }}>
                {isMobile && /\/e\/.+\/c\/.+/.test(location.pathname) ? (
                    <StyledIconButton color="inherit" onClick={() => setIsOpen(true)} style={{}}>
                        <ExitToAppOutlinedIcon />
                        <AppBarText>Finish</AppBarText>
                    </StyledIconButton>
                ) : (
                    <Box display="flex" alignItems="center">
                        {/\/e\/.+\/c\/.+/.test(location.pathname) && (
                            <IconButton color="inherit" onClick={() => navigate(-1)} style={{ padding: '0px' }}>
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                        <img src="/lexi_logo.png" alt="logo" width={logoSize.width} height={logoSize.height} />
                    </Box>
                )}
                <Box display="flex" gap="20px" alignItems="center">
                    {activeUser && activeUser.isAdmin && (
                        <>
                            <IconButton color="inherit" edge="end" onClick={handleMenu}>
                                <AccountCircleIcon style={{ fontSize: isLargerThanLaptop ? 40 : 30 }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                open={open}
                                onClose={handleClose}
                                style={{ marginTop: '-1vh' }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        navigate(Pages.ADMIN);
                                    }}
                                >
                                    Admin Panel
                                </MenuItem>
                                <MenuItem onClick={handleLogout} style={{ color: 'red' }}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                    {location.pathname === Pages.PROJECT_OVERVIEW && (
                        <IconButton
                            color="inherit"
                            href="https://github.com/Tomer-Lavan/Lexi"
                            sx={{ textTransform: 'none' }}
                        >
                            <GitHubIcon style={{ fontSize: isLargerThanLaptop ? 40 : 28 }} />
                        </IconButton>
                    )}
                    {activeUser && !activeUser.isAdmin && (
                        <LogoutButton size="small" variant="outlined" onClick={handleLogout}>
                            Logout
                        </LogoutButton>
                    )}
                </Box>
            </StyledToolBar>
        </StyledAppBar>
    );
};

export default TopBar;
