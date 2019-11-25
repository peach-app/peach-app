import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import { Grid, GridItem } from '../../components/Grid';
import TextInput from '../../components/TextInput';
import Actions from '../../components/Actions';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Tabs from '../../components/Tabs';
import DatePicker from '../../components/DatePicker';
import { CAMPAIGN_TYPE, MODAL_TYPES } from '../../consts';
import CREATE_CAMPAIGN_MUTATION from './graphql/create-campaign';
import { validationSchema, FORM_INITIAL_VALUES } from './consts';
import ModalContext from '../../contexts/Modal';

const CreateCampaign = ({ navigation }) => {
  const [activeTab, setTab] = useState(0);

  const { openModal } = useContext(ModalContext);

  const [createCampaign, { loading }] = useMutation(CREATE_CAMPAIGN_MUTATION, {
    // TO DO, HOW ARE WE GOING TO HANDLE ERRORS?
    onError: err => console.log('errro', err),
    onCompleted: () =>
      openModal({
        type: MODAL_TYPES.CAMPAIGN_CREATION,
        props: {
          onButtonClick: () => {
            navigation.navigate('Campaigns', {
              shouldRefetchQuery: true,
            });
          },
        },
      }),
  });

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={({ name, description, budget, dueDate }) => {
        createCampaign({
          variables: {
            name,
            description,
            dueDate,
            private: activeTab === 1,
            budget,
          },
        });
      }}
    >
      {({ handleSubmit }) => (
        <SafeAreaView>
          <StatusBar />
          <Header title="Create Campaign" />
          <Container>
            <Grid>
              <GridItem size={12}>
                <Tabs
                  activeTabIndex={activeTab}
                  onTabPress={setTab}
                  tabs={Object.values(CAMPAIGN_TYPE)}
                />
              </GridItem>
              <GridItem size={12}>
                <TextInput label="Campaign name" name="name" />
              </GridItem>
              <GridItem size={12}>
                <TextInput label="Description" name="description" />
              </GridItem>

              <GridItem size={12}>
                <TextInput label="Budget" name="budget" />
              </GridItem>
              <GridItem size={12}>
                <DatePicker name="dueDate" label="Due date" withIcon />
              </GridItem>
              <GridItem size={12}>
                <Actions>
                  <Button
                    isLoading={loading}
                    onPress={handleSubmit}
                    title="Create"
                    fixedWidth
                  />
                </Actions>
              </GridItem>
            </Grid>
          </Container>
        </SafeAreaView>
      )}
    </Formik>
  );
};
CreateCampaign.propTypes = {
  // eslint-disable-next-line
  navigation: PropTypes.object,
};
export default CreateCampaign;
