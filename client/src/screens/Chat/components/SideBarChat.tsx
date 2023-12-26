import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Box, List, ListItem } from '@mui/material';
import { ListItemText, StyledListItemIcon } from '../../Admin/components/sidebar-admin/SideBar.s';

interface SidebarProps {
    setIsOpen;
}

export const SidebarChat: React.FC<SidebarProps> = ({ setIsOpen }) => (
    <Box
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            borderRight: '1px solid #ccc',
        }}
    >
        <List>
            <ListItem
                button
                onClick={() => setIsOpen(true)}
                style={{ display: 'flex', justifyContent: 'space-around' }}
            >
                <StyledListItemIcon>
                    <ExitToAppOutlinedIcon />
                    <ListItemText>Finish</ListItemText>
                </StyledListItemIcon>
                {/* <Tooltip
                    title={
                        <Typography>
                            To wrap up, simply click the 'Finish' button. Following that, you'll be prompted to
                            complete a brief questionnaire. Afterwards, you'll receive a link for another quick
                            survey. Thank you for your cooperation!
                        </Typography>
                    }
                >
                <HelpOutlineIcon sx={{ ml: 1, color: 'action.active', fontSize: 20 }} />
            </Tooltip> */}
            </ListItem>
            <ListItem>
                <ListItemText textAlign={'center'} sx={{ fontSize: '0.875rem' }}>
                    To conclude, click 'Finish', complete a short questionnaire, and then receive a link for
                    another brief survey. Thanks for your cooperation!
                </ListItemText>
            </ListItem>
        </List>
    </Box>
);
