import React from 'react';
import { SafeAreaView } from 'react-native';

import { ImageBackground, Main, Content, Actions } from './styles';
import StatusBar from '../../components/StatusBar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { Grid, GridItem } from '../../components/Grid';

const Landing = ({ navigation }) => (
  <ImageBackground>
    <Main>
      <StatusBar />
      <Content>
        <SafeAreaView>
          <Container>
            <Actions>
              <Grid>
                <GridItem size={12}>
                  <Button
                    isDark
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                  />
                </GridItem>
                <GridItem size={12}>
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
