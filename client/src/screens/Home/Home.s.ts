import { IsMobile } from '@models/StylesModels';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '@root/Theme';

export const StyledContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '92vh',
    gap: '3vh',
    paddingBottom: '6vh',
});

export const TitleContent = styled(Typography)({
    animation: 'fadeIn 1.5s ease-out forwards',
    opacity: 0,
    transform: 'scale(0.9)',
    width: '100%',
    textAlign: 'center',
    zIndex: 2,
    fontFamily: 'Work Sans',
    fontWeight: 500,
    fontSize: '4.5rem',
});

export const BodyContent = styled(Typography)({
    whiteSpace: 'pre-line',
    animation: 'slideIn 1.5s 0.5s ease-out forwards',
    opacity: 0,
    zIndex: 2,
    fontFamily: 'Work Sans',
    fontWeight: 400,
});

export const TextFieldStyled = styled(TextField)({
    width: '60%',
    '& .MuiInputBase-input': {
        whiteSpace: 'pre-line',
        animation: 'slideIn 1.5s 0.5s ease-out forwards',
        opacity: 0,
        zIndex: 2,
        fontFamily: 'Work Sans',
        fontWeight: 400,
        width: '100%',
        textAlign: 'center',
        ...theme.typography.h6,
    },
});

export const TitleTextField = styled(TextField)({
    width: 'fit-content',
    padding: 0,
    '& .MuiInputBase-input': {
        marginBottom: '16px',
        animation: 'fadeIn 1.5s ease-out forwards',
        opacity: 0,
        transform: 'scale(0.9)',
        zIndex: 2,
        ...theme.typography.h2,
        textAlign: 'center',
        fontFamily: 'Work Sans',
        fontWeight: 500,
        fontSize: '4.5rem',
        padding: 0,
    },
    '& .MuiInputBase-root': {
        padding: 0,
    },
});

export const StartButton = styled(Button)<IsMobile>(({ isMobile }) => ({
    fontSize: '1.2rem',
    padding: '4px 10px',
    width: !isMobile && '22vw',
    textTransform: 'none',
    fontFamily: 'Work Sans',
    border: `2px solid ${theme.palette.secondary.main}`,
    marginTop: '16px',
    color: 'black',

    background: `linear-gradient(to right, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.main} 50%, white 50%)`,
    backgroundSize: '200% 100%',
    backgroundPosition: 'right bottom',

    transition: 'background-position 1s ease, color 1s ease',

    '&:hover': {
        color: 'white',
        backgroundPosition: 'left bottom',
    },
}));

export const ButtonsBox = styled(Box)({
    position: 'absolute',
    top: '9vh',
    right: '1vw',
    display: 'flex',
});
