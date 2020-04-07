import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Title, Loading, Intro } from 'components';
import * as Device from 'expo-device';
import { useMutation } from '@apollo/react-hooks';
import VERIFY_EMAIL from './graphql/verify-email';
import { Content, Icon } from './styles';
import getDeepLink from '../../helpers/getDeepLink';

const deepLinkBackToApp = async () => {
  const deepLink = await getDeepLink();
  window.location.href = deepLink;
};

export const VerifyEmail = () => {
  const { token } = useParams();
  const [isEmailVerified, setEmailVerification] = useState(false);
  const [verifyEmail] = useMutation(VERIFY_EMAIL, {
    onCompleted: () => setEmailVerification(true),
  });

  useEffect(() => {
    if (!isEmailVerified) {
      if (token) {
        verifyEmail({
          variables: {
            emailVerificationToken: token,
          },
        });
      }
    } else {
      const timer = setTimeout(() => {
        deepLinkBackToApp();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isEmailVerified]);

  return (
    <Content>
      <Title isCentered>
        {isEmailVerified
          ? 'Email successfully verified!'
          : 'Verifying your email'}
      </Title>
      <Intro />
      {isEmailVerified ? <Icon /> : <Loading size="large" />}
      <Intro />
    </Content>
  );
};
