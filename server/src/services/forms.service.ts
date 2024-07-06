import { UpdateWriteOpResult } from 'mongoose';
import { IForm } from 'src/types';
import { FormsModel } from '../models/FormsModel';

interface DeleteResponse {
    acknowledged?: boolean;
    deletedCount?: number;
}
class FormsService {
    saveForm = async (form: IForm): Promise<IForm> => {
        const response = await FormsModel.create(form);
        return response;
    };

    getAllForms = async (): Promise<IForm[]> => {
        const forms: IForm[] = await FormsModel.find({}, { _id: 1, name: 1 });
        return forms;
    };

    getForm = async (formId: string): Promise<IForm> => {
        const form: IForm = await FormsModel.findOne({ _id: formId });
        return form;
    };

    getConversationForms = async (
        preConversationFormId: string,
        postConversationFormId: string,
    ): Promise<{ preConversation: IForm; postConversation: IForm }> => {
        const forms: IForm[] = await FormsModel.find({
            _id: { $in: [preConversationFormId, postConversationFormId] },
        });
        let preConversation, postConversation;
        forms.forEach((form) => {
            if (form._id.toString() === preConversationFormId) preConversation = form;
            if (form._id.toString() === postConversationFormId) postConversation = form;
        });

        return {
            preConversation,
            postConversation,
        };
    };

    updateForms = async (form: IForm): Promise<UpdateWriteOpResult> => {
        const response: UpdateWriteOpResult = await FormsModel.updateOne({ _id: form._id }, { $set: form });
        return response;
    };

    deleteForm = async (formId: string): Promise<DeleteResponse> => {
        const response: DeleteResponse = await FormsModel.deleteOne({ _id: formId });
        return response;
    };
}

export const formsService = new FormsService();
