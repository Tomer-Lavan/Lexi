import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { register } from '@DAL/server-requests/users';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import { NewUserInfoType } from '@models/AppModels';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FinalRegisterForm } from './FinalRegestrationForm';
import { FirstRegisterForm } from './FirstRegestrationForm';
import TermsOfConditions from './TermsOfConditions';

export const RegisterForm = ({ experimentId }) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { openSnackbar } = useSnackbar();
    const [isAgreedTerms, setIsAgreedTerms] = useState(false);

    const [errors, setErrors] = useState<any>({
        biologicalSex: '',
        maritalStatus: '',
        religiousAffiliation: '',
        ethnicity: '',
        politicalAffiliation: '',
        childrenNumber: '',
    });

    const [values, setValues] = useState<NewUserInfoType>({
        nickname: '',
        age: '',
        gender: '',
        biologicalSex: '',
        maritalStatus: '',
        religiousAffiliation: '',
        ethnicity: '',
        politicalAffiliation: null,
        childrenNumber: 0,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const currentErrors: any = {
                ...errors,
                biologicalSex: values.biologicalSex ? '' : 'Please fill necessary field',
                maritalStatus: values.maritalStatus ? '' : 'Please fill necessary field',
                religiousAffiliation: values.religiousAffiliation ? '' : 'Please fill necessary field',
                ethnicity: values.ethnicity ? '' : 'Please fill necessary field',
                politicalAffiliation: values.politicalAffiliation ? '' : 'Please fill necessary field',
                childrenNumber: '',
            };

            Object.keys(values).forEach((key) => {
                if (!values[key] && key !== 'age' && key !== 'childrenNumber')
                    currentErrors[key] = 'Please fill necessary field';
            });
            setErrors(currentErrors);

            if (Object.values(currentErrors).every((error) => error === '')) {
                const user = await register(values, experimentId);
                if (user) {
                    dispatch(setActiveUser(user));
                }
            }
        } catch (error) {
            openSnackbar('Registration Failed', SnackbarStatus.ERROR);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleRadioChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [key]: event.target.value });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                {page === 1 ? (
                    <FirstRegisterForm
                        setPage={setPage}
                        values={values}
                        setValues={setValues}
                        handleChange={handleChange}
                        experimentId={experimentId}
                    />
                ) : page === 2 ? (
                    <TermsOfConditions setPage={setPage} isAgreed={isAgreedTerms} setIsAgreed={setIsAgreedTerms} />
                ) : (
                    <FinalRegisterForm
                        values={values}
                        handleChange={handleChange}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        handleRadioChange={handleRadioChange}
                        setPage={setPage}
                    />
                )}
            </Box>
        </Container>
    );
};
