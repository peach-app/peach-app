import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../Text';

export const Main = styled.TouchableOpacity`
  padding-vertical: ${props => props.theme.spacingSmall}px;
  display: flex;
  align-items: center;
`;

export const Copy = styled(Text)`
  color: ${props => props.theme.foreground};
  padding-left: ${props => props.theme.spacingSmall}px;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  name: 'ios-cloud-upload',
  size: 25,
  color: props.theme.foreground,
}))``;
