import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { deleteForm } from '../../../../../DAL/server-requests/forms';
import theme from '../../../../../Theme';
import { SnackbarStatus, useSnackbar } from '../../../../../contexts/SnackbarProvider';

// Define the type for a single form
interface Form {
    _id: string;
    name: string;
}

// Define the props for the FormsList component
interface FormsListProps {
    forms: Form[];
    setForms: (forms) => void;
    setSelectedFormId: (formId: string) => void;
    selectedFormId: string;
}

const FormsList: React.FC<FormsListProps> = ({ forms, setForms, setSelectedFormId, selectedFormId }) => {
    const { openSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFormMenuId, setSelectedFormMenuId] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedFormMenuId(id);
    };

    const handleDelete = async (event, id) => {
        handleClose();
        try {
            await deleteForm(id);
            if (selectedFormId === id) setSelectedFormId(forms.length - 1 ? forms[0]._id : null);
            setForms(forms.filter((form) => form._id !== id));
            openSnackbar('Delete Form Succes !', SnackbarStatus.SUCCESS);
        } catch (err) {
            openSnackbar('Delete Form Failed', SnackbarStatus.ERROR);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <List style={{ width: '100%' }}>
            {forms?.map((form) => (
                <ListItem
                    key={form._id}
                    sx={{
                        borderBottom: '1px solid black',
                        backgroundColor:
                            selectedFormId === form._id ? theme.palette.secondary.light : 'transparent',
                    }}
                >
                    <ListItemText
                        style={{ fontSize: '0.875rem', marginRight: 10, marginLeft: 8 }}
                        primary={form.name}
                    />
                    <IconButton onClick={(e) => handleMenu(e, form._id)}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={open}
                        onClose={handleClose}
                        style={{ marginTop: '-1vh' }}
                    >
                        <MenuItem
                            onClick={() => {
                                setSelectedFormId(selectedFormMenuId);
                                handleClose();
                            }}
                        >
                            Edit
                        </MenuItem>
                        <MenuItem onClick={(e) => handleDelete(e, selectedFormMenuId)} style={{ color: 'red' }}>
                            Delete
                        </MenuItem>
                    </Menu>
                </ListItem>
            ))}
        </List>
    );
};

export default FormsList;
