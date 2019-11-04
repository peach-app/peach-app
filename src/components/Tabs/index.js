import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { Main, Item, TabTitle } from './styles';

const Tabs = ({ activeTabIndex, onTabPress, tabs }) => (
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

export default Tabs;
