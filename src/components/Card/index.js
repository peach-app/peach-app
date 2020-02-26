import styled from 'styled-components/native';

export const Card = styled.View`
  border-radius: ${props => props.theme.radius};
  border-width: 1px;
  border-color: ${props => props.theme.greyLight};
  padding: ${props => props.theme.spacing}px;
  flex-grow: 1;
`;
