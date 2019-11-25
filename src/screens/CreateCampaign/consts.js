import * as Yup from 'yup';
import { FORM_ERROR_MESSAGES } from '../../consts';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  description: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  budget: Yup.number()
    .required(FORM_ERROR_MESSAGES.REQUIRED_FIELD)
    .positive(),
  dueDate: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
});

export const FORM_INITIAL_VALUES = {
  name: '',
  description: '',
  budget: '',
  dueDate: '',
};
