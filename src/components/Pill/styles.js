import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { Text as BaseText } from '../Text';

export const Main = styled.View`
  border-radius: 200px;
  background: ${props =>
    props.isSelected ? props.theme.brand : props.theme.greyLight};
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${props =>
    props.isSmall ? props.theme.spacingSmall : props.theme.spacing}px;
  padding-vertical: ${props => props.theme.spacingXSmall}px;
  align-self: flex-start;
  margin-right: 2px;
`;

export const Text = styled(BaseText)`
  ${props => props.isSmall && `font-size: 10px;`}
  ${props => props.isSelected && `color: ${props.theme.white};`}
`;

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
}))`
  margin-right: ${props => props.theme.spacingXSmall}px;
  opacity: 0.7;
`;
