import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, GridItem } from '../../Grid';
import Title from '../../Title';
import SubTitle from '../../Subtitle';
import Modal from '../../Modal';
import Icon from '../../Icon';

const IconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default ({ onClose, onButtonClick }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      onButtonClick();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal isOpen onClose={onClose}>
      <Grid justify="center" align="center">
        <GridItem size={12}>
          <IconWrapper>
            <Icon size={100} name="ios-checkmark" />
          </IconWrapper>
        </GridItem>
        <GridItem size={12}>
          <Title isCentered>Campaign created successfully!</Title>
        </GridItem>
        <GridItem size={12}>
          <SubTitle isCentered>
            All influencers on our platform will be able to discover and apply
            for your campaign
          </SubTitle>
        </GridItem>
      </Grid>
    </Modal>
  );
};
