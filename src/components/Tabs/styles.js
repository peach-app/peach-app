import styled from 'styled-components';

import Text from '../../components/Text';

export const Main = styled.View`
  flex-direction: row;
  background: ${props => props.theme.greyLight};
  border-radius: 200px;
`;

export const Item = styled.TouchableOpacity`
  flex-grow: 1;
  min-height: 40px;
  justify-content: center;
  border-radius: 200px;
  ${props => props.active && `background: ${props.theme.black};`}
`;

export const Title = styled(Text)`
  text-align: center;
  font-size: 14px;
  ${props => props.active && `color: ${props.theme.white};`}
`;
