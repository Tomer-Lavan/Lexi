import { MoreOptionsMenu } from '@components/common/MoreOptionsMenu';
import { ExperimentType } from '@models/AppModels';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Collapse, IconButton, MenuItem, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import theme from '@root/Theme';
import React, { useState } from 'react';
import { ExperimentDetails } from '../experiments-details/ExperimentDetails';
import { ActiveExpSelect, ExpInfo, TableRowStyled } from './ExperimentRow.s';

export const ExperimentRow = (props: { row: ExperimentType; onStatusChange; handleMenuAction }) => {
    const { row, onStatusChange, handleMenuAction } = props;
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const timeAgo = (timestamp: number) => {
        const now = Date.now();
        const elapsed = now - timestamp;
        const seconds = Math.floor(elapsed / 1000);
        if (seconds < 60) {
            return 'now';
        }

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} min ago`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hr ago`;
        }

        const days = Math.floor(hours / 24);
        if (days < 30) {
            return `${days} days ago`;
        }

        const months = Math.floor(days / 30);
        if (months < 12) {
            return `${months} months ago`;
        }

        const years = Math.floor(months / 12);
        return `${years} years ago`;
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value === 'Active';
        onStatusChange(row._id, newStatus);
    };

    return (
        <React.Fragment>
            <TableRowStyled>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell>
                    <Tooltip title={row.description} placement="bottom">
                        <span
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {row.description}
                        </span>
                    </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Box display={'flex'} justifyContent={'left'} paddingLeft={4}>
                        <Typography color={theme.palette.secondary.main}>{row.numberOfParticipants}</Typography>
                    </Box>
                </TableCell>
                <TableCell>{timeAgo(row.timestamp)}</TableCell>
                <TableCell>
                    <ActiveExpSelect
                        isActive={row.isActive}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    '& .MuiMenuItem-root': {
                                        fontSize: '0.875rem',
                                    },
                                },
                            },
                        }}
                        value={row.isActive ? 'Active' : 'Inactive'}
                        onChange={handleStatusChange}
                        size="small"
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </ActiveExpSelect>
                </TableCell>
                <TableCell>
                    <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <MoreOptionsMenu
                        anchorEl={anchorEl}
                        onMenuClose={handleMenuClose}
                        handleMenuAction={(action) => handleMenuAction(action, row)}
                    />
                </TableCell>
            </TableRowStyled>
            <TableRow>
                <ExpInfo colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <ExperimentDetails row={row} />
                    </Collapse>
                </ExpInfo>
            </TableRow>
        </React.Fragment>
    );
};
