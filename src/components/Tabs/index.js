import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';

import { Main, Item, TabTitle } from './styles';

export const Tabs = ({ activeTabIndex, onTabPress, tabs }) => (
  <Main>
    {tabs.map((title, index) => (
      <TouchableWithoutFeedback key={index} onPress={() => onTabPress(index)}>
        <Item active={activeTabIndex === index}>
          <TabTitle active={activeTabIndex === index}>{title}</TabTitle>
        </Item>
      </TouchableWithoutFeedback>
    ))}
  </Main>
);

Tabs.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  onTabPress: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tabs;
