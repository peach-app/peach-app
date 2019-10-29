import styled from 'styled-components/native';
import Title from '../../components/Title';

export const Main = styled.View`
  border-bottom-width: 1px;
  padding: ${props => props.theme.spacing}px;
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

export const MainTitle = styled(Title)`
  text-align: center;
  font-size: 18px;
`;
