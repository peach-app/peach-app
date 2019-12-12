import styled from 'styled-components/native';

import Text from "../Text";

const Title = styled(Text)`
  font-size: 36px;
  font-family: futura-bold;
  ${({ isCentered }) => isCentered && `text-align: center;`}
`;

export default Title;
