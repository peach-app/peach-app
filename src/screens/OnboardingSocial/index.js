import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, KeyboardAvoidingView } from 'react-native';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Container,
  Grid,
  Actions,
  Button,
  Intro,
  TextInput,
} from '../../components';

const OnboardingSocial = ({ navigation }) => (
  <SafeAreaView>
    <StatusBar />
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Header title="Social Accounts" />
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            <Grid.Item size={12}>
              <TextInput label="Instagram (URL or Username)" />
            </Grid.Item>
            <Grid.Item size={12}>
              <TextInput label="Twitter (URL or Username)" />
            </Grid.Item>
            <Grid.Item size={12}>
              <TextInput label="Facebook (Page URL)" />
            </Grid.Item>
            <Grid.Item size={12}>
              <TextInput label="YouTube (Channel URL or Name)" />
            </Grid.Item>
            <Grid.Item size={12}>
              <TextInput label="TickTok (Username)" />
            </Grid.Item>
            <Grid.Item size={12}>
              <Actions>
                <Button
                  title="Skip"
                  fixedWidth
                  onPress={() => navigation.navigate('Complete')}
                />
              </Actions>
            </Grid.Item>
          </Grid>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

OnboardingSocial.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OnboardingSocial;
