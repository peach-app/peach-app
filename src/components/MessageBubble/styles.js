import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import { Text as BaseText } from '../Text';

export const Main = styled(Animatable.View).attrs({
  animation: 'fadeInUp',
  duration: 300,
  delay: 300,
})`
  align-items: ${props => (props.isSelf ? 'flex-end' : 'flex-start')};
`;

export const Bubble = styled.View`
  max-width: 80%;
  padding: ${props => props.theme.spacingSmall}px;
  background: ${props => (props.isSelf ? props.theme.brand : props.theme.grey)};
  border-radius: ${props => props.theme.radius}px;
  margin-bottom: ${props => props.theme.spacingSmall}px;
  ${props =>
    props.isSelf
      ? 'border-bottom-right-radius: 0px;'
      : 'border-bottom-left-radius: 0px;'}
`;

export const Text = styled(BaseText)`
  ${props => props.isSelf && `color: ${props.theme.white};`}
`;
