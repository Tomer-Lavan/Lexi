import { TextField } from '@mui/material';
import { getFormErrorMessage } from '@utils/commonFunctions';
import React from 'react';
import { FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

const requiredMessage = 'Please fill necessary field';

interface SelectionTextInputProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    fieldKey: string;
    label: string;
    min: number;
    max: number;
    defaultValue?: number;
    required: boolean;
}

export const NumberInput: React.FC<SelectionTextInputProps> = ({
    register,
    errors,
    getValues,
    setValue,
    fieldKey,
    label,
    min,
    max,
    defaultValue = 0,
    required,
}) => (
    <TextField
        type="number"
        size="small"
        error={Boolean(errors[fieldKey])}
        helperText={getFormErrorMessage(errors[fieldKey])}
        required={required}
        fullWidth
        {...register(fieldKey, {
            ...(required && { required: requiredMessage }),
            min: { value: min, message: `${label} must be above ${min}` },
            max: { value: max, message: `${label} must be below ${max}` },
        })}
        onChange={(e) => {
            setValue(fieldKey, e.target.value, { shouldValidate: true });
        }}
        label={label}
        id={fieldKey}
        defaultValue={getValues(fieldKey) || defaultValue}
        InputProps={{ inputProps: { min, max } }}
    />
);
