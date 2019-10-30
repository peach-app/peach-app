import styled from 'styled-components/native';
import Text from '../../components/Text';

export const Main = styled.View`
  border-bottom-width: 1px;
  padding-horizontal: 55px;
  height: 55px;
  justify-content: center;
  border-color: ${props => props.theme.grey};
`;

export const Action = styled.View`
  position: absolute;
  top: 0;
  left: ${props => props.theme.spacing}px;
  bottom: 0;
  z-index: 2;
  justify-content: center;
`;

export const MainTitle = styled(Text)`
  text-align: center;
  font-size: 16px;
`;
