import { QuestionType, QuestionTypeProps } from '../../components/forms/questions/Question';
import { ApiPaths } from '../constants';
import axiosInstance from './AxiosInstance';

interface FormType {
    name: string;
    title: string;
    instructions: string;
    questions: Array<{ type: QuestionType; props: QuestionTypeProps }>;
}

export const saveForm = async (form: FormType): Promise<void> => {
    try {
        await axiosInstance.post(`/${ApiPaths.FORMS_PATH}`, { form });
    } catch (error) {
        throw error;
    }
};

export const updateForm = async (form: FormType): Promise<void> => {
    try {
        await axiosInstance.put(`/${ApiPaths.FORMS_PATH}`, { form });
        return;
    } catch (error) {
        throw error;
    }
};

export const getForms = async (): Promise<FormType[]> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.FORMS_PATH}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
