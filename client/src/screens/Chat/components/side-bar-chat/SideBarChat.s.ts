import { Box, List, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ListBox = styled(Box)({
    p: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    borderRight: '1px solid #ccc',
});

export const StyledList = styled(List)({
    height: '100%',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: '1px solid #ccc',
    paddingBottom: '42px',
});

export const StyledListItem = styled(ListItemButton)({
    display: 'flex',
    justifyContent: 'start',
});
