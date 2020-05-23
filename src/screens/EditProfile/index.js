import React from 'react';
import PropTypes from 'prop-types';
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
  KeyboardAvoidingView,
  ScrollView,
} from 'components';

import GET_USER from './graphql/get-user';
import SAVE_USER from './graphql/save-user';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(25)
    .required('Your name is required'),
  bio: Yup.string()
    .max(1500)
    .nullable(),
});

export const EditProfile = ({
  rightActionLabel,
  onRightActionPressed,
  onComplete,
}) => {
  const navigation = useNavigation();
  const [save, { loading, error }] = useMutation(SAVE_USER, {
    onCompleted: () => {
      if (onComplete) return onComplete();

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
      <Header
        title="Edit Profile"
        rightActionLabel={rightActionLabel}
        onRightActionPressed={onRightActionPressed}
      />
      <KeyboardAvoidingView>
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
            </Grid>
          </Container>
        </ScrollView>
        <Actions>
          <Button
            isLoading={loading}
            onPress={formik.handleSubmit}
            title="Save"
            fixedWidth
          />
        </Actions>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

EditProfile.defaultProps = {
  rightActionLabel: null,
  onRightActionPressed: null,
  onComplete: null,
};

EditProfile.propTypes = {
  rightActionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onRightActionPressed: PropTypes.func,
  onComplete: PropTypes.func,
};
