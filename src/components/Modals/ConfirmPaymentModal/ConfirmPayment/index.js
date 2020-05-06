import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { Loading, Container, Title, Intro, Icon } from 'components';
import getOr from 'lodash/fp/getOr';
import { useQuery } from '@apollo/react-hooks';
import * as WebBrowser from 'expo-web-browser';
import GET_PAYMENT_CONFIRMATION_STATUS from './graphql/get-payment-status';

const IconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ConfirmPayment = ({
  payment,
  onPaymentConfirmed,
  onPaymentConfirmationFailed,
}) => {
  const [appHasBeenInactive, setAppHasBeenInactive] = useState(false);

  const [isAppFocused, setIsAppFocused] = useState(false);

  const { data } = useQuery(GET_PAYMENT_CONFIRMATION_STATUS, {
    variables: { id: payment.id },
    pollInterval: 1000,
    fetchPolicy: 'network-only',
  });

  const status = getOr('', 'getPaymentConfirmationStatus.status', data);

  const onFocus = () => {
    setIsAppFocused(true);
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('focus', onFocus);
    }
    const getBrowserState = async () => {
      const state = await WebBrowser.openBrowserAsync(payment.redirectUrl);

      if (state.type === 'dismiss' || state.type === 'cancel') {
        setAppHasBeenInactive(true);
      }
    };

    getBrowserState();

    if (Platform.OS === 'web') {
      return () => window.removeEventListener('focus', onFocus);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (status) {
      if (status === 'succeeded') {
        onPaymentConfirmed(payment.id);
      } else {
        const isAppActive = Platform.OS === 'web' ? isAppFocused : true;
        // eslint-disable-next-line
      if (appHasBeenInactive && isAppActive && !timer) {
          const startTimer = () =>
            setTimeout(() => {
              if (status !== 'succeeded') {
                onPaymentConfirmationFailed();
              }
            }, 5000);

          timer = startTimer();
        }
      }
    }
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Container>
      <IconWrapper>
        <Icon size={70} name="ios-card" />
      </IconWrapper>
      <Title isCenter>Confirming payment</Title>
      <Intro />
      <Loading size="large" />
    </Container>
  );
};

ConfirmPayment.propTypes = {
  payment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    redirectUrl: PropTypes.string.isRequired,
  }).isRequired,
  onPaymentConfirmed: PropTypes.func.isRequired,
  onPaymentConfirmationFailed: PropTypes.func.isRequired,
};
