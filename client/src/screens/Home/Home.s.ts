import { IsMobile } from '@models/StylesModels';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '@root/Theme';

export const Container = styled(Grid)<IsMobile>(({ isMobile }) => ({
    height: '93vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: isMobile ? 'column' : 'row',
    flexWrap: isMobile ? 'nowrap' : 'wrap',
}));

export const ContentContainer = styled('div')<IsMobile>(({ isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: !isMobile && '67px',
    width: isMobile ? '100%' : '80%',
}));

export const GridItem = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

export const TitleContent = styled(Typography)({
    marginBottom: '16px',
    animation: 'fadeIn 1.5s ease-out forwards', // Added 'forwards' here
    opacity: 0,
    transform: 'scale(0.9)',
    width: 'fit-content',
    zIndex: 2,
});

export const TitleBackgroundHighlight = styled('div')({
    height: '6vh',
    backgroundColor: 'rgba(228, 193, 173, 0.7)',
    width: '60%',
    bottom: '45px',
    position: 'relative',
    marginBottom: '-20px',
    zIndex: 1,
});

export const BodyContent = styled(Typography)({
    // lineHeight: '1.1rem',
    whiteSpace: 'pre-line',
    animation: 'slideIn 1.5s 0.5s ease-out forwards',
    opacity: 0,
    zIndex: 2,
});

export const TextFieldStyled = styled(TextField)({
    width: '100%',
    '& .MuiInputBase-input': {
        // lineHeight: '1.1rem',
        whiteSpace: 'pre-line',
        animation: 'slideIn 1.5s 0.5s ease-out forwards',
        opacity: 0,
        zIndex: 2,
        // color: theme.palette.text.primary,
        ...theme.typography.h6,
    },
});

export const TitleTextField = styled(TextField)({
    width: '100%',
    padding: 0,
    '& .MuiInputBase-input': {
        marginBottom: '16px',
        animation: 'fadeIn 1.5s ease-out forwards',
        opacity: 0,
        transform: 'scale(0.9)',
        width: 'fit-content',
        zIndex: 2,
        ...theme.typography.h2,
        padding: 0,
    },
    '& .MuiInputBase-root': {
        padding: '0', // Change this to your desired padding
    },
});

export const StartButton = styled(Button)<IsMobile>(({ isMobile }) => ({
    fontSize: '1.2rem',
    padding: '4px 10px',
    width: !isMobile && '22vw',
}));

export const DividerGrid = styled(Grid)<IsMobile>(({ isMobile }) => ({
    borderLeft: !isMobile && '1px solid #ccc',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
}));
