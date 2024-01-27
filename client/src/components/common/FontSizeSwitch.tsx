import AbcIcon from '@mui/icons-material/Abc';
import { Box, IconButton } from '@mui/material';

const FontSizeSwitch = ({ fontSize, setFontSize }) => {
    const toggleFontSize = () => {
        setFontSize((prevSize) => (prevSize === 'lg' ? 'sm' : 'lg'));
    };

    const buttonStyle = {
        border: '1px solid',
        borderRadius: 0,
        margin: '4px',
    };

    return (
        <Box style={{ display: 'flex', alignItems: 'end' }}>
            <IconButton
                style={{ ...buttonStyle }}
                color={fontSize === 'lg' ? 'primary' : 'default'}
                onClick={() => toggleFontSize()}
                aria-label="large font size"
            >
                <AbcIcon fontSize="large" />
            </IconButton>
            <IconButton
                color={fontSize === 'sm' ? 'primary' : 'default'}
                style={{ ...buttonStyle }}
                onClick={() => toggleFontSize()}
                aria-label="small font size"
            >
                <AbcIcon fontSize="medium" />
            </IconButton>
        </Box>
    );
};

export default FontSizeSwitch;
