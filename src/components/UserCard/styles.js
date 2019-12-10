import styled from 'styled-components/native';

import Text from '../../components/Text';

export const Bio = styled(Text)`
  color: ${props => props.theme.greyDark};
  margin-top: ${props => props.theme.spacingXSmall}px;
  max-width: 60%;
`;
