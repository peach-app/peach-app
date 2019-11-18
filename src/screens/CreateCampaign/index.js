import React, { useState } from 'react';
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
import { CAMPAIGN_TYPE } from '../../consts';
import CREATE_CAMPAIGN_MUTATION from './graphql/create-campaign';
import { validationSchema } from './consts';


const CreateCampaign = props => {
  const [activeTab, setTab] = useState(0);

  const [createCampaign, { loading, error }] = useMutation(
    CREATE_CAMPAIGN_MUTATION,
    {
      onCompleted: data => console.log('DATA', data),
    }
  );

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        name: '',
        description: '',
        budget: '',
        dueDate: '',
      }}
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

export default CreateCampaign;
