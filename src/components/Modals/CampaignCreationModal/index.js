import React, { useEffect } from 'react';
import styled from 'styled-components/native';

import { Grid, Title, SubTitle, Modal, Icon } from 'components';

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
        <Grid.Item size={12}>
          <IconWrapper>
            <Icon size={100} name="ios-checkmark" />
          </IconWrapper>
        </Grid.Item>
        <Grid.Item size={12}>
          <Title isCentered>Campaign created successfully!</Title>
        </Grid.Item>
        <Grid.Item size={12}>
          <SubTitle isCentered>
            All influencers on our platform will be able to discover and apply
            for your campaign
          </SubTitle>
        </Grid.Item>
      </Grid>
    </Modal>
  );
};
