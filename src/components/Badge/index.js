import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Count = styled.Text`
  font-family: ${props => props.theme.fontFamily.bold};
  font-size: 10px;
  color: ${props => props.theme.white};
  text-align: center;
`;

const Circle = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 100px;
  background-color: ${props => props.theme.brand};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Badge = ({ count }) => (
  <Circle>
    <Count>{count}</Count>
  </Circle>
);

Badge.propTypes = {
  count: PropTypes.number.isRequired,
};
