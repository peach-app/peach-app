import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

export const Touchable = styled.TouchableOpacity`
  position: relative;
`;

export const Spacer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Main = styled.View`
  background: rgba(0, 0, 0, 0.5);
  flex: 1;
`;

export const Content = styled(Animatable.View).attrs({
  animation: 'fadeInUp',
  duration: 300,
  delay: 300,
})`
  background: ${props => props.theme.background};
  margin-top: auto;
  padding-bottom: ${props => props.theme.spacingXLarge}px;
`;
