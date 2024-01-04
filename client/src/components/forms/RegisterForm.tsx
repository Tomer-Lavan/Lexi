import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { registerUser } from '@DAL/server-requests/users';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FinalRegisterForm } from './FinalRegestrationForm';
import { FirstRegisterForm } from './FirstRegestrationForm';
import TermsOfConditions from './TermsOfConditions';

export const RegisterForm = ({ experimentId }) => {
    const [page, setPage] = useState(1);
    const {
        register,
        handleSubmit,
        setError,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const { openSnackbar } = useSnackbar();
    const [isAgreedTerms, setIsAgreedTerms] = useState(false);

    const onSubmit = async (data) => {
        try {
            const user = await registerUser(data, experimentId);
            dispatch(setActiveUser(user));
        } catch (error) {
            openSnackbar('Registration Failed', SnackbarStatus.ERROR);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                {page === 1 ? (
                    <FirstRegisterForm
                        setPage={setPage}
                        getValues={getValues}
                        setError={setError}
                        handleSubmit={handleSubmit}
                        setValue={setValue}
                        experimentId={experimentId}
                        register={register}
                        errors={errors}
                    />
                ) : page === 2 ? (
                    <TermsOfConditions setPage={setPage} isAgreed={isAgreedTerms} setIsAgreed={setIsAgreedTerms} />
                ) : (
                    <FinalRegisterForm
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        handleSubmit={handleSubmit(onSubmit)}
                        control={control}
                        setPage={setPage}
                    />
                )}
            </Box>
        </Container>
    );
};
