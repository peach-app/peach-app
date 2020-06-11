import styled from 'styled-components/native';
import { Text } from '../Text';

export const Touchable = styled.TouchableOpacity`
  background: ${props => props.theme.background};
  border-radius: ${props => props.theme.radius}px;
  align-items: center;
  padding: ${props => props.theme.spacing}px;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-color: ${props => props.theme.foreground};
  shadow-offset: 0px 2px;
  flex-grow: 1;
  justify-content: center;
`;

export const Head = styled.View`
  padding-bottom: ${props => props.theme.spacingSmall}px;
`;

export const Bio = styled(Text)`
  color: ${props => props.theme.greyDark};
`;
