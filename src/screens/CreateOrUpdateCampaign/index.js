import React from 'react';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import * as Yup from 'yup';

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
  GraphQLErrors,
} from 'components';
import { CAMPAIGN_TYPE, MODAL_TYPES, BUDGET_TYPE } from 'consts';
import { useModal } from 'contexts/Modal';
import { Main, PushToTop, Graphic } from './styles';

import GET_CAMPAIGN from './graphql/get-campaign';
import CREATE_OR_UPDATE_CAMPAIGN_MUTATION from './graphql/create-or-update-campaign';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(45)
    .required('Your campaign needs a name.'),
  description: Yup.string().required('Please describe your campaign'),
  dueDate: Yup.string().required(
    'What is the completion date for the campaign?'
  ),
  isPrivate: Yup.bool().nullable(),
  isUnpaid: Yup.bool().nullable(),
});

export const CreateOrUpdateCampaign = () => {
  const navigation = useNavigation();

  const { openModal } = useModal();

  const { params } = useRoute();

  const campaignId = get('campaignId', params);
  const { data } = useQuery(GET_CAMPAIGN, {
    skip: !campaignId,
    variables: {
      id: campaignId,
    },
  });

  const [createOrUpdateCampaign, { loading: saving, error }] = useMutation(
    CREATE_OR_UPDATE_CAMPAIGN_MUTATION,
    {
      refetchQueries: ['getCampaigns', 'getCampaign'],
      awaitRefetchQueries: true,
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

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues: {
      name: getOr('', 'findCampaignById.name', data),
      description: getOr('', 'findCampaignById.description', data),
      budget: getOr('0', 'findCampaignById.budget', data),
      dueDate: getOr('', 'findCampaignById.dueDate', data),
      isPrivate: getOr(false, 'findCampaignById.private', data),
      isUnpaid: getOr(false, 'findCampaignById.unpaid', data),
    },
    validationSchema,
    onSubmit: (
      { name, description, budget, dueDate, isPrivate, isUnpaid },
      { setFieldError }
    ) => {
      if (!isUnpaid && parseInt(budget, 10) < 500) {
        setFieldError('budget', 'Budget must be over £5.00 for paid campaigns');
        return;
      }

      createOrUpdateCampaign({
        variables: {
          campaign: {
            name,
            description,
            budget: isUnpaid ? 0 : parseInt(budget, 10),
            ...(Boolean(campaignId) && { _id: campaignId }),
            ...(!campaignId && {
              dueDate,
              private: isPrivate,
              unpaid: isUnpaid,
            }),
          },
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
                      activeTabIndex={formik.values.isPrivate ? 1 : 0}
                      onTabPress={tabIndex =>
                        formik.setFieldValue('isPrivate', tabIndex === 1)
                      }
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
                    <Tabs
                      activeTabIndex={formik.values.isUnpaid ? 1 : 0}
                      onTabPress={tabIndex =>
                        formik.setFieldValue('isUnpaid', tabIndex === 1)
                      }
                      tabs={Object.values(BUDGET_TYPE)}
                    />
                  </Grid.Item>
                )}
                {!formik.values.isUnpaid && (
                  <Grid.Item size={6}>
                    <MoneyInput
                      label="Budget (GBP)"
                      name="budget"
                      error={formik.errors.budget}
                      onChange={formik.handleChange('budget')}
                      value={formik.values.budget}
                    />
                  </Grid.Item>
                )}
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

                {error && (
                  <Grid.Item size={12}>
                    <GraphQLErrors error={error} />
                  </Grid.Item>
                )}
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
