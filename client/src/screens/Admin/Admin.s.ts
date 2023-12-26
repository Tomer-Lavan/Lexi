import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';

export const MainContainer = styled(Grid)({
    backgroundColor: 'white',
});

export const SectionContainer = styled(Container)({
    height: 'fit-content',
    padding: 0,
    maxWidth: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
});

export const SectionInnerContainer = styled(Grid)({
    height: '100vh',
    overflowY: 'auto',
});

export const EmptySection = styled('div')({
    borderLeft: '1px solid #ccc',
    height: '100%',
});
