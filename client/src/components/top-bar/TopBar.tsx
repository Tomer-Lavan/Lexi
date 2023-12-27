import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Button, IconButton, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setActiveUser } from '../../DAL/redux/reducers/activeUserReducer';
import { logout } from '../../DAL/server-requests/usersDAL';
import theme from '../../Theme';
import { Pages } from '../../app/App';
import useActiveUser from '../../hooks/useActiveUser';
import { AppBarText, StyledAppBar, StyledIconButton, StyledToolBar } from './TopBar.s';

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

    const handleLogout = async () => {
        await logout();
        dispatch(setActiveUser(null));
        navigate(Pages.GENERAL_LOGIN);
    };

    return (
        <StyledAppBar position="static">
            <StyledToolBar style={{ height: '2vh', minHeight: '7vh' }}>
                {isMobile && location.pathname.includes('/chat/') ? (
                    <StyledIconButton color="inherit" onClick={() => setIsOpen(true)} style={{}}>
                        <ExitToAppOutlinedIcon />
                        <AppBarText>Finish</AppBarText>
                    </StyledIconButton>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/\/e\/.+\/c\/.+/.test(location.pathname) && (
                            <IconButton color="inherit" onClick={() => navigate(-1)}>
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                        <AppBarText>{activeUser.nickname}</AppBarText>
                    </div>
                )}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {activeUser && activeUser.isAdmin && (
                        <IconButton color="inherit" edge="end" onClick={() => navigate(Pages.ADMIN)}>
                            <AccountCircleIcon />
                        </IconButton>
                    )}
                    <Button
                        size="small"
                        variant="outlined"
                        style={{
                            borderColor: 'red',
                            color: 'red',
                            backgroundColor: 'white',
                            height: '50%',
                            fontSize: '0.8rem',
                            borderRadius: '12px',
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </StyledToolBar>
        </StyledAppBar>
    );
};

export default TopBar;
