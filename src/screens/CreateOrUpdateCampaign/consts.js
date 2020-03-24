import * as Yup from 'yup';
import { FORM_ERROR_MESSAGES } from '../../consts';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  description: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  budget: Yup.number(FORM_ERROR_MESSAGES.INVALID_NUMBER)
    .required(FORM_ERROR_MESSAGES.REQUIRED_FIELD)
    .positive(FORM_ERROR_MESSAGES.POSITIVE_AMOUNT),
  dueDate: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
});

export const FORM_INITIAL_VALUES = {
  name: '',
  description: '',
  budget: '',
  dueDate: '',
};
