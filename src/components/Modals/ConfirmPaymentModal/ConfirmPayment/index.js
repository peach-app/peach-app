import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppState } from 'react-native';
import styled from 'styled-components';
import { Loading, Container, Title, Intro, Icon } from 'components';
import getOr from 'lodash/fp/getOr';
import { useQuery } from '@apollo/react-hooks';
import GET_PAYMENT_CONFIRMATION_STATUS from './graphql/get-payment-status';

const IconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ConfirmPayment = ({
  id,
  onPaymentConfirmed,
  onPaymentConfirmationFailed,
}) => {
  const [appHasBeenInactive, setAppHasBeenIactive] = useState(false);

  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      setAppHasBeenIactive(true);
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const { data } = useQuery(GET_PAYMENT_CONFIRMATION_STATUS, {
    variables: { id },
    pollInterval: 1000,
    fetchPolicy: 'network-only',
  });

  const status = getOr('', 'getPaymentConfirmationStatus.status', data);

  useEffect(() => {
    let timer;
    if (status === 'succeeded') {
      onPaymentConfirmed(id);
    } else {
      // eslint-disable-next-line
      if (appHasBeenInactive && appState === 'active' && !timer) {
        const startTimer = () =>
          setTimeout(() => {
            if (status !== 'succeeded') {
              onPaymentConfirmationFailed();
            }
          }, 5000);

        timer = startTimer();
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
  id: PropTypes.string.isRequired,
  onPaymentConfirmed: PropTypes.func.isRequired,
  onPaymentConfirmationFailed: PropTypes.func.isRequired,
};
