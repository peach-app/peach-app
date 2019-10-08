import React from 'react';
import { withNavigation } from 'react-navigation';

import { Main, Icon } from './styles';

const BackButton = ({ navigation }) => (
  <Main onPress={() => navigation.goBack()}>
    <Icon />
  </Main>
);

export default withNavigation(BackButton);
