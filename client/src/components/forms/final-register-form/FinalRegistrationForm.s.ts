import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormButton = styled(Button)({
    paddingLeft: '48px',
    paddingRight: '48px',
    marginBottom: 0,
    marginTop: '16px',
});

export const SliderTitle = styled(Typography)({
    color: 'grey',
    marginBottom: '8px',
    borderBottom: '1px solid grey',
});

export const ButtonBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 'fit-content',
});
