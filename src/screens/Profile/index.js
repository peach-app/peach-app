import React from 'react';
import styled from 'styled-components';
import { ScrollView, Dimensions } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';
import { useRoute, useNavigation } from '@react-navigation/native';

import omit from 'lodash/omit';
import {
  SafeAreaView,
  Header,
  Text,
  Grid,
  Button,
  Foot,
  SocialAccounts,
  Title,
  Intro,
  ProgressiveImage,
  Loading,
} from 'components';
import { useUser } from 'contexts/User';
import { useModal } from 'contexts/Modal';

import { USER_TYPE, MODAL_TYPES } from 'consts';
import GET_USER from './graphql/get-user';

const LoaderWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  padding-top: ${Dimensions.get('window').height / 2};
  padding-horizontal: ${props => props.theme.spacing}px;
  width: 900px;
  max-width: 100%;
  align-self: center;
`;

const ThemeProvider = styled.View`
  background-color: ${props => props.theme.background};
  ${({ isFoot }) => !isFoot && `flex: 1;`}
`;

export const Profile = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  const {
    params: { id },
  } = useRoute();

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });
  const name = get('findUserByID.name', data);
  const bio = get('findUserByID.bio', data);
  const isBrand = get('user.type', user) === USER_TYPE.BRAND;
  const socialAccounts = get('findUserByID.socialAccounts', data);
  const uri = get('findUserByID.avatar.url', data);
  const { openModal } = useModal();

  const renderMain = () => {
    if (loading) {
      return (
        <LoaderWrapper>
          <Loading />
        </LoaderWrapper>
      );
    }
    return (
      <>
        <ScrollView>
          <ProgressiveImage
            source={{
              uri,
            }}
            resizeMode="cover"
            fallback={name}
          />
          <Intro />
          <Header isBorderless />
          <Container>
            <Grid>
              {socialAccounts && (
                <Grid.Item size={12}>
                  <SocialAccounts
                    socialAccounts={omit(socialAccounts, ['__typename'])}
                    onSocialAccountPressed={uri =>
                      openModal({
                        type: MODAL_TYPES.SOCIAL_ACCOUNT_WEB_VIEW,
                        props: {
                          uri,
                        },
                      })
                    }
                  />
                </Grid.Item>
              )}
              <Grid.Item size={12}>
                <Title>{name}</Title>
              </Grid.Item>

              <Grid.Item size={12}>
                <Text isCenter>{bio || 'The bio is provided yet.'}</Text>
              </Grid.Item>
            </Grid>
          </Container>
        </ScrollView>
        {isBrand && (
          <ThemeProvider isFoot>
            <Foot withoutSafeArea>
              <Button
                title="Request work"
                fixedWidth
                onPress={() => {
                  navigation.navigate('RequestInfluencerToCampaigns', {
                    influencerId: id,
                  });
                }}
              />
            </Foot>
          </ThemeProvider>
        )}
      </>
    );
  };

  return (
    <>
      {uri ? (
        <ThemeProvider>{renderMain()}</ThemeProvider>
      ) : (
        <SafeAreaView>{renderMain()}</SafeAreaView>
      )}
    </>
  );
};
