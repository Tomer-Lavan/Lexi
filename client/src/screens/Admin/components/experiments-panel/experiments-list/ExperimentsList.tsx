import { downloadExperimentJSON, downloadExperimentXLSX } from '@DAL/server-requests/dataAggregation';
import AsyncButton from '@components/common/AsyncButton';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
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
import { ExperimentType } from '../../../../../models/AppModels';
import { ExperimentRow } from '../experiment-row/ExperimentRow';
import { ColumnTitle, ListBox, TablePaper } from './ExperimentsList.s';

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
    setOpenDeleteExpDialog,
}) => {
    const { openSnackbar } = useSnackbar();
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const handleMenuAction = async (action: string, row: ExperimentType) => {
        if (action === 'edit') {
            setEditExperiment(row);
            setIsEditMode(true);
            setOpenExperimentFormDialog(true);
        } else if (action === 'downloadJSON') {
            try {
                openSnackbar('Downloading JSON...', SnackbarStatus.INFO);
                await downloadExperimentJSON(row._id, row.title);
                openSnackbar('Download JSON Success !', SnackbarStatus.SUCCESS);
            } catch (err) {
                openSnackbar('Failed to Download JSON', SnackbarStatus.ERROR);
            }
        } else if (action === 'downloadExcel') {
            try {
                openSnackbar('Downloading Excel...', SnackbarStatus.INFO);
                await downloadExperimentXLSX(row._id, row.title);
                openSnackbar('Download Excel Success !', SnackbarStatus.SUCCESS);
            } catch (err) {
                openSnackbar('Failed to Download Excel', SnackbarStatus.ERROR);
            }
        } else if (action === 'share') {
            setShareLink(`${process.env.REACT_APP_FRONTEND_URL}/e/${row._id}`);
            setOpenShareDialog(true);
        } else if (action === 'delete') {
            setEditExperiment(row);
            setOpenDeleteExpDialog(true);
        }
    };

    const areExperimentsModified = Object.values(modifiedExperiments).length !== 0;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        openSnackbar('Link copied to clipboard', SnackbarStatus.SUCCESS);
    };

    return (
        <ListBox style={{ marginTop: '1vh' }}>
            <TablePaper>
                <Box display={'flex'} justifyContent={'space-between'} padding={2} sx={{ paddingBottom: 0 }}>
                    {areExperimentsModified ? (
                        <Box>
                            <AsyncButton
                                sx={{ mr: 1 }}
                                style={{ marginBottom: 0 }}
                                variant="contained"
                                isLoading={isLoadingStatusChange}
                                color="primary"
                                onClick={handleSaveChanges}
                                disabled={!areExperimentsModified}
                                size="small"
                            >
                                Save Changes
                            </AsyncButton>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleCancelChanges}
                                disabled={!areExperimentsModified}
                                size="small"
                                style={{ marginBottom: 0 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    ) : (
                        <Box />
                    )}
                </Box>
                <TableContainer>
                    <Table aria-label="collapsible experiments table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '3%' }} />
                                <ColumnTitle style={{ width: '10%' }}>Title</ColumnTitle>
                                <ColumnTitle style={{ width: '22%' }}>Description</ColumnTitle>
                                <ColumnTitle style={{ width: '6%' }}>Participants</ColumnTitle>
                                <ColumnTitle style={{ width: '6%' }}>Sessions</ColumnTitle>
                                <ColumnTitle style={{ width: '6%' }}>Open Sessions</ColumnTitle>
                                <ColumnTitle style={{ width: '10%' }}>Launch Time</ColumnTitle>
                                <ColumnTitle style={{ width: '8%' }}>Status</ColumnTitle>
                                <TableCell style={{ width: '2%' }} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoadingExperiments ? (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
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
                                    <TableCell colSpan={10} align="center">
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
                </DialogActions>
            </Dialog>
        </ListBox>
    );
};

export default ExperimentsList;
