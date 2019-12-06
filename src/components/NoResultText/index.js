import styled from 'styled-components/native';

import Text from '../../components/Text';

const NoResultText = styled(Text).attrs({
  isCenter: true,
})`
  margin-vertical: ${props => props.theme.spacing}px;
`;

export default NoResultText;