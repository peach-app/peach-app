import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { Main, Item, Title } from './styles';

const Tabs = ({ activeTabIndex, onTabPress, tabs }) => (
  <Main>
    {tabs.map((title, index) => (
      <TouchableWithoutFeedback key={index} onPress={() => onTabPress(index)}>
        <Item active={activeTabIndex === index}>
          <Title active={activeTabIndex === index}>{title}</Title>
        </Item>
      </TouchableWithoutFeedback>
    ))}
  </Main>
);

export default Tabs;
