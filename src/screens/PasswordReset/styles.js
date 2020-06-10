import styled from 'styled-components/native';
import LogoAsset from '../../assets/logo.png';

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${props => props.theme.background};
  padding: ${props => props.theme.spacing}px;
  font-family: ${props => props.theme.fontFamily.bold};
`;

export const Logo = styled.Image.attrs({
  source: LogoAsset,
})`
  width: 100px;
`;
