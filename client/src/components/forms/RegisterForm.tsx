import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { registerUser } from '@DAL/server-requests/users';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { NewUserInfoType } from '@models/AppModels';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FirstRegisterForm } from './FirstRegestrationForm';
import { FinalRegisterForm } from './final-register-form/FinalRegestrationForm';
import TermsOfConditions from './terms-of-conditions/TermsOfConditions';

interface RegisterFormProps {
    experimentId: string;
    setShowFormTypeButtons: (show: boolean) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ experimentId, setShowFormTypeButtons }) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { openSnackbar } = useSnackbar();
    const [isAgreedTerms, setIsAgreedTerms] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();

    const goToPage = (page: number) => {
        if (page === 1) {
            setShowFormTypeButtons(true);
        } else {
            setShowFormTypeButtons(false);
        }
        setPage(page);
    };

    const onSubmit = async (data: NewUserInfoType) => {
        try {
            const user = await registerUser(data, experimentId);
            dispatch(setActiveUser(user));
        } catch (error) {
            openSnackbar('Registration Failed', SnackbarStatus.ERROR);
        }
    };

    return (
        <Container component="main" maxWidth={page !== 1 ? 'sm' : 'xs'}>
            <Box display={'flex'} justifyContent={'center'} marginTop={page === 2 ? 0 : 3}>
                {page === 1 ? (
                    <FirstRegisterForm
                        setPage={goToPage}
                        getValues={getValues}
                        setError={setError}
                        handleSubmit={handleSubmit}
                        setValue={setValue}
                        experimentId={experimentId}
                        register={register}
                        errors={errors}
                    />
                ) : page === 2 ? (
                    <TermsOfConditions
                        setPage={goToPage}
                        isAgreed={isAgreedTerms}
                        setIsAgreed={setIsAgreedTerms}
                    />
                ) : (
                    <FinalRegisterForm
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        getValues={getValues}
                        handleSubmit={handleSubmit(onSubmit)}
                        setPage={goToPage}
                    />
                )}
            </Box>
        </Container>
    );
};
