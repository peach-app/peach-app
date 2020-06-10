import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Main = styled.TouchableOpacity`
  background: ${props => props.theme.black};
  height: 100px;
  border-radius: ${props => props.theme.radius}px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const Media = styled.Image`
  opacity: 0.7;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  name: 'ios-trash',
  size: 32,
  color: props.theme.white,
}))``;
