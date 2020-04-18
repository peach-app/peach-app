import styled from 'styled-components/native';

export const Main = styled.View`
  margin-right: -${props => props.theme.spacing}px;
`;

export const Head = styled.View`
  padding-right: ${props => props.theme.spacing}px;
`;

export const Item = styled.View`
  padding-right: ${props => props.theme.spacing}px;
  padding-bottom: ${props => props.theme.spacing}px;
  width: 50%;
`;

export const Skeletons = styled.View`
  flex-direction: row;
`;
