import React from 'react';
import PropTypes from 'prop-types';
import { Platform, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Main, List, Logo, Item } from './styles';
import { Container } from '../Container';
import { useTheme } from '../../theme-provider';

const iconNames = {
  Campaigns: 'ios-list',
  Discover: 'ios-search',
  Inbox: 'ios-paper-plane',
  Account: 'ios-contact',
};

export const Navigation = ({ state, navigation }) => {
  const theme = useTheme();

  return (
    <Main>
      <SafeAreaView>
        <Container>
          <List>
            {Platform.OS === 'web' && <Logo />}
            {state.routes.map((route, index) => {
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

Navigation.propTypes = {
  state: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
