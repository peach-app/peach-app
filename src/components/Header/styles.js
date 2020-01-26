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

// REFACTOR LEFT & RIGHT 
export const Action = styled.View`
  position: absolute;
  top: 0;
  ${(props) => props.isRight ? `right: ${props.theme.spacing}px` : `left: ${props.theme.spacing}px` }
  bottom: 0;
  z-index: 2;
  justify-content: center;
  `;
  
  export const MainTitle = styled(Text)`
  text-align: center;
  font-size: 16px;
  `;
  
  // SHOULD BE BIGGER AND BOLD
  export const RightAction = styled(Text)`
  color: ${props => props.theme.brand}
  font-weight: bold;
  `;