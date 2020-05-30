import { Ionicons } from '@expo/vector-icons';

import styled from 'styled-components/native';

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.brand,
  name: 'ios-notifications',
  size: 100,
}))`
  margin-left: auto;
  margin-right: auto;
`;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
`;
