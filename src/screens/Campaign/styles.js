import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import Text from '../../components/Text';

export const Foot = styled(Animatable.View).attrs({
  animation: 'fadeInUp',
  duration: 300,
  delay: 300,
})`
  padding-top: ${props => props.theme.spacing}px;
  padding-bottom: ${props => props.theme.spacingLarge}px;
  border-color: ${props => props.theme.greyLight};
  border-top-width: 1px;
  align-items: center;
`;

export const Description = styled(Text)`
  line-height: 22px;
`;
