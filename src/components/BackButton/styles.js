import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Main = styled.TouchableOpacity`
  width: 22px;
  justify-content: center;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  name: 'ios-arrow-back',
  size: 22,
  color: props.theme.foreground,
}))``;
