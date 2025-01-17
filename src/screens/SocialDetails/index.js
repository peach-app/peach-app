import React from 'react';
import PropTypes from 'prop-types';
import getOr from 'lodash/fp/getOr';
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
  KeyboardAvoidingView,
  ScrollView,
} from 'components';

import {
  CREATE_OR_UPDATE_SOCIAL_ACCOUNTS,
  GET_USER_SOCIAL_ACCOUNTS,
} from './graphql/social-accounts';

export const SocialDetails = ({
  rightActionLabel,
  onRightActionPressed,
  onComplete,
}) => {
  const { data } = useQuery(GET_USER_SOCIAL_ACCOUNTS, {
    fetchPolicy: 'cache-and-network',
  });
  const navigation = useNavigation();

  const [createOrUpdateSocialAccounts, { loading: isSubmitting }] = useMutation(
    CREATE_OR_UPDATE_SOCIAL_ACCOUNTS,
    {
      onCompleted: () => {
        if (onComplete) return onComplete();
        navigation.goBack();
      },
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
    onSubmit: ({ instagram, twitter, facebook, youTube, tikTok }) => {
      createOrUpdateSocialAccounts({
        variables: {
          socialAccounts: {
            instagram: instagram.replace('@', ''),
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
      <KeyboardAvoidingView>
        <Header
          title="Social Accounts"
          rightActionLabel={rightActionLabel}
          onRightActionPressed={onRightActionPressed}
        />

        <ScrollView>
          <Container>
            <Intro />

            <Grid>
              <Grid.Item size={12}>
                <TextInput
                  autoCapitalize="none"
                  value={formik.values.instagram}
                  label="Instagram (Username)"
                  error={formik.errors.instagram}
                  onChangeText={formik.handleChange('instagram')}
                />
              </Grid.Item>
              <Grid.Item size={12}>
                <TextInput
                  autoCapitalize="none"
                  value={formik.values.twitter}
                  label="Twitter (Username)"
                  error={formik.errors.twitter}
                  onChangeText={formik.handleChange('twitter')}
                />
              </Grid.Item>
              <Grid.Item size={12}>
                <TextInput
                  autoCapitalize="none"
                  value={formik.values.facebook}
                  label="Facebook (Username)"
                  error={formik.errors.facebook}
                  onChangeText={formik.handleChange('facebook')}
                />
              </Grid.Item>
              <Grid.Item size={12}>
                <TextInput
                  autoCapitalize="none"
                  value={formik.values.youTube}
                  label="YouTube (Channel URL)"
                  error={formik.errors.youTube}
                  onChangeText={formik.handleChange('youTube')}
                />
              </Grid.Item>
              <Grid.Item size={12}>
                <TextInput
                  autoCapitalize="none"
                  value={formik.values.tikTok}
                  label="TikTok (Username)"
                  error={formik.errors.tikTok}
                  onChangeText={formik.handleChange('tikTok')}
                />
              </Grid.Item>
            </Grid>
          </Container>
        </ScrollView>
        <Actions>
          <Button
            isLoading={isSubmitting}
            title="Save"
            fixedWidth
            onPress={formik.handleSubmit}
          />
        </Actions>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SocialDetails.defaultProps = {
  rightActionLabel: null,
  onRightActionPressed: null,
  onComplete: null,
};

SocialDetails.propTypes = {
  rightActionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onRightActionPressed: PropTypes.func,
  onComplete: PropTypes.func,
};
