import React, { useState } from 'react';
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
  Tabs,
  MoneyInput,
  DatePicker,
  KeyboardAvoidingView,
  ScrollView,
} from 'components';
import {
  CAMPAIGN_TYPE,
  MODAL_TYPES,
  PAYMENT_REASON,
  CAMPAIGN_CREATION_COST,
} from 'consts';
import { useModal } from 'contexts/Modal';
import { Main, PushToTop, Graphic } from './styles';

import { validationSchema, FORM_INITIAL_VALUES } from './consts';
import GET_CAMPAIGN from './graphql/get-campaign';
import CREATE_OR_UPDATE_CAMPAIGN_MUTATION from './graphql/create-or-update-campaign';

export const CreateOrUpdateCampaign = () => {
  const navigation = useNavigation();

  const { openModal } = useModal();

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

  const submitCampaign = ({
    name,
    description,
    budget,
    dueDate,
    paymentId,
  }) => {
    createOrUpdateCampaign({
      variables: {
        campaign: {
          ...(Boolean(campaignId) && { _id: campaignId }),
          name,
          description,
          budget: budget.toString(),
          ...(!campaignId && { dueDate }),
          private: activeTab === 1,
          paymentId,
        },
      },
    });
  };

  const formik = useFormik({
    validateOnChange: false,
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
          reason: PAYMENT_REASON.CREATE_CAMPAIGN,
          onConfirm: paymentId =>
            submitCampaign({ ...campaignDetails, paymentId }),
          cost: CAMPAIGN_CREATION_COST,
          showPromoCode: true,
          description:
            'You will he charged the following for the creation of this campaign. This charge is non-refundable.',
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title={campaignId ? 'Edit Campaign' : 'Create Campaign'} />
      <KeyboardAvoidingView>
        <ScrollView>
          <Container>
            <Main>
              <Graphic />
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
                <Grid.Item size={12}>
                  <Grid noWrap>
                    <Grid.Item size={6}>
                      <MoneyInput
                        label="Budget (GBP)"
                        name="budget"
                        error={formik.errors.budget}
                        onChange={formik.handleChange('budget')}
                        value={formik.values.budget}
                      />
                    </Grid.Item>
                    {!campaignId && (
                      <PushToTop>
                        <Grid.Item size={6}>
                          <DatePicker
                            label="Completion Date"
                            error={formik.errors.dueDate}
                            onChange={selectedDate => {
                              formik.setFieldValue('dueDate', selectedDate);
                            }}
                            value={formik.values.dueDate}
                          />
                        </Grid.Item>
                      </PushToTop>
                    )}
                  </Grid>
                </Grid.Item>
              </Grid>
            </Main>
          </Container>
        </ScrollView>
        <Actions>
          <Button
            isLoading={saving}
            onPress={formik.handleSubmit}
            title={campaignId ? 'Save' : 'Create'}
            fixedWidth
          />
        </Actions>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
