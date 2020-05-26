import React from 'react';
import styled from 'styled-components/native';
import { Text } from '../Text';

const Main = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const StyledSwitch = styled.Switch.attrs(props => ({
  trackColor: { false: props.theme.white, true: props.theme.brand },
  ios_backgroundColor: props.theme.grey,
}))``;

export const Switch = ({ isEnabled, onToggle }) => (
  <StyledSwitch onValueChange={onToggle} value={isEnabled} />
);

export const LabeledSwitch = ({ label, isEnabled, onToggle }) => (
  <Main>
    <Text>{label}</Text>
    <StyledSwitch onValueChange={onToggle} value={isEnabled} />
  </Main>
);
