import { ModelType } from '@models/AppModels';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Dialog,
    Divider,
    IconButton,
    List,
    Menu,
    MenuItem,
    Paper,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { AddButton, MainContainerStyled } from '../../experiments-panel/experiments/Experiments.s';
import ModelForm from '../model-form/ModelForm';
import { ModelDetails } from './ModelDetails';
import { ModelHeader } from './ModelHeader';

export interface ModelsListContainerProps {
    models: ModelType[];
    setModels: (any) => void;
}

export const ModelsListContainer: React.FC<ModelsListContainerProps> = ({ models, setModels }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModelFormDialog, setOpenModelFormDialog] = useState(false);
    const [selectedModel, setSelectedModel] = useState<ModelType | undefined>(undefined);
    const [editModel, setEditModel] = useState<ModelType | undefined>(null);

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedModel(undefined);
    };

    const closeDialog = () => {
        setOpenModelFormDialog(false);
        if (editModel) {
            setEditModel(null);
            setIsEditMode(false);
        }
    };

    const handleMenuAction = (action: string) => {
        if (action === 'edit') {
            setEditModel(selectedModel);
            setIsEditMode(true);
            setOpenModelFormDialog(true);
        } else if (action === 'duplicate') {
            setEditModel(selectedModel);
            setOpenModelFormDialog(true);
        }
        handleClose();
    };

    return (
        <MainContainerStyled>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid gray', marginBottom: '24px' }}>
                Models
            </Typography>
            <Typography variant="h5" gutterBottom fontWeight={500}>
                Manage Your Models
            </Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="body2" gutterBottom fontWeight={500} marginBottom={2}>
                    Manage your models, create a unique agent by prompt engineering, revisite your prompts and
                    more.
                </Typography>
                <Box display={'flex'} justifyContent={'end'}>
                    <AddButton onClick={() => setOpenModelFormDialog(true)} size="small">
                        <AddIcon style={{ color: 'floralwhite' }} />
                        <Typography variant="body2" fontWeight={500} color={'floralwhite'}>
                            Add Model
                        </Typography>
                    </AddButton>
                </Box>
            </Box>
            <List>
                {models.length ? (
                    models.map((model, index) => (
                        <Paper elevation={3} key={model._id?.toString() || index} sx={{ margin: '10px' }}>
                            <ModelHeader
                                model={model}
                                setSelectedModel={setSelectedModel}
                                setAnchorEl={setAnchorEl}
                            />
                            <Divider />
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="subtitle2">Detailed Settings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ModelDetails model={model} />
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    ))
                ) : (
                    <Typography variant="body1" textAlign={'center'} width={'100%'} margin={2}>
                        <b>No models found</b>
                    </Typography>
                )}
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleMenuAction('edit')}>Edit</MenuItem>
                    <MenuItem onClick={() => handleMenuAction('duplicate')}>Duplicate</MenuItem>
                </Menu>
            </List>
            <Dialog open={openModelFormDialog} maxWidth={'lg'}>
                <IconButton
                    aria-label="close"
                    onClick={closeDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <ModelForm
                    editModel={editModel}
                    setModels={setModels}
                    models={models}
                    closeDialog={closeDialog}
                    isEditMode={isEditMode}
                />
            </Dialog>
        </MainContainerStyled>
    );
};
