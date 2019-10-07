import React from 'react';

import { Main, Item, Title } from './styles';

const Tabs = ({ activeTabIndex, onTabPress, tabs }) => (
  <Main>
    {tabs.map((title, index) => (
      <Item
        key={index}
        active={activeTabIndex === index}
        onPress={() => onTabPress(index)}
      >
        <Title active={activeTabIndex === index}>{title}</Title>
      </Item>
    ))}
  </Main>
);

export default Tabs;
