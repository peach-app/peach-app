import styled from 'styled-components/native';

export const Main = styled.View`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 400px;
  background: ${props => props.theme.grey};
  overflow: hidden;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
