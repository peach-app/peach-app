import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../Text';

export const Main = styled.TouchableOpacity`
  padding-vertical: ${props => props.theme.spacing}px;
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-color: ${props => props.theme.greyLight};
`;

export const Title = styled(Text)`
  font-size: 16px;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
  size: 22,
}))`
  margin-left: auto;
`;
