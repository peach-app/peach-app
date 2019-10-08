import styled from 'styled-components';

import Text from '../../components/Text';

export const Main = styled.View`
  padding-vertical: ${props => props.theme.spacingXLarge}px;
`;

export const Center = styled.View`
  align-items: center;
`;

export const Name = styled(Text)`
  font-size: 22px;
  font-family: futura-bold;
  text-align: center;
`;
