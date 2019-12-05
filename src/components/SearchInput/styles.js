import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Main = styled.View`
  overflow: hidden;
  border-radius: ${props => props.theme.radius * 4}px;
  background-color: ${props => props.theme.greyLight};
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.greyDark,
}))`
  background-color: transparent;
  flex: 1;
  color: ${props => props.theme.foreground};
  font-family: futura-book;
  padding-vertical: ${props => props.theme.spacingSmall}px;
  padding-horizontal: ${props => props.theme.spacing}px;
  font-size: 16px;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  name: 'ios-search',
  color: props.theme.greyDark,
  size: 24,
}))`
  padding-right: ${props => props.theme.spacing}px;
`;
