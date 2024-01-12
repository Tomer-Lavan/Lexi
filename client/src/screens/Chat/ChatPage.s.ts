import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';

export const MainContainer = styled(Grid)({
    backgroundColor: 'white',
});

export const SectionContainer = styled(Container)({
    justifyContent: 'center',
    height: 'fit-content',
    padding: 0,
    maxWidth: '100%',
    width: '100%',
    display: 'flex',
});

export const SectionInnerContainer = styled(Grid)({
    height: '93vh',
    minHeight: '93vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const EmptySection = styled('div')({
    borderLeft: '1px solid #ccc',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
});

export const MessageListContainer = styled(Grid)({
    flex: 1,
    overflow: 'auto',
    marginBottom: '8px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
});
