import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import omit from 'lodash/omit';
import { useRoute, useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  Header,
  Text,
  Avatar,
  Button,
  Foot,
  SocialAccounts,
  CampaignsByBrand,
  Container,
  SkeletonText,
  ScrollView,
  Pill,
  Grid,
} from 'components';
import { useModal } from 'contexts/Modal';
import { USER_TYPE, MODAL_TYPES } from 'consts';

import { Head, Section, Categories } from './styles';
import GET_USER from './graphql/get-user';

export const Profile = () => {
  const navigation = useNavigation();

  const {
    params: { id },
  } = useRoute();

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  const isBrand = get('findUserByID.type', data) === USER_TYPE.BRAND;
  const name = get('findUserByID.name', data);
  const bio = get('findUserByID.bio', data);
  const uri = get('findUserByID.avatar.url', data);
  const { openModal } = useModal();

  return (
    <SafeAreaView>
      <Header title={name} />

      <ScrollView>
        <Head>
          <Container>
            <Grid>
              <Grid.Item>
                <Avatar
                  size={80}
                  source={{
                    uri,
                  }}
                  isLoading={loading}
                  fallback={name}
                />
              </Grid.Item>

              <Grid.Item flex={1} alignSelf="center">
                <Text>
                  <SkeletonText
                    isLoading={loading}
                    loadingText="Biography is loading here..."
                  >
                    {bio || 'Missing biography...'}
                  </SkeletonText>
                </Text>

                {!loading && (
                  <Categories>
                    <Pill value={isBrand ? 'Brand' : 'Influencer'} />
                  </Categories>
                )}
              </Grid.Item>
            </Grid>
          </Container>

          {get('findUserByID.hasSocialAccounts', data) && (
            <Section>
              <SocialAccounts
                socialAccounts={omit(get('findUserByID.socialAccounts', data), [
                  '__typename',
                ])}
                onSocialAccountPressed={uri =>
                  openModal({
                    type: MODAL_TYPES.WEB_VIEW_MODAL,
                    props: {
                      uri,
                    },
                  })
                }
              />
            </Section>
          )}
        </Head>

        {isBrand && <CampaignsByBrand id={id} />}
      </ScrollView>

      {!isBrand && (
        <Foot>
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
      )}
    </SafeAreaView>
  );
};
