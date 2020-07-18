import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

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
  border-radius: ${props => props.theme.radius}px;
  margin-bottom: ${props => props.theme.spacingSmall}px;
  border: 1px solid ${props => props.theme.greyLight};
  ${props => props.isSelf && `background: ${props.theme.greyLight};`}
  ${props =>
    props.isSelf
      ? 'border-bottom-right-radius: 0px;'
      : 'border-bottom-left-radius: 0px;'}
`;
