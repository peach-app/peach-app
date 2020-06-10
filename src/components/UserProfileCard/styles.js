import styled from 'styled-components/native';
import { Text } from '../Text';

export const Touchable = styled.TouchableOpacity`
  overflow: hidden;
  border-radius: ${props => props.theme.radius}px;
  align-items: center;
  padding: ${props => props.theme.spacing}px;
  border-width: 1px;
  border-bottom-width: 2px;
  border-color: ${props => props.theme.greyLight};
  flex-grow: 1;
  justify-content: center;
`;

export const Head = styled.View`
  padding-bottom: ${props => props.theme.spacingSmall}px;
`;

export const Bio = styled(Text)`
  color: ${props => props.theme.greyDark};
`;
