import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { Platform } from 'react-native';

export const Main = styled.View`
  aspect-ratio: 1;
  width: 100%;
  ${Platform.select({
    web: `
      height: 40vh;
      min-height: 250px;
    `,
  })}
`;

export const Fallback = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Image = styled(Animatable.Image).attrs({
  animation: 'fadeIn',
  duration: 300,
  delay: 300,
})`
  width: 100%;
  height: 100%;
`;
