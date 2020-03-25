import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Title, Loading, Intro } from 'components';
import * as Device from 'expo-device';
import { useMutation } from '@apollo/react-hooks';
import VERIFY_EMAIL from './graphql/verify-email';
import { Content, Icon } from './styles';

const PC_HARDWARE = 3;

const getDeepLink = async () => {
  const device = await Device.getDeviceTypeAsync();

  if (device !== PC_HARDWARE) {
    // check if prod:
    // and replace with in expo.scheme file (in app.json) alias
    // peach-app://
    // else local -> replace here
    return 'peach-app://';
  }

  // check if prod:
  // https://dashboard.peachapp.io/
  // else local -> replace here
  return 'https://dashboard.peachapp.io/';
};

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
