import React from 'react';
import { SafeAreaView, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Auth from '../../helpers/Auth';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});

const Login = () => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validationSchema={LoginSchema}
    onSubmit={async ({ email, password }) => {
      try {
        const { data } = await Auth.login(email, password);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }}
  >
    {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
      <SafeAreaView>
        {errors.email && <Text>{errors.email}</Text>}
        <TextInput
          placeholder="Email"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />
        {errors.password && <Text>{errors.password}</Text>}
        <TextInput
          placeholder="Password"
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry
        />
        <Button onPress={handleSubmit} title="Login" />
      </SafeAreaView>
    )}
  </Formik>
);

export default Login;
