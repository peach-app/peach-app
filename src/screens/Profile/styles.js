import styled from 'styled-components/native';

export const Main = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const Top = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;
