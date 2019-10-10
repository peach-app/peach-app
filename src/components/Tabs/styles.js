import styled from 'styled-components/native';

import Text from '../../components/Text';

export const Main = styled.View`
  flex-direction: row;
  background: ${props => props.theme.greyLight};
  border-radius: 200px;
`;

export const Item = styled.View`
  flex-grow: 1;
  min-height: 38px;
  justify-content: center;
  border-radius: 200px;
  ${props => props.active && `background: ${props.theme.foreground};`}
`;

export const Title = styled(Text)`
  text-align: center;
  font-size: 16px;
  ${props => props.active && `color: ${props.theme.background};`}
`;
