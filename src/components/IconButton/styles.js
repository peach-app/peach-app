import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Touchable = styled.TouchableOpacity``;

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
}))`
  margin: auto;
`;
