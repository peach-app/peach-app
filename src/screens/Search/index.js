import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, Header, SearchInfluencers } from 'components';

const Search = () => (
  <SafeAreaView>
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Header title="Search" />
      <SearchInfluencers />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default Search;
