import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import get from 'lodash/fp/get';

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
  MoneyInput,
  DatePicker,
} from 'components';
import { CAMPAIGN_TYPE, MODAL_TYPES } from 'consts';

import { useModal } from 'contexts/Modal';
import { validationSchema, FORM_INITIAL_VALUES } from './consts';
import GET_CAMPAIGN from './graphql/get-campaign';
import CREATE_OR_UPDATE_CAMPAIGN_MUTATION from './graphql/create-or-update-campaign';

export const CreateOrUpdateCampaign = () => {
  const navigation = useNavigation();

  const { openModal, closeModal } = useModal();

  const [activeTab, setTab] = useState(0);
  const { params } = useRoute();

  const campaignId = get('campaignId', params);
  const { data } = useQuery(GET_CAMPAIGN, {
    skip: !campaignId,
    variables: {
      id: campaignId,
    },
  });

  const campaign = get('findCampaignById', data);

  const [createOrUpdateCampaign, { loading: saving }] = useMutation(
    CREATE_OR_UPDATE_CAMPAIGN_MUTATION,
    {
      refetchQueries: ['getCampaigns', 'getCampaign'],
      onCompleted: ({ createOrUpdateCampaign: { _id } }) =>
        openModal({
          type: MODAL_TYPES.CAMPAIGN_CREATION,
          props: {
            hasBeenEdited: Boolean(campaignId),
            onFinish: () => navigation.goBack(),
            onRequestInfluencers: () =>
              navigation.navigate('RequestInfluencers', { campaignId: _id }),
          },
        }),
    }
  );

  const submitCampaign = (
    { name, description, budget, dueDate, paymentId },
    { cardId, token } = {}
  ) => {
    createOrUpdateCampaign({
      variables: {
        campaign: {
          ...(Boolean(campaignId) && { _id: campaignId }),
          name,
          description,
          budget: console.log('BUDGET', budget) || budget.toString(),
          ...(!campaignId && { dueDate }),
          private: activeTab === 1,
          paymentId,
        },
        cardId,
        token,
      },
    });
  };

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: campaign || FORM_INITIAL_VALUES,
    validationSchema,
    onSubmit: campaignDetails => {
      if (campaignId) {
        submitCampaign(campaignDetails);
        return;
      }

      openModal({
        type: MODAL_TYPES.CONFIRM_PAYMENT,
        props: {
          onClose: closeModal,
          onConfirm: paymentMethod =>
            submitCampaign(campaignDetails, paymentMethod),
          cost: campaignDetails.budget,
          description: campaignDetails.description,
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title={campaignId ? 'Edit Campaign' : 'Create Campaign'} />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <Container>
            <Intro />
            <Grid>
              {!campaignId && (
                <Grid.Item size={12}>
                  <Tabs
                    activeTabIndex={activeTab}
                    onTabPress={setTab}
                    tabs={Object.values(CAMPAIGN_TYPE)}
                  />
                </Grid.Item>
              )}
              <Grid.Item size={12}>
                <TextInput
                  label="Campaign name"
                  name="name"
                  placeholder="e.g Soft Tea promoters"
                  error={formik.errors.name}
                  onChangeText={formik.handleChange('name')}
                  value={formik.values.name}
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
                  value={formik.values.description}
                />
              </Grid.Item>

              {!campaignId && (
                <Grid.Item size={12}>
                  <DatePicker
                    label="Due date"
                    error={formik.errors.dueDate}
                    onChange={selectedDate => {
                      formik.setFieldValue('dueDate', selectedDate);
                    }}
                    value={formik.values.dueDate}
                  />
                </Grid.Item>
              )}

              <Grid.Item size={12}>
                <MoneyInput
                  label="Budget (GBP)"
                  name="budget"
                  error={formik.errors.budget}
                  onChange={formik.handleChange('budget')}
                  value={formik.values.budget}
                />
              </Grid.Item>
            </Grid>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <Actions>
        <Button
          isLoading={saving}
          onPress={formik.handleSubmit}
          title={campaignId ? 'Save' : 'Create'}
          fixedWidth
        />
      </Actions>
    </SafeAreaView>
  );
};
