import * as Yup from 'yup';
import { FORM_ERROR_MESSAGES } from '../../consts';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(45)
    .required('Your campaign needs a name.'),
  description: Yup.string().required('Please describe your campaign'),
  budget: Yup.number(FORM_ERROR_MESSAGES.INVALID_NUMBER).min(
    500,
    FORM_ERROR_MESSAGES.MIN_BUDGET
  ),
  dueDate: Yup.string().required(
    'What is the completion date for the campaign?'
  ),
});

export const FORM_INITIAL_VALUES = {
  name: '',
  description: '',
  budget: '',
  dueDate: '',
};
