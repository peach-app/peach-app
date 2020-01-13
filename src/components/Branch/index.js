import React from 'react';
import PropTypes from 'prop-types';

export const Branch = ({ test, left, right }) => {
  if (test) {
    return <>{left}</>;
  }

  return <>{right}</>;
};

Branch.propTypes = {
  test: PropTypes.bool.isRequired,
  left: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  right: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
