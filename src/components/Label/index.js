import styled from 'styled-components/native';
import Text from '../Text';

export default styled(Text)`
  margin-vertical: ${props => props.theme.spacingSmall}px;
  color: ${props => (props.error ? props.theme.error : props.theme.black)};
`;
