import styled from 'styled-components/native';

export const Container = styled.View`
  padding-horizontal: ${props => props.theme.spacing}px;
  width: 900px;
  max-width: 100%;
  align-self: center;
`;

export default Container;
