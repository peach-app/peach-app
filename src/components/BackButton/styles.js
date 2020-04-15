import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Main = styled.TouchableOpacity`
  width: ${props => 22 + props.theme.spacingSmall * 2}px;
  padding: ${props => props.theme.spacingSmall}px;
  margin: -${props => props.theme.spacingSmall}px;
  justify-content: center;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  size: 22,
  color: props.theme.foreground,
}))``;
