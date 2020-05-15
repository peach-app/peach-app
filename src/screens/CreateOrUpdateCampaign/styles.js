import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Main = styled.View`
  padding-top: ${props => props.theme.spacingXLarge * 3}px;
`;

export const PushToTop = styled.View`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const size = Math.min(Dimensions.get('window').width * 0.6, 500);

export const Graphic = styled.View`
  width: ${size * 2}px;
  height: ${size * 2}px;
  background: ${props => props.theme.brand};
  border-radius: 1000px;
  position: absolute;
  top: -${size * 1.5}px;
  right: -${size}px;
`;
