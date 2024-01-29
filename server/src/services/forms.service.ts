import { UpdateWriteOpResult } from 'mongoose';
import { IForm } from 'src/types';
import { FormsModel } from '../models/FormsModel';

class FormsService {
    saveForm = async (form: IForm): Promise<IForm> => {
        const response = await FormsModel.create(form);
        return response;
    };

    getAllForms = async (): Promise<IForm[]> => {
        const forms: IForm[] = await FormsModel.find({});
        return forms;
    };

    updateForms = async (form: IForm): Promise<UpdateWriteOpResult> => {
        const response: UpdateWriteOpResult = await FormsModel.updateOne({ _id: form._id }, { $set: form });
        return response;
    };
}

export const formsService = new FormsService();
