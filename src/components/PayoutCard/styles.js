import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../Text';

export const Status = styled(Text)`
  color: ${props =>
    props.color ? props.theme[props.color] : props.theme.foreground};
  ${({ isRefund }) => isRefund && `font-size: 12px;`}
  ${({ isAmount }) => isAmount && `font-size: 18px;`}
`;
export const StatusWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Ionicons).attrs({ size: 35 })`
  color: ${props =>
    props.color ? props.theme[props.color] : props.theme.foreground};
`;
