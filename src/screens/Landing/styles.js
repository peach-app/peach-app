import styled from 'styled-components';

export const Main = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  padding: ${props => props.theme.spacing}px;
  background: ${props => props.theme.brand};
  border-top-left-radius: ${props => props.theme.radius}px;
  border-top-right-radius: ${props => props.theme.radius}px;
  margin-top: auto;
`;
