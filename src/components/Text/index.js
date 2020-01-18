import styled from 'styled-components/native';
import PropTypes from 'prop-types';

export const Text = styled.Text`
  font-family: futura-book;
  color: ${props => props.theme.foreground};
  ${props => props.isCenter && `text-align: center;`}
  ${props => props.isPara && `line-height: 22px;`}
`;

Text.defaultProps = {
  isCenter: false,
  isPara: false,
};

Text.propTypes = {
  isCenter: PropTypes.bool,
  isPara: PropTypes.bool,
};
