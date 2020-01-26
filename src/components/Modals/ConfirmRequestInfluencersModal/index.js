import React from 'react';
import get from 'lodash/fp/get';
import styled from 'styled-components';
import { Title, SubTitle, Modal, Icon, Grid, Button, Avatar, Actions } from '../../'


export default ({onClose, requestedInfluencers, }) => 
      <Modal isOpen onClose={onClose} shouldCloseOnBackdropClick>
        <Grid justify="center" align="center">
          
          <Grid.Item size={12}>
            <Title isCentered>Great choice!</Title>
          </Grid.Item>
          <Grid.Item size={12}>
            <SubTitle isCentered>
              You are about to request the following influencers:
            </SubTitle>
          </Grid.Item>
          <Grid.Item size={12}>
<Avatar.List>
{requestedInfluencers.map(influencer => <Avatar size={60} fallback={influencer.name} source={{uri : get('avatar.url', influencer)}} />)}
</Avatar.List> 
</Grid.Item>
          <Grid.Item size={12}>
          <Actions>
                  <Button
                      onPress={() => console.log('h')}
                    title="Request"
                    fixedWidth
                  />
                  </Actions>
              </Grid.Item>
        </Grid>
      </Modal>;
  