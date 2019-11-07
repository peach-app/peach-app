import styled from 'styled-components';

import BaseText from '../../components/Text';

export const Main = styled.View`
  align-items: ${props => (props.isSelf ? 'flex-end' : 'flex-start')};
`;

export const Bubble = styled.View`
  max-width: 80%;
  padding: ${props => props.theme.spacingSmall}px;
  background: ${props => (props.isSelf ? props.theme.brand : props.theme.grey)};
  border-radius: ${props => props.theme.radius}px;
  margin-bottom: ${props => props.theme.spacingSmall}px;
`;

export const Text = styled(BaseText)`
  ${props => props.isSelf && `color: ${props.theme.white};`}
`;
