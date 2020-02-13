import React, { useContext } from 'react';
import { Platform, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

import { Main, List, Logo, Item } from './styles';
import { Container } from '../Container';

const iconNames = {
  Campaigns: 'ios-list',
  Discover: 'ios-search',
  Inbox: 'ios-paper-plane',
  Account: 'ios-contact',
};

export const Navigation = ({ state, navigation }) => {
  const theme = useContext(ThemeContext);
  const { routes } = state;

  return (
    <Main>
      <SafeAreaView>
        <Container>
          <List>
            {Platform.OS === 'web' && <Logo />}
            {routes.map((route, index) => {
              const isFocused = index === state.index;

              return (
                <TouchableWithoutFeedback
                  key={route.key}
                  onPress={() => {
                    if (isFocused) return;
                    navigation.navigate(route.name);
                  }}
                >
                  <Item>
                    <Ionicons
                      size={30}
                      name={iconNames[route.name]}
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
