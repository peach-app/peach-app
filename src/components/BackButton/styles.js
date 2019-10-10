import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Main = styled.TouchableOpacity`
  width: 30px;
  margin-bottom: ${props => props.theme.spacing}px;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  name: 'ios-arrow-back',
  size: 30,
  color: props.theme.foreground,
}))``;
