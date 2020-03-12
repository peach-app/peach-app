import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Main = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  name: 'ios-cloud-upload',
  size: 32,
  color: props.theme.white,
}))``;
