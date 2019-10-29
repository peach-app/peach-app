import React from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import { getOr } from 'lodash/fp';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Intro from '../../components/Intro';
import Title from '../../components/Title';
import BackButton from '../../components/BackButton';
import { Header } from './styles';
import TextInput from '../../components/TextInput/Input';
import { Grid, GridItem } from '../../components/Grid';
import Button from '../../components/Button';
import Actions from '../../components/Actions';
import { FORM_ERROR_MESSAGES } from '../../consts';

const validationSchema = yup.object().shape({
  email: yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_EMAIL).email(FORM_ERROR_MESSAGES.INVALID_EMAIL),
  password: yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_PASSWORD),
});

const FORM_INPUTS = [
{
  label: "Email",
  name: "email", 
}, 
{
  label: "Password",
  name: "password", 
  secureTextEntry: true
}
]

const onSubmit = data => console.log('data', data);


// const handleSubmit = () => console.log('sadasdsad')

const SignUp = () => {
  const { register, handleSubmit, errors, setValue  } = useForm({
    validationSchema,
  });
  
  
  return (
    <SafeAreaView>
      <StatusBar />
      <Container>
        <Header>
          <Intro>
            <BackButton />
            <Title isCenter>Sign Up</Title>
          </Intro>
        </Header>
        <Grid> 
          {FORM_INPUTS.map((input, index) => (
            <GridItem key={index}>
              <TextInput  {...input} ref={register({name: input.name})} onChangeText={text => setValue(input.name, text)} error={getOr(null, 'message', errors[input.name])} />
            </GridItem>
          ))}
          <GridItem>
            <Actions>
              <Button title="Sign Up" fixedWidth onPress={handleSubmit(onSubmit)} />
            </Actions>
          </GridItem>
        </Grid>
      </Container>
    </SafeAreaView>
  );
};

export default SignUp;
