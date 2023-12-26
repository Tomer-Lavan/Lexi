import { Box, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledInputBox = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: '8px',
    border: '1px solid #ccc',
    borderRadius: '15px',
    marginBottom: '16px',
});

export const StyledInputBase = styled(InputBase)<{ fontSize }>(({ fontSize }) => ({
    fontSize: fontSize || '1.25rem',
    padding: '12px',
}));
