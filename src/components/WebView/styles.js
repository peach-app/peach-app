import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${props => props.theme.spacingSmall}px
    ${props => props.theme.spacing}px;
`;

export const Main = styled.TouchableOpacity`
  width: ${props => 22 + props.theme.spacingSmall * 2}px;
  padding: ${props => props.theme.spacingSmall}px;
  margin: -${props => props.theme.spacingSmall}px;
  justify-content: center;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.brand,
}))``;
