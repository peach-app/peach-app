import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

import { CAMPAIGN_TYPE, MODAL_TYPES } from '../../consts';
import { validationSchema, FORM_INITIAL_VALUES } from './consts';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import { Grid, GridItem } from '../../components/Grid';
import TextInput from '../../components/TextInput';
import Actions from '../../components/Actions';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Intro from '../../components/Intro';
import Tabs from '../../components/Tabs';
import DatePicker from '../../components/DatePicker';
import { useModal } from '../../contexts/Modal';

import CREATE_CAMPAIGN_MUTATION from './graphql/create-campaign';

const CreateCampaign = ({ navigation }) => {
  const [activeTab, setTab] = useState(0);

  const { openModal } = useModal();

  const [createCampaign, { loading }] = useMutation(CREATE_CAMPAIGN_MUTATION, {
    // TO DO, HOW ARE WE GOING TO HANDLE ERRORS?
    // ERROR BOUNDARY?
    onError: err => console.log('errro', err),
    onCompleted: () =>
      openModal({
        type: MODAL_TYPES.CAMPAIGN_CREATION,
        props: {
          onButtonClick: () =>
            navigation.navigate('Campaigns', {
              shouldRefetchQuery: true,
            }),
        },
      }),
  });

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: FORM_INITIAL_VALUES,
    validationSchema,
    onSubmit: ({ name, description, budget, dueDate }) => {
      createCampaign({
        variables: {
          name,
          description,
          dueDate,
          private: activeTab === 1,
          budget,
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Create a Campaign" />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <Container>
            <Grid>
              <GridItem size={12}>
                <Intro>
                  <Tabs
                    activeTabIndex={activeTab}
                    onTabPress={setTab}
                    tabs={Object.values(CAMPAIGN_TYPE)}
                  />
                </Intro>
              </GridItem>
              <GridItem size={12}>
                <TextInput
                  label="Campaign name"
                  name="name"
                  placeholder="e.g Soft Tea campaign"
                  error={formik.errors.name}
                  onChangeText={formik.handleChange('name')}
                />
              </GridItem>
              <GridItem size={12}>
                <TextInput
                  label="Description"
                  name="description"
                  placeholder="Picture at home drinking tea"
                  error={formik.errors.description}
                  onChangeText={formik.handleChange('description')}
                />
              </GridItem>

              <GridItem size={12}>
                <TextInput
                  label="Budget"
                  name="budget"
                  placeholder="£150"
                  error={formik.errors.budget}
                  onChangeText={formik.handleChange('budget')}
                />
              </GridItem>
              <GridItem size={12}>
                <DatePicker
                  name="dueDate"
                  label="Due date"
                  withIcon
                  placeholder="The action date"
                  error={formik.errors.dueDate}
                  onChange={formik.handleChange('dueDate')}
                  date={formik.values.dueDate}
                />
              </GridItem>
              <GridItem size={12}>
                <Actions>
                  <Button
                    isLoading={loading}
                    onPress={formik.handleSubmit}
                    title="Create"
                    fixedWidth
                  />
                </Actions>
              </GridItem>
            </Grid>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

CreateCampaign.propTypes = {
  // eslint-disable-next-line
  navigation: PropTypes.object,
};

export default CreateCampaign;
