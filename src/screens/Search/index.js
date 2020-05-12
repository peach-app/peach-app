import React from 'react';
import {
  SafeAreaView,
  Header,
  SearchInfluencers,
  KeyboardAvoidingView,
} from 'components';

export const Search = () => (
  <SafeAreaView>
    <KeyboardAvoidingView>
      <Header title="Search" />
      <SearchInfluencers />
    </KeyboardAvoidingView>
  </SafeAreaView>
);
