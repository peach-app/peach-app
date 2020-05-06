import styled from 'styled-components/native';

export const Note = styled.View`
  padding: ${props => props.theme.spacingSmall}px;
  border-radius: ${props => props.theme.radius}px;
  border-color: ${props => props.theme.greyLight};
  border-width: 1px;
  margin-vertical: ${props => props.theme.spacingSmall}px;
`;

export const PayRate = styled.View`
  margin-top: ${props => props.theme.spacingSmall}px;
`;
