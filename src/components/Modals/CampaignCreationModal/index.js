import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Title, SubTitle, Modal, Icon, Grid, Actions, Button } from '../../'


const IconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default ({ onClose, onFinish, onRequestInfluencers }) => {

 const onActionTaken = action => {
   //refactor
   // useEffect clean up with onClose does not work for somereason
   // need to investigate
   action();
   onClose();
 }

  return (
    <Modal isOpen onClose={onClose}>
      <Grid justify="center" align="center">
        <Grid.Item size={12}>
          {/* Better icon or SVG here. */}
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
            for your campaign. If you want someone specific you can:
          </SubTitle>
        </Grid.Item>
        <Grid.Item size={12}>
              <Actions>
                <Button
                  fixedWidth
                  title="Request Influencers"
                  onPress={() => onActionTaken(onRequestInfluencers)}
                />
              </Actions>
            </Grid.Item>
            <Grid.Item size={12}>
          <SubTitle isCentered>
            or
          </SubTitle>
        </Grid.Item>
            <Grid.Item size={12}>
              <Actions>
                <Button
                  fixedWidth
                  title="Finish"
                  onPress={() => onActionTaken(onFinish)}
                />
              </Actions>
            </Grid.Item>
      </Grid>
    </Modal>
  );
};
