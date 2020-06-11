import styled from 'styled-components/native';
import { Text } from '../Text';

export const Touchable = styled.TouchableOpacity`
  background: ${props => props.theme.background};
  border-radius: ${props => props.theme.radius}px;
  flex-grow: 1;
`;

export const Head = styled.View`
  padding-bottom: ${props => props.theme.spacingSmall}px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.greyLight};
  padding: ${props => props.theme.spacing}px;
  align-items: center;
`;

export const Main = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing}px;
  flex-grow: 1;
`;

export const Name = styled(Text)`
  font-family: ${props => props.theme.fontFamily.bold};
`;

export const Bio = styled(Text)`
  color: ${props => props.theme.greyDark};
  margin-top: ${props => props.theme.spacingXSmall}px;
`;
