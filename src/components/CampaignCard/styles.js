import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../Text';

export const MainTitle = styled(Text)`
  margin-bottom: ${props => props.theme.spacingXSmall}px;
`;

export const Description = styled(Text)`
  color: ${props => props.theme.greyDark};
`;

export const ArrowIcon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
  size: 22,
  name: 'ios-arrow-forward',
}))`
  margin-right: ${props => props.theme.spacingSmall}px;
`;

export const Pills = styled.View`
  padding-top: ${props => props.theme.spacingSmall}px;
  flex-direction: row;
`;
