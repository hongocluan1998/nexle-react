import { PASSWORD_REGEX } from 'utils/regex';
import * as yup from 'yup';

export const schemaSignUp = yup.object().shape({
  firstName: yup.string().required('Firstname is required'),
  lastName: yup.string().required('Lastname is required'),
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .matches(PASSWORD_REGEX, 'Password is fair'),
});

export const schemaSignIn = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .matches(PASSWORD_REGEX, 'Password is fair'),
});

export const signUpData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const signInData = {
  email: '',
  password: '',
};
