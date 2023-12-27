import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import {
    downloadExperimentJSON,
    downloadExperimentXLSX,
} from '../../../../../DAL/server-requests/dataAggregationDAL';
import AsynchButton from '../../../../../components/common/AsynchButton';
import { useSnackbar } from '../../../../../contexts/SnackbarProvider';
import { ExperimentRow } from '../experiment-row/ExperimentRow';
import { ButtonsBox, ColumnTitle, ListBox, TablePaper } from './ExperimentsList.s';

const ExperimentsList = ({
    experiments,
    handleSaveChanges,
    handleStatusChange,
    setIsEditMode,
    modifiedExperiments,
    handleCancelChanges,
    setEditExperiment,
    setOpenExperimentFormDialog,
    isLoadingStatusChange,
    isLoadingExperiments,
}) => {
    const { openSnackbar } = useSnackbar();
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const handleMenuAction = async (action: string, row) => {
        if (action === 'edit') {
            setEditExperiment(row);
            setIsEditMode(true);
            setOpenExperimentFormDialog(true);
        } else if (action === 'downloadJSON') {
            try {
                openSnackbar('Downloading JSON...', 'info');
                await downloadExperimentJSON(row._id, row.title);
                openSnackbar('Download JSON Success !', 'success');
            } catch (err) {
                openSnackbar('Failed to Download JSON', 'error');
            }
        } else if (action === 'downloadExcel') {
            try {
                openSnackbar('Downloading Excel...', 'info');
                await downloadExperimentXLSX(row._id, row.title);
                openSnackbar('Download Excel Success !', 'success');
            } catch (err) {
                openSnackbar('Failed to Download Excel', 'error');
            }
        } else if (action === 'share') {
            setShareLink(`${process.env.REACT_APP_FRONTEND_URL}/e/${row._id}`);
            setOpenShareDialog(true);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        openSnackbar('Link copied to clipboard', 'success');
    };

    return (
        <ListBox>
            <ButtonsBox>
                <Box>
                    <AsynchButton
                        sx={{ mr: 1 }}
                        style={{ marginBottom: 0 }}
                        variant="contained"
                        isLoading={isLoadingStatusChange}
                        color="primary"
                        onClick={handleSaveChanges}
                        disabled={Object.values(modifiedExperiments).length === 0}
                        size="small"
                    >
                        Save Changes
                    </AsynchButton>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancelChanges}
                        disabled={Object.values(modifiedExperiments).length === 0}
                        size="small"
                    >
                        Cancel
                    </Button>
                </Box>
            </ButtonsBox>
            <TablePaper>
                <TableContainer>
                    <Table aria-label="collapsible experiments table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <ColumnTitle>Title</ColumnTitle>
                                <ColumnTitle>Description</ColumnTitle>
                                <ColumnTitle>Launch Time</ColumnTitle>
                                <ColumnTitle>Status</ColumnTitle>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoadingExperiments ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : experiments.length ? (
                                experiments.map((experiment) => (
                                    <ExperimentRow
                                        key={experiment._id}
                                        row={experiment}
                                        handleMenuAction={handleMenuAction}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="body1">
                                            <b>No experiments found</b>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TablePaper>
            <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)}>
                <DialogContent>
                    <Typography variant="body1" color="textPrimary" gutterBottom>
                        For sharing your experiment with participants, send them the following link:
                    </Typography>
                    <TextField
                        fullWidth
                        value={shareLink}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleCopyLink}
                                        color="primary"
                                        aria-label="Copy link to clipboard"
                                    >
                                        <FileCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenShareDialog(false)} color="primary">
                        Close
                    </Button>
                    {/* Optional: Add additional actions here */}
                </DialogActions>
            </Dialog>
        </ListBox>
    );
};

export default ExperimentsList;
