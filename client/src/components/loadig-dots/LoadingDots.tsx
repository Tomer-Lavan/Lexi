import { Box } from '@mui/material';
import theme from '@root/Theme';
import './LoadingDots.css';

const LoadingDots = () => (
    <Box
        sx={{
            margin: 1.5,
            padding: 2,
            borderRadius: '12px',
            background: theme.palette.assistantMessage.main,
            maxWidth: '80%',
            display: 'inline-block',
            clear: 'both',
            float: 'left',
        }}
    >
        <Box className="loadingDots">
            <span />
            <span />
            <span />
        </Box>
    </Box>
);

export default LoadingDots;
