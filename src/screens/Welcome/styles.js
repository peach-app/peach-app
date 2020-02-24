import styled from 'styled-components/native';

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding-horizontal: ${props => props.theme.spacing}px;
`;

export const Image = styled.Image`
  width: 100%;
  flex: 0.8;
  resize-mode: contain;
  margin-horizontal: auto;
`;
