import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  Header,
  Container,
  Grid,
  TextInput,
  Actions,
  Button,
  GraphQLErrors,
  ProfileHeader,
} from 'components';

import GET_USER from './graphql/get-user';
import SAVE_USER from './graphql/save-user';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(25)
    .required('Your name is required'),
});

export const EditProfile = () => {
  const navigation = useNavigation();
  const [save, { loading, error }] = useMutation(SAVE_USER, {
    onCompleted: () => {
      navigation.goBack();
    },
  });

  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
  });

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
      <Header title="Edit Profile" />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <Container>
            <ProfileHeader {...get('user', data)} isEditable />
            <Grid>
              <Grid.Item size={12}>
                <TextInput
                  label="Display name"
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
                  <GraphQLErrors error={error} />
                </Grid.Item>
              )}

              <Grid.Item size={12}>
                <Actions>
                  <Button
                    isLoading={loading}
                    onPress={formik.handleSubmit}
                    title="Save"
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
