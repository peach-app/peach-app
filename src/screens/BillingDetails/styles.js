import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const AddIcon = styled(Ionicons).attrs(props => ({
  size: 30,
  name: 'ios-add-circle',
  color: props.theme.foreground,
}))`
  align-self: center;
`;
