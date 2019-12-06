import styled from 'styled-components/native';

import Text from '../../components/Text';

const Title = styled(Text)`
  font-size: ${props => (props.isSmall ? 20 : 36)}px;
  font-family: futura-bold;
`;

export default Title;
