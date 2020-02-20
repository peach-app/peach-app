import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { Text as BaseText } from '../Text';

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
  size: 22,
}))`
  margin-right: ${props => props.theme.spacingSmall}px;
`;

export const Users = styled(BaseText)``;

export const Text = styled(BaseText)`
  color: ${props => props.theme.greyDark};
`;
