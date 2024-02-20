import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { registerUser } from '@DAL/server-requests/users';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { NewUserInfoType } from '@models/AppModels';
import { Box, CircularProgress, Container } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getExperimentRegistrationForm } from '../../DAL/server-requests/experiments';
import useEffectAsync from '../../hooks/useEffectAsync';
import { FirstRegisterForm } from './FirstRegistrationForm';
import { FinalRegisterForm } from './final-register-form/FinalRegistrationForm';
import TermsOfConditions from './terms-of-conditions/TermsOfConditions';

interface RegisterFormProps {
    experimentId: string;
    setShowFormTypeButtons: (show: boolean) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ experimentId, setShowFormTypeButtons }) => {
    const [page, setPage] = useState(1);
    const [form, setForm] = useState(null);
    const dispatch = useDispatch();
    const { openSnackbar } = useSnackbar();
    const [isAgreedTerms, setIsAgreedTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    useEffectAsync(async () => {
        const res = await getExperimentRegistrationForm(experimentId);
        setForm(res);
        setIsLoading(false);
    }, []);

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
            if (error?.response?.status === 403) {
                openSnackbar('Experiment Is Not Active', SnackbarStatus.ERROR);
                return;
            }
            openSnackbar('Registration Failed', SnackbarStatus.ERROR);
        }
    };

    const handleFirstRegistrationSubmit = async (data: NewUserInfoType) => {
        if (form?.termsOfConditions) {
            goToPage(2);
        } else if (form) {
            goToPage(3);
        } else {
            await onSubmit(data);
        }
    };

    const handleTermsOfConditionSubmit = () => {
        if (form) {
            goToPage(3);
        } else {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <Container component="main" maxWidth={page !== 1 ? 'sm' : 'xs'}>
            <Box display={'flex'} justifyContent={'center'} marginTop={page === 2 ? 0 : 3}>
                {isLoading ? (
                    <CircularProgress size={80} />
                ) : page === 1 ? (
                    <FirstRegisterForm
                        setPage={goToPage}
                        getValues={getValues}
                        setError={setError}
                        handleSubmit={handleSubmit}
                        setValue={setValue}
                        experimentId={experimentId}
                        register={register}
                        errors={errors}
                        onSubmit={handleFirstRegistrationSubmit}
                        buttonLabel={!form && !form?.termsOfConditions ? 'Sign Up' : 'Continue'}
                    />
                ) : page === 2 ? (
                    <TermsOfConditions
                        setPage={goToPage}
                        isAgreed={isAgreedTerms}
                        setIsAgreed={setIsAgreedTerms}
                        onSubmit={handleTermsOfConditionSubmit}
                    />
                ) : (
                    <FinalRegisterForm
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        getValues={getValues}
                        handleSubmit={handleSubmit(onSubmit)}
                        setPage={goToPage}
                        handleGoBack={() => (form?.termsOfConditions ? goToPage(2) : goToPage(1))}
                        control={control}
                        form={form}
                    />
                )}
            </Box>
        </Container>
    );
};
