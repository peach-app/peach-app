import styled, { css } from 'styled-components/native';

import { Text } from '../Text';

export const ActivityIndicator = styled.ActivityIndicator.attrs(props => ({
  color: props.isGhost ? props.theme.foreground : props.theme.white,
}))``;

export const Main = styled.TouchableOpacity`
  padding: 0 ${props => props.theme.spacing}px;
  justify-content: center;
  border-radius: ${props => props.theme.radius}px;
  min-height: ${props => (props.isSmall ? 32 : 40)}px;
  ${props =>
    props.isGhost &&
    `
      border-width: 2px;
      border-color: ${props.theme.foreground};
    `}
  ${props =>
    !props.isGhost &&
    css`
      background-color: ${props => {
        if (props.isDark) {
          return props.theme.black;
        }

        if (props.isShaded || props.disabled) {
          return props.theme.greyDark;
        }

        return props.theme.brand;
      }};
    `};
  ${props =>
    props.fixedWidth &&
    `
      width: 200px;
      max-width: 100%;
    `}
`;

export const Title = styled(Text)`
  font-size: 14px;
  color: ${props =>
    props.isGhost ? props.theme.foreground : props.theme.white};
  text-align: center;
  font-family: ${props => props.theme.fontFamily.bold};
  ${props => props.isLoading && `opacity: 0;`}
`;

export const Loader = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;
