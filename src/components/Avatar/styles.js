import styled from 'styled-components/native';
import Title from '../../components/Title';

export const Main = styled.View`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 400px;
  background: ${props => props.theme.brand};
  overflow: hidden;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Initial = styled(Title)`
  color: ${props => props.theme.white};
  margin: auto;
`;
