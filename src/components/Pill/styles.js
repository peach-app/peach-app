import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { Text as BaseText } from '../Text';

export const Main = styled.View`
  border-radius: 200px;
  background: ${props => props.theme.greyLight};
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${props => props.theme.spacingSmall}px;
  padding-vertical: ${props => props.theme.spacingXSmall}px;
  margin-right: ${props => props.theme.spacingXSmall}px;
`;

export const Text = styled(BaseText)`
  font-size: 10px;
  opacity: 0.7;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
}))`
  margin-right: ${props => props.theme.spacingXSmall}px;
  opacity: 0.7;
`;
