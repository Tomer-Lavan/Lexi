import { FormControl, MenuItem, Select, Typography } from '@mui/material';

const StyledSelection = ({ label, options, value, onChange, name, placeholder }) => (
    <FormControl
        margin="dense"
        size="small"
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
    >
        <Typography>{label}:</Typography>
        <Select
            labelId={`${name}-select-label`}
            id={`${name}-select`}
            value={value || null}
            onChange={onChange}
            displayEmpty
            name={name}
            style={{ minWidth: '100px' }}
        >
            {placeholder && (
                <MenuItem value={null}>
                    <em>{placeholder}</em>
                </MenuItem>
            )}
            {options.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default StyledSelection;
