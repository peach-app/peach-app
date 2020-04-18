import * as Yup from 'yup';
import { FORM_ERROR_MESSAGES } from '../../consts';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(45)
    .required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  description: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  budget: Yup.number(FORM_ERROR_MESSAGES.INVALID_NUMBER)
    .required(FORM_ERROR_MESSAGES.REQUIRED_FIELD)
    .min(500, FORM_ERROR_MESSAGES.MIN_BUDGET),
  dueDate: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
});

export const FORM_INITIAL_VALUES = {
  name: '',
  description: '',
  budget: '',
  dueDate: '',
};
