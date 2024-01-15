import { AgentType } from '@models/AppModels';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, ListItem, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';

interface AgentHeaderProps {
    agent: AgentType;
    setAnchorEl: (HTMLElement) => void;
    setSelectedAgent: (AgentType) => void;
}

export const AgentHeader: React.FC<AgentHeaderProps> = ({ agent, setAnchorEl, setSelectedAgent }) => {
    const handleMoreOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, agent: AgentType) => {
        setAnchorEl(event.currentTarget);
        setSelectedAgent(agent);
    };

    return (
        <ListItem>
            <ListItemText
                primary={
                    <Box
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h5">{agent.title} </Typography>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(e) => handleMoreOptionsClick(e, agent)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                }
                secondary={<Typography variant="subtitle1">{agent.summary}</Typography>}
            />
        </ListItem>
    );
};
