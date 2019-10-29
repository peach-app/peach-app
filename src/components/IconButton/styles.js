import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Touchable = styled.TouchableOpacity`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.theme.greyLight};
  border-radius: 200px;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.brand,
}))`
  margin: auto;
`;
