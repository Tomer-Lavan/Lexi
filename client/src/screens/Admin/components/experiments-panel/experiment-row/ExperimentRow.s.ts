import { MenuItem, Select, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/system';

export const TableRowStyled = styled(TableRow)({
    '& > *': { borderBottom: 'unset' },
});

export const ExpInfo = styled(TableCell)({
    paddingBottom: 0,
    paddingTop: 0,
    background: '#f5f5f5',
});

export const ActiveExpSelect = styled(Select)<{ isActive: boolean }>(({ isActive }) => ({
    fontSize: '0.875rem',
    outline: 'none',
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    color: isActive ? 'green' : 'red',
    '& .MuiSelect-select': {
        padding: '0px',
        minWidth: '48px',
    },
}));

export const MenuItemStyled = styled(MenuItem)({
    fontSize: '0.875rem',
});
