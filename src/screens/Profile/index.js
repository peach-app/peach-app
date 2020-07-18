import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
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
  Pill,
  Grid,
  ScrollView,
} from 'components';
import { useModal } from 'contexts/Modal';
import { useUser } from 'contexts/User';
import { USER_TYPE, MODAL_TYPES } from 'consts';

import { Head, Section, Categories, WorkSamples, Media } from './styles';
import GET_USER from './graphql/get-user';

export const Profile = () => {
  const navigation = useNavigation();
  const { isBrand } = useUser();

  const {
    params: { id },
  } = useRoute();

  const { data, loading } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });

  const isViewingBrand = get('findUserByID.type', data) === USER_TYPE.BRAND;
  const name = get('findUserByID.name', data);
  const bio = get('findUserByID.bio', data);
  const uri = get('findUserByID.avatar.url', data);
  const workSamples = getOr([], 'findUserByID.workSamples', data);
  const categories = getOr([], 'findUserByID.categories', data);
  const { openModal } = useModal();

  return (
    <SafeAreaView>
      <Header title={name} />

      <ScrollView>
        <Head>
          <Container>
            <Grid justify="center">
              <Grid.Item>
                <Avatar
                  size={125}
                  source={{
                    uri,
                  }}
                  isLoading={loading}
                  fallback={name}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <Text isCenter>
                  <SkeletonText
                    isLoading={loading}
                    loadingText="Biography is loading here..."
                  >
                    {bio || 'Missing biography...'}
                  </SkeletonText>
                </Text>

                {!loading && (
                  <Categories>
                    <Pill.List justify="center">
                      <Pill
                        isSmall
                        value={isViewingBrand ? 'Brand' : 'Influencer'}
                      />
                      {categories.map(category => (
                        <Pill
                          key={category._id}
                          isSmall
                          value={category.name}
                        />
                      ))}
                    </Pill.List>
                  </Categories>
                )}
              </Grid.Item>
            </Grid>
          </Container>

          {get('findUserByID.hasSocialAccounts', data) && (
            <Section>
              <Container>
                <SocialAccounts
                  socialAccounts={omit(
                    get('findUserByID.socialAccounts', data),
                    ['__typename']
                  )}
                  onSocialAccountPressed={uri =>
                    openModal({
                      type: MODAL_TYPES.WEB_VIEW_MODAL,
                      props: {
                        uri,
                      },
                    })
                  }
                />
              </Container>
            </Section>
          )}
        </Head>

        {!isViewingBrand && workSamples.length > 0 && (
          <Container>
            <WorkSamples>
              {workSamples.map(sample => (
                <Media key={sample._id} source={{ uri: sample.media.url }} />
              ))}
            </WorkSamples>
          </Container>
        )}

        {isViewingBrand && <CampaignsByBrand id={id} />}
      </ScrollView>

      {!isViewingBrand && isBrand && (
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
