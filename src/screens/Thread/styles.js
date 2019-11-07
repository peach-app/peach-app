import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Composer = styled.View`
  padding-vertical: ${props => props.theme.spacingSmall}px;
  padding-right: ${props => props.theme.spacing}px;
  border-color: ${props => props.theme.greyLight};
  border-top-width: 1px;
  flex-direction: row;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  max-height: 200px;
  margin-right: ${props => props.theme.spacing}px;
  padding-left: ${props => props.theme.spacing}px;
  font-family: futura-book;
  color: ${props => props.theme.foreground};
`;

export const Send = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const Icon = styled(Ionicons).attrs({
  size: 30,
  name: 'ios-send',
})`
  color: ${props => props.theme.brand};
`;
