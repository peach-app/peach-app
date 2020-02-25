import styled from 'styled-components/native';
import { Text } from '../Text';

export const Title = styled(Text)`
  font-size: 38px;
  font-family: ${props => props.theme.fontFamily.bold};
  ${({ isCentered }) => isCentered && `text-align: center;`}
`;
