import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ImageBackground, Main, Content, Actions } from './styles';
import { StatusBar, Button, Container, Grid } from '../../components';

const Landing = () => {
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
                      isDark
                      title="Login"
                      onPress={() => navigation.navigate('Login')}
                    />
                  </Grid.Item>
                  <Grid.Item size={12}>
                    <Button
                      isDark
                      title="Create an account"
                      onPress={() => navigation.navigate('Register')}
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

export default Landing;
