import styled from 'styled-components/native';

import Text from '../../components/Text';

export const ActivityIndicator = styled.ActivityIndicator.attrs(props => ({
  color: props.theme.white,
}))``;

export const Main = styled.TouchableOpacity`
  padding: 0 ${props => props.theme.spacing}px;
  justify-content: center;
  border-radius: 200px;
  min-height: 40px;
  ${props =>
    props.isGhost &&
    `
      border-width: 2px;
      border-color: ${props.theme.foreground};
    `}
  ${props =>
    !props.isGhost &&
    `
      background-color: ${props.isDark ? props.theme.black : props.theme.brand};
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
  font-family: futura-bold;
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
