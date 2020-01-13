import styled from 'styled-components/native';

import { Text } from '../Text';

export const NoResultText = styled(Text).attrs({
  isCenter: true,
})`
  margin-vertical: ${props => props.theme.spacing}px;
`;
