import styled from 'styled-components/native';

import { Title } from '../Title';

export const Main = styled.ScrollView.attrs(props => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: props.theme.spacing,
  },
}))`
  padding-bottom: ${props => props.theme.spacingSmall}px;
  margin-horizontal: ${props => -props.theme.spacing}px;
`;

export const Item = styled.View`
  border-bottom-width: 4px;
  position: relative;
  padding-vertical: ${props => props.theme.spacingSmall}px;
  margin-right: ${props => props.theme.spacing}px;
  border-color: ${props => (props.active ? props.theme.brand : 'transparent')};
  ${({ hasBadge, theme }) => hasBadge && `padding-right: ${theme.spacingSmall}`}
`;

export const TabTitle = styled(Title)`
  text-align: center;
  font-size: 16px;
  ${props => !props.active && `color: ${props.theme.greyDark};`}
`;

export const BadgeWrapper = styled.View`
  position: absolute;
  top: 2px;
  right: -10px;
  z-index: 2;
`;
