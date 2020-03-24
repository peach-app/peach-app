import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Content = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${props => props.theme.background};
  padding: ${props => props.theme.spacing}px;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
  size: 100,
  name: 'ios-checkmark-circle-outline',
}))``;
