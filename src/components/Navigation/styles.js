import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';

export const Main = styled(Animatable.View).attrs({
  animation: 'slideInUp',
  duration: 300,
})`
  background: ${props => props.theme.white};
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

export const List = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: ${props => props.theme.spacing}px;
`;
