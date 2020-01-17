import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import SearchInfluencers from '../../components/SearchInfluencers';

const Search = () => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Search" />
        <SearchInfluencers />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Search;
