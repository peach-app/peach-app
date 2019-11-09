import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import Container from '../../components/Container';

export const Composer = styled.View`
  border-color: ${props => props.theme.greyLight};
  border-top-width: 1px;
`;

export const Wrapper = styled(Container)`
  padding-vertical: ${props => props.theme.spacingSmall}px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  max-height: 200px;
  margin-right: ${props => props.theme.spacing}px;
  font-family: futura-book;
  color: ${props => props.theme.foreground};
  padding-vertical: ${props => props.theme.spacingSmall}px;
  ${Platform.select({
    web: `min-height: 100px;`,
  })}
`;

export const Send = styled.TouchableOpacity`
  align-self: ${Platform.select({
    ios: 'flex-end',
    android: 'flex-end',
    web: 'flex-start',
  })};
`;

export const Icon = styled(Ionicons).attrs({
  size: 30,
  name: 'ios-send',
})`
  color: ${props => props.theme.brand};
`;
