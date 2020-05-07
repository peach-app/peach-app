import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';

export const Touchable = styled.TouchableOpacity``;

const size = Math.min(Dimensions.get('window').width * 0.8, 500);

export const Main = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const Graphic = styled.View`
  width: ${size * 2}px;
  height: ${size * 2}px;
  background: ${props => props.theme.brand};
  border-radius: 1000px;
  position: absolute;
  top: -${size}px;
  right: -${size}px;
`;

export const Form = styled.View`
  ${Platform.select({
    ios: 'margin-top: auto;',
    android: 'margin-top: auto;',
  })}
  padding-bottom: ${props => props.theme.spacingXLarge}px;
  padding-top: ${props => props.theme.spacing}px;
`;
