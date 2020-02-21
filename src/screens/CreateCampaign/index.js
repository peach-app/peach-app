import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Grid,
  TextInput,
  Actions,
  Button,
  Container,
  Intro,
  Tabs,
  DatePicker,
} from 'components';
import { CAMPAIGN_TYPE } from 'consts';

import { validationSchema, FORM_INITIAL_VALUES } from './consts';

import CREATE_CAMPAIGN_MUTATION from './graphql/create-campaign';

export const CreateCampaign = () => {
  const [activeTab, setTab] = useState(0);

  const [createCampaign, { loading }] = useMutation(CREATE_CAMPAIGN_MUTATION, {
    refetchQueries: ['getCampaigns'],
    // onCompleted: () => {
    //   openModal({
    //     type: MODAL_TYPES.CAMPAIGN_CREATION,
    //     props: {
    //       onButtonClick: () => navigation.goBack(),
    //     },
    //   });
    // },
  });

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: FORM_INITIAL_VALUES,
    validationSchema,
    onSubmit: ({ name, description, budget, dueDate }) => {
      createCampaign({
        variables: {
          campaign: {
            name,
            description,
            dueDate,
            private: activeTab === 1,
            budget,
          },
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
              <Grid.Item size={12}>
                <Intro>
                  <Tabs
                    activeTabIndex={activeTab}
                    onTabPress={setTab}
                    tabs={Object.values(CAMPAIGN_TYPE)}
                  />
                </Intro>
              </Grid.Item>
              <Grid.Item size={12}>
                <TextInput
                  label="Campaign name"
                  name="name"
                  placeholder="e.g Soft Tea promoters"
                  error={formik.errors.name}
                  onChangeText={formik.handleChange('name')}
                />
              </Grid.Item>
              <Grid.Item size={12}>
                <TextInput
                  label="Description"
                  name="description"
                  multiline
                  placeholder="Picture at home drinking tea"
                  error={formik.errors.description}
                  onChangeText={formik.handleChange('description')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Budget"
                  name="budget"
                  placeholder="£150.00"
                  error={formik.errors.budget}
                  onChangeText={formik.handleChange('budget')}
                />
              </Grid.Item>
              <Grid.Item size={12}>
                <DatePicker
                  label="Due date"
                  error={formik.errors.dueDate}
                  onChange={(_, selectedDate) =>
                    formik.setFieldValue('dueDate', selectedDate)
                  }
                  value={formik.values.dueDate}
                />
              </Grid.Item>
              <Grid.Item size={12}>
                <Actions>
                  <Button
                    isLoading={loading}
                    onPress={formik.handleSubmit}
                    title="Create"
                    fixedWidth
                  />
                </Actions>
              </Grid.Item>
            </Grid>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
