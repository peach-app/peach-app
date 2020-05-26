import { Ionicons } from '@expo/vector-icons';

import styled from 'styled-components/native';

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.brand,
  name: 'ios-notifications',
  size: 300,
}))``;

export const IconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Main = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  display: flex;
  justify-content: center;
`;
