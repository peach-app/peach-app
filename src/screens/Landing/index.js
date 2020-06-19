import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar, Button, Container, Grid } from 'components';

import { ImageBackground, Main, Content, Actions } from './styles';

export const Landing = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground>
      <Main>
        <StatusBar />
        <Content>
          <SafeAreaView>
            <Container>
              <Actions>
                <Grid>
                  <Grid.Item size={12}>
                    <Button
                      title="Create an account"
                      onPress={() => navigation.navigate('Register')}
                    />
                  </Grid.Item>
                  <Grid.Item size={12}>
                    <Button
                      title="Login"
                      isGhost
                      onPress={() => navigation.navigate('Login')}
                    />
                  </Grid.Item>
                </Grid>
              </Actions>
            </Container>
          </SafeAreaView>
        </Content>
      </Main>
    </ImageBackground>
  );
};
