import { Box, Paper, TableCell } from '@mui/material';
import { styled } from '@mui/system';

export const ListBox = styled(Box)({
    width: '100%',
    marginTop: '16px',
});

export const ButtonsBox = styled(Box)({
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    marginTop: '4px',
    marginRight: '4px',
    marginBottom: '4px',
});

export const ColumnTitle = styled(TableCell)({
    fontWeight: 'bold',
    paddingTop: 0,
    paddingBottom: '4px',
});

export const TablePaper = styled(Paper)({
    width: '100%',
    mb: 2,
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.37)',
});
