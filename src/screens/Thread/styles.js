import styled from 'styled-components/native';

export const Composer = styled.View`
  padding-vertical: ${props => props.theme.spacingSmall}px;
  padding-right: ${props => props.theme.spacing}px;
  border-color: ${props => props.theme.greyLight};
  border-top-width: 1px;
  flex-direction: row;
  align-items: flex-end;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  max-height: 200px;
  align-self: center;
  padding-vertical: ${props => props.theme.spacingSmall}px;
  margin-vertical: -${props => props.theme.spacingSmall}px;
  margin-right: ${props => props.theme.spacingSmall}px;
  padding-left: ${props => props.theme.spacing}px;
`;
