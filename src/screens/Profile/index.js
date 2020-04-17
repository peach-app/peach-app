import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import omit from 'lodash/omit';
import { useRoute, useNavigation } from '@react-navigation/native';

import {
  Text,
  Grid,
  Button,
  Foot,
  SocialAccounts,
  Title,
  ProgressiveImage,
  CampaignsByBrand,
  Intro,
  Container,
  BackButton,
  SkeletonText,
} from 'components';
import { useModal } from 'contexts/Modal';
import { USER_TYPE, MODAL_TYPES } from 'consts';

import { Main, Top } from './styles';
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
  const socialAccounts = get('findUserByID.socialAccounts', data);
  const uri = get('findUserByID.avatar.url', data);
  const { openModal } = useModal();

  return (
    <Main>
      <Top>
        <Container>
          <Intro />
          <BackButton hasCircle />
        </Container>
      </Top>
      <ScrollView>
        <Grid>
          <Grid.Item size={12}>
            <ProgressiveImage
              source={{
                uri,
              }}
              isLoading={loading}
              fallback={name}
              isBrand={isBrand}
            />
          </Grid.Item>

          <Grid.Item size={12}>
            <Container>
              <Grid>
                {socialAccounts && (
                  <Grid.Item size={12}>
                    <SocialAccounts
                      socialAccounts={omit(socialAccounts, ['__typename'])}
                      onSocialAccountPressed={uri =>
                        openModal({
                          type: MODAL_TYPES.WEB_VIEW_MODAL,
                          props: {
                            uri,
                          },
                        })
                      }
                    />
                  </Grid.Item>
                )}

                <Grid.Item size={12}>
                  <Title isCenter>
                    <SkeletonText isLoading={loading}>{name}</SkeletonText>
                  </Title>
                </Grid.Item>

                <Grid.Item size={12}>
                  <Text isCenter>
                    <SkeletonText
                      isLoading={loading}
                      loadingText="Bio is loading here..."
                    >
                      {bio || `This user doesn't have a bio yet.`}
                    </SkeletonText>
                  </Text>
                </Grid.Item>

                {isBrand && (
                  <Grid.Item size={12}>
                    <CampaignsByBrand id={id} />
                  </Grid.Item>
                )}
              </Grid>
            </Container>
          </Grid.Item>
        </Grid>
      </ScrollView>

      {!isBrand && (
        <SafeAreaView>
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
        </SafeAreaView>
      )}
    </Main>
  );
};
