import { Platform } from 'react-native';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import splash from '../../assets/splash.png';

export const ImageBackground = styled.ImageBackground.attrs({
  resizeMode: 'contain',
  source: splash,
})`
  ${props =>
    Platform.select({
      web: `
      width: 600px;
      max-width: 100%;
      margin-horizontal: auto;
      padding-horizontal: ${props.theme.spacing}px;
    `,
    })}
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const Main = styled.View`
  flex: 1;
`;

export const Content = styled(Animatable.View).attrs({
  animation: 'fadeInUp',
  duration: 300,
  delay: 300,
})`
  background: ${props => props.theme.brand};
  margin-top: auto;
  ${props =>
    Platform.select({
      web: `
        border-radius: ${props.theme.radius * 3}px;
        margin-bottom: ${props.theme.spacingXLarge}px;
      `,
    })}
`;

export const Actions = styled.View`
  padding: ${props => props.theme.spacingLarge}px
    ${props => props.theme.spacing}px;
`;
