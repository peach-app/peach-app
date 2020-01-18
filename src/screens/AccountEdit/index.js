import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';

import {
  SafeAreaView,
  Header,
  Container,
  Grid,
  TextInput,
  Intro,
  Actions,
  Button,
  Text,
} from '../../components';

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

  const { data } = useQuery(GET_USER);

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      name: startCase(get('user.name', data)),
      bio: get('user.bio', data),
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

  return (
    <SafeAreaView>
      <Header title="Account" />
      <ScrollView>
        <Container>
          <Intro>
            <Grid>
              <Grid.Item size={12}>
                <TextInput
                  label="Name"
                  autoCapitalize="none"
                  value={formik.values.name}
                  error={formik.errors.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Bio"
                  multiline
                  autoCapitalize="none"
                  value={formik.values.bio}
                  error={formik.errors.bio}
                  onChangeText={formik.handleChange('bio')}
                  onBlur={formik.handleBlur('bio')}
                />
              </Grid.Item>

              {error && (
                <Grid.Item size={12}>
                  <Text isCenter>
                    Unable to save changes, please try again later.
                  </Text>
                </Grid.Item>
              )}

              <Grid.Item size={12}>
                <Actions>
                  <Button
                    isLoading={loading}
                    onPress={formik.handleSubmit}
                    title="Save Changes"
                    fixedWidth
                  />
                </Actions>
              </Grid.Item>
            </Grid>
          </Intro>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountEdit;
