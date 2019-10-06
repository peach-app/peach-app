import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';

export const Main = styled.View`
  flex: 1;
`;

export const Content = styled(Animatable.View).attrs({
  animation: 'slideInUp',
  useNativeDriver: true,
  duration: 300,
})`
  background: ${props => props.theme.brand};
  border-top-left-radius: ${props => props.theme.radius}px;
  border-top-right-radius: ${props => props.theme.radius}px;
  margin-top: auto;
`;

export const Actions = styled.View`
  padding: ${props => props.theme.spacingLarge}px
    ${props => props.theme.spacing}px;
`;
