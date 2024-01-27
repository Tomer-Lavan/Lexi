import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface ChipsInputProps {
    list: string[];
    setList: (list: string[]) => void;
    label: string;
    id: string;
    placeholder?: string;
    helperText?: string;
}

export const ChipsInput: React.FC<ChipsInputProps> = (props) => {
    const { list, setList } = props;
    const { openSnackbar } = useSnackbar();

    const updateList = (newList: string[]) => {
        setList(newList);
    };

    const validateInput = async (event, inputs, reason) => {
        if (reason === 'createOption') {
            const valuesToAdd = inputs[inputs.length - 1].split(',');
            updateList([...list, ...valuesToAdd]);
        } else if (reason === 'removeOption' || reason === 'clear') {
            updateList(inputs);
        }
    };

    const handleChipClick = (value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            openSnackbar('Copy To Clipboard', SnackbarStatus.SUCCESS);
        });
    };

    return (
        <Stack spacing={3} sx={{ width: '100%' }}>
            <Autocomplete
                multiple
                id="tags-filled"
                filterSelectedOptions={true}
                options={[]}
                value={list}
                freeSolo
                renderTags={(values, getTagProps) =>
                    values.map((value, index) => (
                        <Chip
                            key={index}
                            variant="outlined"
                            label={value}
                            onClick={() => handleChipClick(value)}
                            clickable
                            sx={{
                                color: (theme) => theme.palette.common.white,
                                backgroundColor: (theme) => theme.palette.primary.main,
                                '&.MuiButtonBase-root.MuiChip-root.MuiChip-clickable:hover': {
                                    backgroundColor: 'grey',
                                },
                                '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiChip-deleteIcon.MuiChip-deleteIconMedium.MuiChip-deleteIconColorDefault.MuiChip-deleteIconOutlinedColorDefault':
                                    {
                                        fill: (theme) => theme.palette.grey[200],
                                    },
                            }}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id={props.id}
                        name={props.id}
                        variant="standard"
                        label={props.label}
                        placeholder={props.placeholder}
                        helperText={props.helperText}
                    />
                )}
                onChange={validateInput}
            />
        </Stack>
    );
};
