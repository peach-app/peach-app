import * as Yup from 'yup';
import { FORM_ERROR_MESSAGES } from '../../consts';

export const validationSchema = Yup.object().shape({
  instagram: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  twitter: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  facebook: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  youTube: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
  tikTok: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_FIELD),
});
