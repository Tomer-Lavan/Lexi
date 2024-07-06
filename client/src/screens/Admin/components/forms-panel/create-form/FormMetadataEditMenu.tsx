import { Box, TextField } from '@mui/material';
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface FormMetadataEditMenuProps {
    register: UseFormRegister<any>;
    getValues: UseFormGetValues<any>;
    setValue: UseFormSetValue<any>;
}

export const FormMetadataEditMenu: React.FC<FormMetadataEditMenuProps> = ({ register, setValue, getValues }) => (
    <Box>
        <TextField
            label={'name'}
            type={'text'}
            {...register(`name`)}
            onChange={(e) => {
                setValue(`name`, e.target.value, {
                    shouldValidate: true,
                });
            }}
            defaultValue={getValues('name') || ''}
            size="small"
            sx={{ mb: 1 }}
        />
        <TextField
            label={'title'}
            type={'text'}
            {...register(`title`)}
            required
            onChange={(e) => {
                setValue(`title`, e.target.value, {
                    shouldValidate: true,
                });
            }}
            defaultValue={getValues('title') || ''}
            value={getValues('title') || ''}
            size="small"
            sx={{ mb: 1 }}
        />
        <TextField
            maxRows={3}
            rows={3}
            multiline
            fullWidth
            label={'instructions'}
            type={'text'}
            {...register(`instructions`)}
            onChange={(e) => {
                setValue(`instructions`, e.target.value, {
                    shouldValidate: true,
                });
            }}
            defaultValue={getValues('instructions') || ''}
            value={getValues('instructions') || ''}
            size="small"
            sx={{ mb: 2 }}
        />
    </Box>
);
