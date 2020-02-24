import styled from 'styled-components/native';

import { Text } from '../Text';

export const Main = styled.TouchableOpacity`
  padding-vertical: ${props => props.theme.spacingSmall}px;
  background: ${props => props.theme.brand};
`;

export const Copy = styled(Text)`
  color: ${props => props.theme.white};
  width: 80%;
`;
