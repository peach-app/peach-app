import styled from 'styled-components/native';
import PropTypes from 'prop-types';

export const Text = styled.Text`
  font-family: ${props => props.theme.fontFamily.regular};
  color: ${props => props.theme.foreground};
  ${props => props.isCenter && `text-align: center;`}
  ${props => props.isPara && `line-height: 22px;`}
  ${props =>
    props.isUnderlined &&
    `text-decoration: underline; text-decoration-color: ${props.theme.white}`}
`;

Text.defaultProps = {
  isCenter: false,
  isPara: false,
  isUnderlined: false,
};

Text.propTypes = {
  isCenter: PropTypes.bool,
  isPara: PropTypes.bool,
  isUnderlined: PropTypes.bool,
};
