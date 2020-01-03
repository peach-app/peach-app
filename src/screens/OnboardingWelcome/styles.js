import styled from 'styled-components/native';
import SafeAreaView from '../../components/SafeAreaView';

export const Main = styled(SafeAreaView)`
  background-color: ${props => props.theme.brandSecondary};
`;

export const Foot = styled.View`
  flex: 1;
`;

export const Image = styled.Image`
  width: 100%;
  resize-mode: contain;
`;
