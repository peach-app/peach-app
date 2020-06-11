import styled from 'styled-components/native';
import { Text } from '../Text';

export const Touchable = styled.TouchableOpacity`
  background: ${props => props.theme.background};
  border-radius: ${props => props.theme.radius}px;
  align-items: center;
  padding: ${props => props.theme.spacing}px;
  border-width: 1px;
  border-color: ${props => props.theme.greyLight};
  flex-grow: 1;
  justify-content: center;
`;

export const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: ${props => props.theme.greyLight};
`;

export const Head = styled.View`
  padding-bottom: ${props => props.theme.spacingSmall}px;
`;

export const Name = styled(Text)`
  font-family: ${props => props.theme.fontFamily.bold};
`;

export const Bio = styled(Text)`
  color: ${props => props.theme.greyDark};
`;
