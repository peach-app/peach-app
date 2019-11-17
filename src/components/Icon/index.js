import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

export default styled(Ionicons).attrs(props => ({
  color: props.theme.brand,
}))``;
