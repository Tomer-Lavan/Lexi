import { Request, Response } from 'express';
import { formsService } from '../services/forms.service';
import { requestHandler } from '../utils/requestHandler';

class FormsController {
    getForms = requestHandler(async (req: Request, res: Response) => {
        const forms = await formsService.getAllForms();
        res.status(200).send(forms);
    });

    saveForm = requestHandler(async (req: Request, res: Response) => {
        const { form } = req.body;
        const savedForm = await formsService.saveForm(form);
        res.status(200).send(savedForm);
    });

    updateForm = requestHandler(async (req: Request, res: Response) => {
        const { form } = req.body;
        const response = await formsService.updateForms(form);
        res.status(200).send(response);
    });
}

export const formsController = new FormsController();
