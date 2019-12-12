import styled from 'styled-components/native';

import Text from '../Text';

const SubTitle = styled(Text)`
  font-size: 20px;
  font-family: futura-bold;
  ${({ isCentered }) => isCentered && `text-align: center;`}
  color: ${({ theme }) => theme.greyDark};
  padding: 15px 0;
`;

export default SubTitle;
