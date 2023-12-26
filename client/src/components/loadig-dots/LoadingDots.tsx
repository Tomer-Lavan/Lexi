import { Box } from '@mui/material';
import './LoadingDots.css'; // Import the CSS file

const LoadingDots = () => (
    <Box
        sx={{
            margin: 1.5,
            padding: 2,
            borderRadius: '12px',
            background: 'rgba(228, 193, 173, 0.7)',
            maxWidth: '80%',
            display: 'inline-block',
            clear: 'both',
            float: 'left',
        }}
    >
        <div className="loadingDots">
            <span />
            <span />
            <span />
        </div>
    </Box>
);

export default LoadingDots;
