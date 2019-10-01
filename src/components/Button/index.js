import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Text from '../../components/Text';

const Main = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing}px;
  border-radius: 200px;
  min-height: 40px;
  background: ${props =>
    props.isDark ? props.theme.black : props.theme.brand};
`;

const Title = styled(Text)`
  font-size: 14px;
  color: ${props => props.theme.white};
  text-align: center;
  font-weight: bold;
`;

const Button = ({ title, ...props }) => (
  <Main {...props}>
    <Title>{title}</Title>
  </Main>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Button;
