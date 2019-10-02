import React from 'react';
import { SafeAreaView } from 'react-native';

import { Main, Content, Actions } from './styles';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { Grid, GridItem } from '../../components/Grid';

const Landing = ({ navigation }) => (
  <Main>
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
);

export default Landing;
