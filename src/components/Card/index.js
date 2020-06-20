import styled from 'styled-components/native';
import PropTypes from 'prop-types';

export const Card = styled.View`
  border-radius: ${props => props.theme.radius};
  border-width: 1px;
  border-color: ${props =>
    props.isSelected ? props.theme.brand : props.theme.greyLight};
  background: ${props => props.theme.background};
  padding: ${props => props.theme.spacing}px;
  flex-grow: 1;
`;

Card.defaultProps = {
  isSelected: false,
};

Card.propTypes = {
  isSelected: PropTypes.bool,
};
