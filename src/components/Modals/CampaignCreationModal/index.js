import React, { useEffect } from 'react';
import { Grid, GridItem } from '../../Grid';
import Title from '../../Title';
import Modal from '../../Modal';
import Button from '../../Button';
import Icon from '../../Icon';

export default ({ onClose, onButtonClick }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      onButtonClick();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal isOpen onClose={onClose}>
      <Grid justify="center" align="center">
        <GridItem size={12}>
          <Icon size={100} name="ios-checkmark" />
        </GridItem>
        <GridItem size={12}>
          <Title>Campaign created successfully!</Title>
        </GridItem>
      </Grid>
    </Modal>
  );
};
