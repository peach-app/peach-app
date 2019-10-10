import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

export const Main = styled(Animatable.View).attrs({
  animation: 'slideInUp',
  duration: 300,
  delay: 300,
})`
  background: ${props => props.theme.background};
  border-top-width: 1px;
  border-color: ${props => props.theme.greyLight};
`;

export const List = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-horizontal: -${props => props.theme.spacingSmall}px;
`;

export const Item = styled.View`
  padding-horizontal: ${props => props.theme.spacingSmall}px;
  padding-vertical: ${props => props.theme.spacing}px;
`;
