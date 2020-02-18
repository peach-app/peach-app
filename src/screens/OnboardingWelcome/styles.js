import styled from 'styled-components/native';

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding-horizontal: ${props => props.theme.spacing}px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 200px;
  resize-mode: contain;
`;
