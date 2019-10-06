import styled from 'styled-components';

export const Main = styled.View`
  width: ${props => props.size}px;
  aspect-ratio: 1;
  border-radius: 400px;
  background: ${props => props.theme.grey};
  overflow: hidden;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
