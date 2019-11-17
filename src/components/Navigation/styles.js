import { Platform } from 'react-native';
import styled from 'styled-components/native';

import LogoAsset from '../../assets/logo.png';

export const Main = styled.View`
  background: ${props => props.theme.background};
  ${Platform.select({
    ios: `border-top-width: 1px;`,
    android: `border-top-width: 1px;`,
    web: `
      order: -1;
      border-bottom-width: 1px;
    `,
  })}
  border-color: ${props => props.theme.greyLight};
`;

export const List = styled.View`
  flex-direction: row;
  justify-content: ${Platform.select({
    ios: 'space-around',
    androind: 'space-around',
    web: 'flex-end',
  })};
  margin-horizontal: -${props => props.theme.spacingSmall}px;
`;

export const Logo = styled.Image.attrs({
  source: LogoAsset,
})`
  resize-mode: contain;
  width: 30px;
  margin-right: auto;
  margin-left: ${props => props.theme.spacingSmall}px;
`;

export const Item = styled.View`
  padding-horizontal: ${props =>
    Platform.select({
      ios: props.theme.spacingSmall,
      androind: props.theme.spacingSmall,
      web: props.theme.spacing,
    })}px;
  padding-vertical: ${props => props.theme.spacingSmall}px;
`;
