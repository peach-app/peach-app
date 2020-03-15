import styled from 'styled-components/native';

import { Text } from '../Text';
import { Title } from '../Title';

export const MainTitle = styled(Text)`
  margin-bottom: ${props => props.theme.spacingXSmall}px;
`;

export const User = styled(Title)`
  color: ${props => props.theme.greyDark};
  font-size: 12px;
`;

export const Description = styled(Text)`
  color: ${props => props.theme.greyDark};
`;
