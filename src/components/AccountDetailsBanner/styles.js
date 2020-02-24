import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import { Text } from '../Text';

export const Touchable = styled.TouchableOpacity`
  background: ${props => props.theme.background};
`;

export const Main = styled(Animatable.View).attrs({
  animation: 'slideInDown',
  duration: 300,
})`
  padding-vertical: ${props => props.theme.spacingSmall}px;
  background: ${props => props.theme.brand};
`;

export const Copy = styled(Text)`
  color: ${props => props.theme.white};
  width: 80%;
`;
