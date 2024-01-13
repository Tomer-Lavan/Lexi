import { AgentType } from '@models/AppModels';
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
import AgentForm from '../agent-form/AgentForm';
import { AgentDetails } from './AgentDetails';
import { AgentHeader } from './AgentHeader';

export interface AgentsListContainerProps {
    agents: AgentType[];
    setAgents: (any) => void;
}

export const AgentsListContainer: React.FC<AgentsListContainerProps> = ({ agents, setAgents }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openAgentFormDialog, setOpenAgentFormDialog] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<AgentType | undefined>(undefined);
    const [editAgent, setEditAgent] = useState<AgentType | undefined>(null);

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedAgent(undefined);
    };

    const closeDialog = () => {
        setOpenAgentFormDialog(false);
        if (editAgent) {
            setEditAgent(null);
            setIsEditMode(false);
        }
    };

    const handleMenuAction = (action: string) => {
        if (action === 'edit') {
            setEditAgent(selectedAgent);
            setIsEditMode(true);
            setOpenAgentFormDialog(true);
        } else if (action === 'duplicate') {
            setEditAgent(selectedAgent);
            setOpenAgentFormDialog(true);
        }
        handleClose();
    };

    return (
        <MainContainerStyled>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid gray', marginBottom: '24px' }}>
                Agents
            </Typography>
            <Typography variant="h5" gutterBottom fontWeight={500}>
                Manage Your Agents
            </Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="body2" gutterBottom fontWeight={500} marginBottom={2}>
                    Manage your agents, create a unique agent by prompt engineering, revisite your prompts and
                    more.
                </Typography>
                <Box display={'flex'} justifyContent={'end'}>
                    <AddButton onClick={() => setOpenAgentFormDialog(true)} size="small">
                        <AddIcon style={{ color: 'floralwhite' }} />
                        <Typography variant="body2" fontWeight={500} color={'floralwhite'}>
                            Add Agent
                        </Typography>
                    </AddButton>
                </Box>
            </Box>
            <List>
                {agents.length ? (
                    agents.map((agent, index) => (
                        <Paper elevation={3} key={agent._id?.toString() || index} sx={{ margin: '10px' }}>
                            <AgentHeader
                                agent={agent}
                                setSelectedAgent={setSelectedAgent}
                                setAnchorEl={setAnchorEl}
                            />
                            <Divider />
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="subtitle2">Detailed Settings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <AgentDetails agent={agent} />
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    ))
                ) : (
                    <Typography variant="body1" textAlign={'center'} width={'100%'} margin={2}>
                        <b>No agents found</b>
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
            <Dialog open={openAgentFormDialog} maxWidth={'lg'}>
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
                <AgentForm
                    editAgent={editAgent}
                    setAgents={setAgents}
                    agents={agents}
                    closeDialog={closeDialog}
                    isEditMode={isEditMode}
                />
            </Dialog>
        </MainContainerStyled>
    );
};
