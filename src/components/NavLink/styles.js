import styled from 'styled-components';

import Text from '../../components/Text';

export const Main = styled.TouchableOpacity`
  border-top-width: 1px;
  border-color: ${props => props.theme.grey};
  min-height: 40px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: 16px;
`;
