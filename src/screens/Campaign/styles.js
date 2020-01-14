import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

export const Foot = styled(Animatable.View).attrs({
  animation: 'fadeInUp',
  duration: 300,
  delay: 300,
})`
  padding-vertical: ${props => props.theme.spacing}px;
  border-color: ${props => props.theme.greyLight};
  border-top-width: 1px;
  align-items: center;
`;
