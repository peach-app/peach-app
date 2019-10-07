import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Main, List } from './styles';

const Navigation = ({ navigation }) => (
  <Main>
    <SafeAreaView>
      <List>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Campaigns')}
        >
          <Ionicons size={30} name="ios-list" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Discover')}
        >
          <Ionicons size={30} name="ios-search" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Inbox')}>
          <Ionicons size={30} name="ios-paper-plane" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Account')}
        >
          <Ionicons size={30} name="ios-contact" />
        </TouchableWithoutFeedback>
      </List>
    </SafeAreaView>
  </Main>
);

export default Navigation;
