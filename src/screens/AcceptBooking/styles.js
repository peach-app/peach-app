import styled from 'styled-components/native';

import { Text } from 'components';

export const Main = styled.View`
  flex: 1;
`;

export const Charge = styled.View`
  margin: auto;
`;

export const Cost = styled(Text)`
  font-size: 40px;
  font-family: ${props => props.theme.fontFamily.bold};
  font-variant: tabular-nums;
`;
