import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

export const Main = styled.View`
  flex: 1;
`;

export const Content = styled(Animatable.View).attrs({
  animation: 'slideInUp',
  duration: 300,
  delay: 300,
})`
  background: ${props => props.theme.brand};
  margin-top: auto;
`;

export const Actions = styled.View`
  padding: ${props => props.theme.spacingLarge}px
    ${props => props.theme.spacing}px;
`;
