import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ChipsInputProps {
    list: any[];
    setList: (list: any[]) => void;
    label: string;
    id: string;
    placeholder?: string;
    helperText?: string;
}

export const ChipsInput: React.FC<ChipsInputProps> = (props) => {
    const { list, setList } = props;

    const listWithIds = list.map((item, index) => ({
        ...item,
        id: index,
    }));

    const listById = {};
    for (const item of listWithIds) {
        listById[item.id] = item;
    }

    const updateList = (item: any[]) => {
        const newList = [...list, ...item];
        setList(newList);
    };

    const validateInput = async (event, inputs, reason) => {
        if ('createOption' === reason) {
            const valuesToAdd = [];
            const values = inputs[inputs.length - 1].split(',');
            for (const value of values) {
                const valueToAdd = {
                    id: uuidv4(),
                    value,
                };
                valuesToAdd.push(valueToAdd);
            }
            updateList(valuesToAdd);
        } else if ('removeOption' === reason) {
            const newList = inputs.map((id) => ({ value: listById[id].value, isValid: listById[id].isValid }));
            setList(newList);
        } else if ('clear' === reason) {
            setList([]);
        }
    };

    const handleChipClick = (id) => {
        // Copy the chip text to the clipboardtext
        const text = listById[id].value;
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copy To Clipboard');
        });
    };

    return (
        <Stack spacing={3} sx={{ width: '100%' }}>
            <Autocomplete
                multiple
                id="tags-filled"
                filterSelectedOptions={true}
                options={[]}
                value={listWithIds.map((item) => item.id)}
                freeSolo
                renderTags={(listIds, getTagProps) =>
                    listIds.map((id, index) => (
                        <Chip
                            key={index}
                            variant="outlined"
                            label={listById[id].value}
                            onClick={() => handleChipClick(id)}
                            clickable
                            sx={{
                                color: (theme) => {
                                    let chipColor = '#fff';
                                    if (typeof listById[id] === 'object') {
                                        chipColor = listById[id].isValid
                                            ? theme.palette.common.white
                                            : theme.palette.common.white;
                                    }
                                    return chipColor;
                                },

                                backgroundColor: (theme) => {
                                    let chipColor = '#fff';
                                    if (typeof listById[id] === 'object') {
                                        chipColor = theme.palette.primary.main;
                                    }
                                    return chipColor;
                                },

                                '&.MuiButtonBase-root.MuiChip-root.MuiChip-clickable:hover': {
                                    backgroundColor: 'grey',
                                },

                                [`& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiChip-deleteIcon.MuiChip-deleteIconMedium.MuiChip-deleteIconColorDefault.MuiChip-deleteIconOutlinedColorDefault`]:
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
