import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Divider, List, ListItem, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setActiveUser } from '../../../../DAL/redux/reducers/activeUserReducer';
import { logout } from '../../../../DAL/server-requests/usersDAL';
import { MainContainer, StyledListItemIcon } from './SideBar.s';

enum Sections {
    MODELS = 'models',
    EXPERIMENTS = 'experiments',
}

export const SidebarAdmin: React.FC<{ section; setSection }> = ({ section, setSection }) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await logout();
        dispatch(setActiveUser(null));
        // navigate(Pages.LOGIN);
    };

    const gradientCircleStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(to right, floralwhite, lightgrey, rgba(0, 112, 243, 0.25))', // Example gradient
        margin: '10px auto',
        opacity: '0.6',
    };

    return (
        <MainContainer>
            <List>
                <ListItem>
                    <div style={gradientCircleStyle} />
                </ListItem>
                <Divider style={{ backgroundColor: 'floralwhite' }} />
                <ListItem
                    button
                    style={{
                        paddingRight: '16px',
                        paddingLeft: '16px',
                        marginTop: '12px',
                        backgroundColor: section === Sections.EXPERIMENTS ? 'rgba(200,200,255,0.20)' : '',
                    }}
                    onClick={() => setSection(Sections.EXPERIMENTS)}
                >
                    <StyledListItemIcon>
                        <BookOutlinedIcon style={{ color: 'floralwhite', fontSize: '1.25rem' }} />
                    </StyledListItemIcon>
                    <Typography color={'floralwhite'}>Experiments</Typography>
                </ListItem>
                <ListItem
                    button
                    style={{
                        paddingRight: '16px',
                        paddingLeft: '16px',
                        backgroundColor: section === Sections.MODELS ? 'rgba(200,200,255,0.20)' : '',
                    }}
                    onClick={() => setSection(Sections.MODELS)}
                >
                    <StyledListItemIcon>
                        <AutoAwesomeOutlinedIcon style={{ color: 'floralwhite', fontSize: '1.25rem' }} />
                    </StyledListItemIcon>
                    <Typography color={'floralwhite'}>Models</Typography>
                </ListItem>
                <ListItem button style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                    <StyledListItemIcon>
                        <InsertChartOutlinedOutlinedIcon style={{ color: 'floralwhite', fontSize: '1.25rem' }} />
                    </StyledListItemIcon>
                    <Typography color={'floralwhite'}>Data</Typography>
                </ListItem>
                <ListItem button style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                    <StyledListItemIcon>
                        <SettingsOutlinedIcon style={{ color: 'floralwhite', fontSize: '1.25rem' }} />
                    </StyledListItemIcon>
                    <Typography color={'floralwhite'}>Settings</Typography>
                </ListItem>
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
            {/* <Button size={'small'} variant="outlined" style={{ color: '#ff5050', borderColor: '#ff5050' }}>
                Logout
            </Button> */}
        </MainContainer>
    );
};
