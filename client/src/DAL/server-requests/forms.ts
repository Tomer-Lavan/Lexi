import { QuestionType, QuestionTypeProps } from '../../components/questions/Question';
import { ApiPaths } from '../constants';
import axiosInstance from './AxiosInstance';

interface FormType {
    name: string;
    title: string;
    instructions: string;
    questions: Array<{ type: QuestionType; props: QuestionTypeProps }>;
}

interface Form {
    _id: string;
    name: string;
}

export const saveForm = async (form: FormType): Promise<Form> => {
    try {
        const response = await axiosInstance.post(`/${ApiPaths.FORMS_PATH}`, { form });
        return response.data;
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

export const getForms = async (): Promise<Form[]> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.FORMS_PATH}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getForm = async (formId: string): Promise<FormType> => {
    try {
        const response = await axiosInstance.get(`/${ApiPaths.FORMS_PATH}/${formId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteForm = async (formId: string): Promise<FormType> => {
    try {
        const response = await axiosInstance.delete(`/${ApiPaths.FORMS_PATH}/${formId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
