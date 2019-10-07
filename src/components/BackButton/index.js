import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const BackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="ios-arrow-back" size={30} />
  </TouchableOpacity>
);

export default withNavigation(BackButton);
