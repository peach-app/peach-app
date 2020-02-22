import styled from 'styled-components/native';

import { Text } from 'components';

export const Sub = styled(Text)`
  font-family: ${props => props.theme.fontFamily.bold};
  margin-bottom: ${props => props.theme.spacingSmall}px;
`;
