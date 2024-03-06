import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

const StyledSelection = ({ control, name, label, options, placeholder }) => (
    <FormControl
        margin="dense"
        size="small"
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
    >
        <Typography>{label}:</Typography>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    labelId={`${name}-select-label`}
                    displayEmpty
                    style={{ minWidth: '100px' }}
                    value={field.value || null}
                >
                    {placeholder && (
                        <MenuItem key="" value={null}>
                            <em>{placeholder}</em>
                        </MenuItem>
                    )}
                    {options.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            )}
        />
    </FormControl>
);

export default StyledSelection;
