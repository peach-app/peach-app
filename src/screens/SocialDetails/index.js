import React from 'react';
import getOr from 'lodash/fp/getOr';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Container,
  Grid,
  Actions,
  Button,
  Intro,
  TextInput,
  Loading,
} from 'components';
import { validationSchema } from './consts';
import {
  CREATE_OR_UPDATE_SOCIAL_ACCOUNTS,
  GET_USER_SOCIAL_ACCOUNTS,
} from './graphql/social-accounts';

export const SocialDetails = () => {
  const { data, loading } = useQuery(GET_USER_SOCIAL_ACCOUNTS);
  const navigation = useNavigation();

  const [createOrUpdateSocialAccounts, { loading: isSubmitting }] = useMutation(
    CREATE_OR_UPDATE_SOCIAL_ACCOUNTS,
    {
      onCompleted: () => navigation.goBack(),
    }
  );

  const formik = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      instagram: getOr('', 'user.socialAccounts.instagram', data),
      twitter: getOr('', 'user.socialAccounts.twitter', data),
      facebook: getOr('', 'user.socialAccounts.facebook', data),
      youTube: getOr('', 'user.socialAccounts.youTube', data),
      tikTok: getOr('', 'user.socialAccounts.tikTok', data),
    },
    validationSchema,
    onSubmit: ({ instagram, twitter, facebook, youTube, tikTok }) => {
      createOrUpdateSocialAccounts({
        variables: {
          socialAccounts: {
            instagram,
            twitter,
            facebook,
            youTube,
            tikTok,
          },
        },
      });
    },
  });
  return (
    <SafeAreaView>
      <StatusBar />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Social Accounts" />

        <ScrollView>
          <Container>
            <Intro />
            {loading ? (
              <Grid.Item>
                <Loading />
              </Grid.Item>
            ) : (
              <Grid>
                <Grid.Item size={12}>
                  <TextInput
                    autoCapitalize="none"
                    value={formik.values.instagram}
                    label="Instagram (URL or Username)"
                    error={formik.errors.instagram}
                    onChangeText={formik.handleChange('instagram')}
                  />
                </Grid.Item>
                <Grid.Item size={12}>
                  <TextInput
                    autoCapitalize="none"
                    value={formik.values.twitter}
                    label="Twitter (URL or Username)"
                    error={formik.errors.twitter}
                    onChangeText={formik.handleChange('twitter')}
                  />
                </Grid.Item>
                <Grid.Item size={12}>
                  <TextInput
                    autoCapitalize="none"
                    value={formik.values.facebook}
                    label="Facebook (Page URL)"
                    error={formik.errors.facebook}
                    onChangeText={formik.handleChange('facebook')}
                  />
                </Grid.Item>
                <Grid.Item size={12}>
                  <TextInput
                    autoCapitalize="none"
                    value={formik.values.youTube}
                    label="YouTube (Channel URL or Name)"
                    error={formik.errors.youTube}
                    onChangeText={formik.handleChange('youTube')}
                  />
                </Grid.Item>
                <Grid.Item size={12}>
                  <TextInput
                    autoCapitalize="none"
                    value={formik.values.tikTok}
                    label="TicTok (Username)"
                    error={formik.errors.tikTok}
                    onChangeText={formik.handleChange('tikTok')}
                  />
                </Grid.Item>
                <Grid.Item size={12}>
                  <Actions>
                    <Button
                      isLoading={isSubmitting}
                      title="Save"
                      fixedWidth
                      onPress={formik.handleSubmit}
                    />
                  </Actions>
                </Grid.Item>
              </Grid>
            )}
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
