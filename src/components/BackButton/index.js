import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { Main, Icon } from './styles';

export const BackButtonMain = ({ navigation }) => (
  <Main onPress={() => navigation.goBack()}>
    <Icon />
  </Main>
);

BackButtonMain.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(BackButtonMain);
export const BackButton = withNavigation(BackButtonMain);
