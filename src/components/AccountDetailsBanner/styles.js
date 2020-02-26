import styled from 'styled-components/native';

import { Text } from '../Text';

export const Touchable = styled.TouchableWithoutFeedback`
  background: ${props => props.theme.background};
`;

export const Main = styled.View`
  padding-vertical: ${props => props.theme.spacingSmall}px;
  background: ${props => props.theme.brand};
`;

export const Copy = styled(Text)`
  color: ${props => props.theme.white};
`;
