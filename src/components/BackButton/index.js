import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { Main, Icon } from './styles';

const BackButton = ({ navigation }) => (
  <Main onPress={() => navigation.goBack()}>
    <Icon />
  </Main>
);

BackButton.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(BackButton);
