import { Box, ListItem, ListItemIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)({
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    borderRight: '1px solid #ccc',
});

export const StyledListItemIcon = styled(ListItemIcon)({
    minWidth: '32px',
    gap: '8px',
    color: 'rgba(0, 0, 0, 0.7)',
});

export const ListItemText = styled(Typography)({
    fontSize: '1.1rem',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.7)',
});

export const StyledListItem = styled(ListItem)({
    padding: 0,
});
