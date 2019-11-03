import styled from 'styled-components/native';

import Title from '../../components/Title';

export const Main = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: ${props => props.theme.spacingSmall}px;
`;

export const Item = styled.View`
  border-bottom-width: 4px;
  padding-vertical: ${props => props.theme.spacingSmall}px;
  margin-right: ${props => props.theme.spacingMedium}px;
  border-color: ${props => (props.active ? props.theme.brand : 'transparent')};
`;

export const TabTitle = styled(Title)`
  text-align: center;
  font-size: 16px;
  ${props => !props.active && `color: ${props.theme.greyDark};`}
`;
