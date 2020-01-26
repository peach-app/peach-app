import styled from 'styled-components/native';
import PropTypes from 'prop-types';

export const Grid = styled.View`
  flex-direction: row;
  margin: ${props => `-${props.theme.spacing}px -${props.theme.spacing}px 0 0`};
  ${props => !props.noWrap && `flex-wrap: wrap;`}
  ${props => props.align && `align-items: ${props.align};`}
  ${props => props.justify && `justify-content: ${props.justify};`}
`;

Grid.defaultProps = {
  align: null,
  justify: null,
  noWrap: false,
};

Grid.propTypes = {
  align: PropTypes.string,
  justify: PropTypes.string,
  noWrap: PropTypes.bool,
};

const GridItem = styled.View`
  ${props => {
    if (props.width) {
      return `width: ${props.width}px`;
    }

    if (props.flex) {
      return `flex: ${props.flex};`;
    }

    if (props.size) {
      return `width: ${100 * (props.size / 12)}%;`;
    }

    return null;
  }}
  padding: ${props => `${props.theme.spacing}px ${props.theme.spacing}px 0 0`};

`;

GridItem.defaultProps = {
  width: null,
  flex: null,
  size: null,
};

GridItem.propTypes = {
  width: PropTypes.number,
  flex: PropTypes.number,
  size: PropTypes.number,
};

Grid.Item = GridItem;
