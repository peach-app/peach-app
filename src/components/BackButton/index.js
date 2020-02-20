import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Main, Icon } from './styles';

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Main onPress={() => navigation.goBack()}>
      <Icon />
    </Main>
  );
};
