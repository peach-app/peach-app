import React, { useState } from 'react';
import { getOr } from 'lodash/fp';
import useForm from 'react-hook-form';
import Container from '../../../components/Container';
import Intro from '../../../components/Intro';
import Title from '../../../components/Title';
import BackButton from '../../../components/BackButton';
import Tabs from '../../../components/Tabs';
import { Header } from '../styles';
import TextInput from '../../../components/TextInput/Input';
import { Grid, GridItem } from '../../../components/Grid';
import Button from '../../../components/Button';
import Actions from '../../../components/Actions';
import { USER_TYPE_TABS, FORM_INPUTS, validationSchema } from '../consts';

const SignUpForm = ({onFormSubmit, isLoading}) =>   
{
  const [activeTab, setTab] = useState(0);

    const { register, handleSubmit, errors, setValue  } = useForm({
        validationSchema
      });
    return (
 <Container>
   
<Header>
  <Intro>
    <BackButton />
    <Title isCenter>Sign Up</Title>
  </Intro>
</Header>
<Grid> 
<GridItem size="12">
  <Tabs activeTabIndex={activeTab} onTabPress={setTab} tabs={USER_TYPE_TABS}/>
</GridItem>
  {FORM_INPUTS.map((input, index) => (
    <GridItem key={index} size="12">
      <TextInput  {...input} ref={register({name: input.name})} onChangeText={text => setValue(input.name, text)} error={getOr(null, 'message', errors[input.name])} />
    </GridItem>
  ))}
  <GridItem size="12">
    <Actions>
      <Button isLoading={isLoading} title="Sign Up" fixedWidth onPress={handleSubmit((data) => onFormSubmit({...data, type: USER_TYPE_TABS[activeTab]}))} />
    </Actions>
  </GridItem>
</Grid>
</Container>    
)
};

export default SignUpForm;