import React from 'react';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

import { Text } from '../Text';

const Version = styled(Text).attrs({ isCenter: true })`
  font-size: 10px;
`;

export const AppVersion = () => (
  <Version>App V {Constants.manifest.version}</Version>
);
