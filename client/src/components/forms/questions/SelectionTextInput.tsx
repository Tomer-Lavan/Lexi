import { MenuItem, TextField } from '@mui/material';
import { getFormErrorMessage } from '@utils/commonFunctions';
import React from 'react';
import { FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

const requiredMessage = 'Please fill necessary field';

interface SelectionOption {
    label: string;
    value: string;
}

interface SelectionTextInputProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    selectionOptions: SelectionOption[];
    fieldKey: string;
    label: string;
    required: boolean;
}

export const SelectionTextInput: React.FC<SelectionTextInputProps> = ({
    register,
    errors,
    getValues,
    setValue,
    fieldKey,
    label,
    selectionOptions,
    required,
}) => (
    <TextField
        select
        size="small"
        error={Boolean(errors[fieldKey])}
        helperText={getFormErrorMessage(errors[fieldKey])}
        required={required}
        fullWidth
        {...register(fieldKey, required ? { required: requiredMessage } : {})}
        onChange={(e) => {
            setValue(fieldKey, e.target.value, { shouldValidate: true });
        }}
        defaultValue={getValues(fieldKey) || ''}
        label={label}
        id={fieldKey}
    >
        {selectionOptions?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
    </TextField>
);
