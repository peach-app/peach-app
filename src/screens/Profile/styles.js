import styled from 'styled-components/native';

export const Head = styled.View`
  padding-vertical: ${props => props.theme.spacing}px;
  border-bottom-width: 2px;
  border-color: ${props => props.theme.greyLight};
`;

export const Section = styled.View`
  border-top-width: 1px;
  border-color: ${props => props.theme.greyLight};
  margin-top: ${props => props.theme.spacing}px;
`;

export const Categories = styled.View`
  margin-top: ${props => props.theme.spacingSmall}px;
`;
