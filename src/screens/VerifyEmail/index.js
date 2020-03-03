import React from 'react';
import styled from 'styled-components/native';
import { useParams } from 'react-router-dom';
import { Title, Loading, Intro } from 'components';
import * as Device from 'expo-device';

export const Content = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${props => props.theme.background};
  padding: ${props => props.theme.spacing}px;
`;

const getDeepLink = () => {
  if (Device.isDevice) {
    // check if prod:
    // and replace with in expo.scheme file (in app.json) alias
    // peach-app://
    // else local -> replace here
    return 'exp://192.168.1.118:19000/';
  }

  // check if prod:
  // https://dashboard.peachapp.io/
  // else local -> replace here
  return 'http://192.168.1.118:19006/';
};

export const VerifyEmail = () => {
  const { token } = useParams();
  if (token) {
    const deepLink = getDeepLink();
    window.location.href = deepLink;
  }

  return (
    <Content>
      <Title isCentered>Hold on a sec while we are redirecting you.</Title>
      <Intro />
      <Loading size="large" />
    </Content>
  );
};
