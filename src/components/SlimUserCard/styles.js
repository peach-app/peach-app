import styled from 'styled-components/native';

import Text from '../../components/Text';

export const Main = styled.TouchableOpacity`
  align-items: center;
  width: 50px;
  margin-right: ${props => props.theme.spacingSmall}px;
`;

export const Name = styled(Text)`
  margin-top: ${props => props.theme.spacingSmall}px;
  text-align: center;
  font-size: 12px;
`;
