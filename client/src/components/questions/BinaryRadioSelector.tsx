import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

const requiredMessage = 'Please fill necessary field';

interface BinaryRadioSelectorProps {
    register: UseFormRegister<FieldValues>;
    fieldKey: string;
    label: string;
    required: boolean;
}

export const BinaryRadioSelector: React.FC<BinaryRadioSelectorProps> = ({
    register,
    fieldKey,
    label,
    required,
}) => (
    <Box style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography style={{ color: 'grey', marginBottom: '8px', borderBottom: '1px solid grey' }}>
            {label} {required ? '*' : ''}
        </Typography>
        <RadioGroup
            row
            aria-labelledby={label}
            {...register(fieldKey, { required: requiredMessage })}
            defaultValue={true}
            style={{ justifyContent: 'center', gap: '16px', paddingLeft: '26px' }}
        >
            <FormControlLabel
                value={true}
                control={<Radio />}
                label="Yes"
                {...register(fieldKey, { required: requiredMessage })}
            />
            <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register(fieldKey, { required: requiredMessage })}
            />
        </RadioGroup>
    </Box>
);
