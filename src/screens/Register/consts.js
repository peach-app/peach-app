import { USER_TYPE, FORM_ERROR_MESSAGES } from '../../consts';
import * as yup from 'yup';

export const USER_TYPE_TABS = Object.values(USER_TYPE);

export const FORM_INPUTS = [
    {
      label: "Email",
      name: "email", 
    }, 
    {
      label: "Password",
      name: "password", 
      secureTextEntry: true
    }
    ];
    

export const validationSchema = yup.object().shape({
        email: yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_EMAIL).email(FORM_ERROR_MESSAGES.INVALID_EMAIL),
        password: yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_PASSWORD),
      });
      
      