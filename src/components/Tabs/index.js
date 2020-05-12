import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { Badge } from '../Badge';

import { Main, Item, TabTitle, BadgeWrapper } from './styles';

export const Tabs = ({ activeTabIndex, onTabPress, tabs }) => (
  <Main>
    {tabs.map((tab, index) => (
      <TouchableWithoutFeedback key={index} onPress={() => onTabPress(index)}>
        <Item active={activeTabIndex === index}>
          {tab.count > 0 && (
            <BadgeWrapper>
              <Badge count={tab.count} />
            </BadgeWrapper>
          )}
          <TabTitle active={activeTabIndex === index}>
            {typeof tab === 'string' ? tab : tab.title}
          </TabTitle>
        </Item>
      </TouchableWithoutFeedback>
    ))}
  </Main>
);

Tabs.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  onTabPress: PropTypes.func.isRequired,
  tabs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        count: PropTypes.number,
        title: PropTypes.string,
      })
    ),
  ]).isRequired,
};
