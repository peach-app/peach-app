import React from 'react';
import { useNavigation } from '@react-navigation/native';
import get from 'lodash/fp/get';

import {
  SafeAreaView,
  StatusBar,
  Title,
  Text,
  Container,
  Grid,
  Button,
} from 'components';
import { useUser } from 'contexts/User';
import { USER_TYPE } from 'consts';

import { Content, Image } from './styles';
import OnboardingBanner from '../../assets/onboarding.png';

export const Welcome = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const userType = get('user.type', user);
  const isBrand = userType === USER_TYPE.BRAND;

  return (
    <SafeAreaView>
      <StatusBar />

      <Content>
        <Container>
          <Grid>
            <Grid.Item size={12}>
              <Title>Welcome!</Title>
            </Grid.Item>
            <Grid.Item size={12}>
              <Text isPara>
                {
                  'Thank you for signing up to use Peach. \nWe just need a few more details from you to get started.'
                }
              </Text>
            </Grid.Item>
            <Grid.Item size={12}>
              <Button
                onPress={() =>
                  navigation.navigate(
                    isBrand ? 'PersonalDetails' : 'SocialDetails'
                  )
                }
                title="Begin"
                fixedWidth
              />
            </Grid.Item>
          </Grid>
        </Container>
      </Content>

      <Image source={OnboardingBanner} />
    </SafeAreaView>
  );
};
