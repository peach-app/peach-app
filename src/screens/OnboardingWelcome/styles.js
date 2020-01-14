import styled from 'styled-components/native';
import { SafeAreaView } from '../../components';

export const Main = styled(SafeAreaView)`
  background-color: ${props => props.theme.brandSecondary};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding-horizontal: ${props => props.theme.spacing}px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 200px;
  resize-mode: contain;
`;
