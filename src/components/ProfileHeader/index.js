import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';

import { Main, Center, Name } from './styles';
import Avatar from '../../components/Avatar';
import { Grid, GridItem } from '../../components/Grid';
import { SkeletonText } from '../../components/Skeletons';

const ProfileHeader = ({ name, avatar, isLoading }) => (
  <Main>
    <Grid>
      <GridItem>
        <Center>
          <Avatar
            isLoading={isLoading}
            size={100}
            source={{
              uri: get('url', avatar),
            }}
          />
        </Center>
      </GridItem>
      <GridItem>
        <Name>
          <SkeletonText isLoading={isLoading}>{name}</SkeletonText>
        </Name>
      </GridItem>
    </Grid>
  </Main>
);

ProfileHeader.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export const ProfileHeaderFragment = gql`
  fragment ProfileHeaderFragment on User {
    name
    avatar {
      url
    }
  }
`;

export default ProfileHeader;
