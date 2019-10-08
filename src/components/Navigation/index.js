import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withTheme } from 'styled-components';

import { Main, List } from './styles';

const iconNames = {
  Campaigns: 'ios-list',
  Discover: 'ios-search',
  Inbox: 'ios-paper-plane',
  Account: 'ios-contact',
};

const Navigation = ({ navigation, onTabPress, theme }) => {
  const { routes } = navigation.state;

  return (
    <Main>
      <SafeAreaView>
        <List>
          {routes.map((route, index) => {
            const isFocused = index === navigation.state.index;

            return (
              <TouchableWithoutFeedback
                key={route.key}
                onPress={() => onTabPress({ route })}
              >
                <Ionicons
                  size={30}
                  name={iconNames[route.key]}
                  color={isFocused ? theme.black : theme.greyDark}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </List>
      </SafeAreaView>
    </Main>
  );
};

export default withTheme(Navigation);
