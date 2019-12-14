import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';

import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import Container from '../../components/Container';
import { Grid, GridItem } from '../../components/Grid';
import TextInput from '../../components/TextInput';
import Intro from '../../components/Intro';
import Actions from '../../components/Actions';
import Button from '../../components/Button';
import Text from '../../components/Text';

import GET_USER from './graphql/get-user';
import SAVE_USER from './graphql/save-user';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Your name is required'),
});

const AccountEdit = ({ navigation }) => {
  const [save, { loading, error }] = useMutation(SAVE_USER, {
    refetchQueries: ['getUser'],
    onCompleted: () => {
      navigation.goBack();
    },
  });

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    initialValues: {
      name: '',
      bio: '',
    },
    onSubmit: ({ name, bio }) => {
      save({
        variables: {
          user: {
            name,
            bio,
          },
        },
      });
    },
  });

  useQuery(GET_USER, {
    onCompleted: data => {
      formik.setValues({
        name: startCase(get('user.name', data)),
        bio: get('user.bio', data),
      });
    },
  });

  return (
    <SafeAreaView>
      <Header title="Account" />
      <ScrollView>
        <Container>
          <Intro>
            <Grid>
              <GridItem size={12}>
                <TextInput
                  label="Name"
                  autoCapitalize="none"
                  value={formik.values.name}
                  error={formik.errors.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                />
              </GridItem>

              <GridItem size={12}>
                <TextInput
                  label="Bio"
                  multiline
                  autoCapitalize="none"
                  value={formik.values.bio}
                  error={formik.errors.bio}
                  onChangeText={formik.handleChange('bio')}
                  onBlur={formik.handleBlur('bio')}
                />
              </GridItem>

              {error && (
                <GridItem size={12}>
                  <Text isCenter>
                    Unable to save changes, please try again later.
                  </Text>
                </GridItem>
              )}

              <GridItem size={12}>
                <Actions>
                  <Button
                    isLoading={loading}
                    onPress={formik.handleSubmit}
                    title="Save Changes"
                    fixedWidth
                  />
                </Actions>
              </GridItem>
            </Grid>
          </Intro>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountEdit;
