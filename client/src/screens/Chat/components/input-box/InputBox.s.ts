import { Box, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '@root/Theme';

export const StyledInputBox = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: '8px',
    border: `1.5px solid ${theme.palette.primary.main}`,
    borderRadius: '16px',
    marginBottom: '42px',
});

export const StyledInputBase = styled(InputBase)<{ fontSize }>(({ fontSize }) => ({
    fontSize: fontSize || '1.25rem',
    padding: '12px',
}));
