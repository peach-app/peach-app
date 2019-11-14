import React, { useState } from 'react';
import { getOr } from 'lodash/fp';
import useForm from 'react-hook-form';
import Container from '../../../components/Container';
import Intro from '../../../components/Intro';
import Title from '../../../components/Title';
import BackButton from '../../../components/BackButton';
import Tabs from '../../../components/Tabs';
import TextInput from '../../../components/TextInput/Input';
import { Grid, GridItem } from '../../../components/Grid';
import Button from '../../../components/Button';
import Actions from '../../../components/Actions';
import Text from '../../../components/Text';
import { USER_TYPE_TABS, FORM_INPUTS, validationSchema } from '../consts';

const RegisterForm = ({ onFormSubmit, isLoading, error }) => {
  const [activeTab, setTab] = useState(0);

  const { register, handleSubmit, errors, setValue } = useForm({
    validationSchema,
  });

  return (
    <Container>
      <Grid>
        <GridItem size={12}>
          <Intro>
            <Grid>
              <GridItem size={12}>
                <BackButton />
              </GridItem>
              <GridItem size={12}>
                <Title>Sign Up</Title>
              </GridItem>
            </Grid>
          </Intro>
        </GridItem>
        <GridItem size={12}>
          <Tabs
            activeTabIndex={activeTab}
            onTabPress={setTab}
            tabs={USER_TYPE_TABS}
          />
        </GridItem>
        {FORM_INPUTS.map((input, index) => (
          <GridItem key={index} size={12}>
            <TextInput
              {...input}
              ref={register({ name: input.name })}
              onChangeText={text => setValue(input.name, text)}
              error={getOr(null, 'message', errors[input.name])}
            />
          </GridItem>
        ))}
        {error && (
          <GridItem size={12}>
            <Text>Incorrect Email or Password</Text>
          </GridItem>
        )}
        <GridItem size={12}>
          <Actions>
            <Button
              isLoading={isLoading}
              title="Sign Up"
              fixedWidth
              onPress={handleSubmit(data =>
                onFormSubmit({ ...data, type: USER_TYPE_TABS[activeTab] })
              )}
            />
          </Actions>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default RegisterForm;
