import DownloadIcon from '@mui/icons-material/Download';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

export const MoreOptionsMenu = ({
    anchorEl,
    onMenuClose,
    handleMenuAction,
}: {
    anchorEl: null | HTMLElement;
    onMenuClose: () => void;
    handleMenuAction;
}) => (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMenuClose}>
        <MenuItem
            onClick={() => {
                onMenuClose();
                handleMenuAction('share');
            }}
        >
            <ListItemIcon>
                <ShareOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem
            onClick={() => {
                onMenuClose();
                handleMenuAction('edit');
            }}
        >
            <ListItemIcon>
                <EditOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
            onClick={() => {
                onMenuClose();
                handleMenuAction('downloadJSON');
            }}
        >
            <ListItemIcon>
                <SimCardDownloadOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Download JSON</ListItemText>
        </MenuItem>
        <MenuItem
            onClick={() => {
                onMenuClose();
                handleMenuAction('downloadExcel');
            }}
        >
            <ListItemIcon>
                <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Download Excel</ListItemText>
        </MenuItem>
        {/* Add more menu items here if needed */}
    </Menu>
);
