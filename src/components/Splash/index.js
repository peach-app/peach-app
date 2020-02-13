import React from 'react';
import { Image } from 'react-native';

import splash from '../../assets/splash.png';

export const Splash = () => (
  <Image
    source={splash}
    resizeMode="contain"
    style={{ width: '100%', flex: 1 }}
  />
);
