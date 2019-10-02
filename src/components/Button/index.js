import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Text from '../../components/Text';

const Main = styled.TouchableOpacity`
  padding: 0 ${props => props.theme.spacing}px;
  justify-content: center;
  border-radius: 200px;
  min-height: 40px;
  background: ${props =>
    props.isDark ? props.theme.black : props.theme.brand};
  ${props =>
    props.fixedWidth &&
    `
      width: 200px; 
      max-width: 100%;
    `}
`;

const Title = styled(Text)`
  font-size: 14px;
  color: ${props => props.theme.white};
  text-align: center;
  font-weight: bold;
  ${props => props.isLoading && `opacity: 0;`}
`;

const Loader = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const ActivityIndicator = styled.ActivityIndicator.attrs(props => ({
  color: props.theme.white,
}))``;

const Button = ({ title, isLoading, ...props }) => (
  <Main {...props}>
    <Title isLoading={isLoading}>{title}</Title>
    {isLoading && (
      <Loader>
        <ActivityIndicator />
      </Loader>
    )}
  </Main>
);

Button.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Button;
