import { Box, ListItemButton, ListItemIcon, Typography } from '@mui/material';
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

export const StyledListItem = styled(ListItemButton)<{ currentSection?: string; section?: string }>(
    ({ currentSection, section }) => ({
        paddingLeft: '15%',
        marginTop: '12px',
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '8px',
            backgroundColor: currentSection === section ? 'rgba(142, 243, 253, 0.8)' : 'transparent',
        },
    }),
);
