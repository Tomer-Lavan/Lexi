import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ModelType } from '../../../../../models/AppModels';

interface ModelHeaderProps {
    model: ModelType;
    setAnchorEl: (HTMLElement) => void;
    setSelectedModel: (ModelType) => void;
}

export const ModelHeader: React.FC<ModelHeaderProps> = ({ model, setAnchorEl, setSelectedModel }) => {
    const handleMoreOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, model: ModelType) => {
        setAnchorEl(event.currentTarget);
        setSelectedModel(model);
    };

    return (
        <ListItem>
            <ListItemText
                primary={
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h5">{model.title} </Typography>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(e) => handleMoreOptionsClick(e, model)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                }
                secondary={<Typography variant="subtitle1">{model.summary}</Typography>}
            />
        </ListItem>
    );
};
