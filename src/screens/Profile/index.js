import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';

import { USER_TYPE } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import Text from '../../components/Text';
import { Grid, GridItem } from '../../components/Grid';
import Actions from '../../components/Actions';
import Button from '../../components/Button';
import { useUser } from '../../contexts/User';

import GET_USER from './graphql/get-user';

const Profile = ({ navigation }) => {
  const { user } = useUser();
  const id = navigation.getParam('id');
  const { data } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  const name = get('findUserByID.name', data);
  const bio = get('findUserByID.bio', data);
  const isBrand = get('user.type', user) === USER_TYPE.BRAND;

  return (
    <SafeAreaView>
      <Header title={startCase(name)} />
      <ScrollView>
        <Container>
          <Grid>
            <GridItem size={12}>
              <ProfileHeader {...get('findUserByID', data)} />
            </GridItem>

            {bio && (
              <GridItem size={12}>
                <Text isCenter>{bio}</Text>
              </GridItem>
            )}

            {isBrand && (
              <GridItem size={12}>
                <Actions>
                  <Button title="Request work" fixedWidth />
                </Actions>
              </GridItem>
            )}
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
