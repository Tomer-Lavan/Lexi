import { AdminSections } from '@DAL/constants';
import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { logout } from '@DAL/server-requests/users';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { MainContainer, StyledListItemIcon } from './SideBar.s';
import { StyledListItem } from './SideBarAdmin.s';

const gradientCircleStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(to right, floralwhite, lightgrey, rgba(0, 112, 243, 0.25))', // Example gradient
    margin: '10px auto',
    opacity: '0.6',
};

const sectionsConfig = [
    { id: AdminSections.EXPERIMENTS, label: 'Experiments', Icon: BookOutlinedIcon },
    { id: AdminSections.MODELS, label: 'Models', Icon: AutoAwesomeOutlinedIcon },
    { id: AdminSections.DATA, label: 'Data', Icon: InsertChartOutlinedOutlinedIcon },
    { id: AdminSections.SETTINGS, label: 'Settings', Icon: SettingsOutlinedIcon },
];

export const SidebarAdmin = ({ section, setSection }) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
        dispatch(setActiveUser(null));
    };

    const renderListItem = (item) => (
        <StyledListItem
            key={item.id}
            section={item.id}
            currentSection={section}
            onClick={() => (item.id === 'logout' ? handleLogout() : setSection(item.id))}
        >
            <StyledListItemIcon>
                <item.Icon style={{ color: 'floralwhite', fontSize: '1.25rem' }} />
            </StyledListItemIcon>
            <Typography color={'floralwhite'}>{item.label}</Typography>
        </StyledListItem>
    );

    return (
        <MainContainer>
            <List>
                <ListItem>
                    <Box style={gradientCircleStyle} />
                </ListItem>
                <Divider style={{ backgroundColor: 'floralwhite' }} />
                {sectionsConfig.map(renderListItem)}
            </List>
            <ListItem
                button
                style={{ paddingRight: '16px', paddingLeft: '16px', marginBottom: '16px' }}
                onClick={handleLogout}
            >
                <Divider style={{ backgroundColor: 'floralwhite' }} />
                <StyledListItemIcon>
                    <ExitToAppOutlinedIcon style={{ color: 'floralwhite', fontSize: '1.25rem' }} />
                </StyledListItemIcon>
                <Typography color={'floralwhite'}>Logout</Typography>
            </ListItem>
        </MainContainer>
    );
};
