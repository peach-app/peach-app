import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import { Main, Icon } from './styles';

export const BackButton = ({ hasCircle }) => {
  const navigation = useNavigation();

  return (
    <Main onPress={() => navigation.goBack()}>
      <Icon name={hasCircle ? 'ios-arrow-dropleft-circle' : 'ios-arrow-back'} />
    </Main>
  );
};

BackButton.defaultProps = {
  hasCircle: false,
};

BackButton.propTypes = {
  hasCircle: PropTypes.bool,
};
