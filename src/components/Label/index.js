import styled from 'styled-components/native';

import { Text } from '../Text';

export const Label = styled(Text)`
  margin-vertical: ${props => props.theme.spacingSmall}px;
  color: ${props => (props.error ? props.theme.error : props.theme.foreground)};
`;
