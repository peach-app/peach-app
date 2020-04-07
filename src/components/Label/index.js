import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Text } from '../Text';

export const Label = styled(Text)`
  margin-vertical: ${props => props.theme.spacingSmall}px;
  color: ${props =>
    props.isError ? props.theme.error : props.theme.foreground};
  font-family: ${props => props.theme.fontFamily.bold};
`;

Label.defaultProps = {
  isError: false,
};

Label.propTypes = {
  isError: PropTypes.bool,
};
