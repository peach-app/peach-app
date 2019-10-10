import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withTheme } from 'styled-components/native';

import { Main, List, Item } from './styles';
import Container from '../../components/Container';

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
        <Container>
          <List>
            {routes.map((route, index) => {
              const isFocused = index === navigation.state.index;

              return (
                <TouchableWithoutFeedback
                  key={route.key}
                  onPress={() => onTabPress({ route })}
                >
                  <Item>
                    <Ionicons
                      size={30}
                      name={iconNames[route.key]}
                      color={isFocused ? theme.foreground : theme.greyDark}
                    />
                  </Item>
                </TouchableWithoutFeedback>
              );
            })}
          </List>
        </Container>
      </SafeAreaView>
    </Main>
  );
};

export default withTheme(Navigation);
