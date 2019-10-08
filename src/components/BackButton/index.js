import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import { Main } from './styles';

const BackButton = ({ navigation }) => (
  <Main onPress={() => navigation.goBack()}>
    <Ionicons name="ios-arrow-back" size={30} />
  </Main>
);

export default withNavigation(BackButton);
