import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from 'components';

export const AddRemoveAction = ({ isActioned }) => (
  <Grid.Item width={50}>
    <IconButton
      name={
        isActioned ? 'ios-checkmark-circle-outline' : 'ios-add-circle-outline'
      }
      size={32}
    />
  </Grid.Item>
);

AddRemoveAction.propTypes = {
  isActioned: PropTypes.bool.isRequired,
};
