import React from 'react';
import { SafeAreaView, ImageBackground } from 'react-native';

import { Main, Content, Actions } from './styles';
import StatusBar from '../../components/StatusBar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { Grid, GridItem } from '../../components/Grid';
import splash from '../../assets/splash.png';

const Landing = ({ navigation }) => (
  <ImageBackground resizeMode="contain" source={splash} style={{ flex: 1 }}>
    <Main>
      <StatusBar />
      <Content>
        <SafeAreaView>
          <Container>
            <Actions>
              <Grid>
                <GridItem>
                  <Button
                    isDark
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                  />
                </GridItem>
                <GridItem>
                  <Button
                    isDark
                    title="Create an account"
                    onPress={() => navigation.navigate('Register')}
                  />
                </GridItem>
              </Grid>
            </Actions>
          </Container>
        </SafeAreaView>
      </Content>
    </Main>
  </ImageBackground>
);

export default Landing;
