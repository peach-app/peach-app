import { Platform } from 'react-native';
import styled from 'styled-components/native';

import splash from '../../assets/splash.png';

export const Splash = styled.Image.attrs({
  resizeMode: 'contain',
  source: splash,
})`
  flex: 1;
  ${Platform.select({
    web: `
        width: 600px;
        max-width: 100%;
        margin-horizontal: auto;
      `,
    ios: `width: 100%;`,
    android: `width: 100%`,
  })}
`;
