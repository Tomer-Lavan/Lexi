import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
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
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const RadioSelection: React.FC<RadioSelectionProps> = ({
    label,
    fieldKey,
    selectionOptions,
    register,
    errors,
}) => (
    <FormControl component="fieldset" error={!!errors[fieldKey]}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup aria-label={label} name={fieldKey} {...register(fieldKey)} style={{ paddingLeft: '24px' }}>
            {selectionOptions.map((option, index) => (
                <FormControlLabel
                    key={index}
                    value={option.value}
                    {...register(fieldKey)}
                    control={<Radio />}
                    label={option.label}
                />
            ))}
        </RadioGroup>
        {errors[fieldKey] && <FormHelperText>{getFormErrorMessage(errors[fieldKey])}</FormHelperText>}
    </FormControl>
);

export default RadioSelection;
