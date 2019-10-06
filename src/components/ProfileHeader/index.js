import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { Main, Center, Name } from './styles';
import Avatar from '../../components/Avatar';
import { Grid, GridItem } from '../../components/Grid';

const ProfileHeader = ({ email }) => (
  <Main>
    <Grid>
      <GridItem>
        <Center>
          <Avatar size={100} />
        </Center>
      </GridItem>
      <GridItem>
        <Name>{email}</Name>
      </GridItem>
    </Grid>
  </Main>
);

ProfileHeader.propTypes = {
  email: PropTypes.string.isRequired,
};

export const ProfileHeaderFragment = gql`
  fragment ProfileHeaderFragment on User {
    email
  }
`;

export default ProfileHeader;
