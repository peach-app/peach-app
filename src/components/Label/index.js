import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Text } from '../Text';

export const Label = styled(Text)`
  ${props =>
    !props.withoutVerticalMargin &&
    `margin-vertical: ${props.theme.spacingSmall}px`};
  color: ${props =>
    props.isError ? props.theme.error : props.theme.foreground};
`;

Label.defaultProps = {
  isError: false,
};

Label.propTypes = {
  isError: PropTypes.bool,
};
