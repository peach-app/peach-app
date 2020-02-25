import styled from 'styled-components/native';
import { Text } from '../Text';

export const SubTitle = styled(Text)`
  font-size: 20px;
  font-family: ${props => props.theme.fontFamily.bold};
  ${({ isCentered }) => isCentered && `text-align: center;`}
  color: ${({ theme }) => theme.greyDark};
`;
