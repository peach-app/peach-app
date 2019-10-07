import React from 'react';
import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';

const LoadingHOC = Component => ({ children, isLoading, ...props }) => {
  if (isLoading) {
    return <Component {...props} />;
  }

  return children;
};

const fadingAnimation = {
  iterationCount: 'infinite',
  animation: 'fadeIn',
  direction: 'alternate',
  duration: 700,
};

const Text = styled(Animatable.Text).attrs(fadingAnimation)`
  background-color: ${props => props.theme.grey};
  color: transparent;
`;

export const SkeletonText = LoadingHOC(({ loadingText = 'Loading...' }) => (
  <Text>{loadingText}</Text>
));

export const SkeletonCircle = LoadingHOC(styled(Animatable.View).attrs(
  fadingAnimation
)`
  width: ${props => props.size}px;
  aspect-ratio: 1;
  background: ${props => props.theme.grey};
  border-radius: 400px;
`);
