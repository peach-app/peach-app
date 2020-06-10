import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Main = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  padding: ${props => props.theme.spacingSmall}px;
  justify-content: flex-start;
  align-items: center;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  size: 22,
  color: props.theme.foreground,
  name: 'ios-arrow-back',
}))`
  padding-right: ${props => props.theme.spacingSmall};
`;
