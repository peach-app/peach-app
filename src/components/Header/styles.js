import styled from 'styled-components/native';

import { Text } from '../Text';
import { Container } from '../Container';

export const Main = styled.View`
  border-bottom-width: 1px;
  height: 55px;
  border-color: ${props => props.theme.greyLight};
`;

export const Wrapper = styled(Container)`
  height: 100%;
  justify-content: center;
`;

export const Action = styled.View`
  position: absolute;
  top: 0;
  left: ${props => props.theme.spacing}px;
  bottom: 0;
  z-index: 2;
  justify-content: center;
`;

export const MainTitle = styled(Text)`
  text-align: center;
  font-size: 16px;
`;
