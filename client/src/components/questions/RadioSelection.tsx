import { Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Typography } from '@mui/material';
import { getFormErrorMessage } from '@utils/commonFunctions';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface SelectionOption {
    label: string;
    value: string;
}

interface RadioSelectionProps {
    label: string;
    fieldKey: string;
    selectionOptions: SelectionOption[];
    required: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const RadioSelection: React.FC<RadioSelectionProps> = ({
    label,
    fieldKey,
    selectionOptions,
    required,
    register,
    errors,
}) => (
    <Box style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <FormControl component="fieldset" error={!!errors[fieldKey]}>
            <Typography style={{ color: 'grey', marginBottom: '8px', borderBottom: '1px solid grey' }}>
                {label} {required ? '*' : ''}
            </Typography>
            <RadioGroup
                aria-label={label}
                name={fieldKey}
                {...register(fieldKey, required ? { required: 'This field is required' } : {})}
                style={{ paddingLeft: '24px' }}
            >
                {selectionOptions.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option.value}
                        {...register(fieldKey, required ? { required: 'This field is required' } : {})}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
            {errors[fieldKey] && <FormHelperText>{getFormErrorMessage(errors[fieldKey])}</FormHelperText>}
        </FormControl>
    </Box>
);

export default RadioSelection;
