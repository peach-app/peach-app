import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import debounce from 'lodash/debounce';
import { NETWORK_STATUS } from '../../consts';
import {
  SafeAreaView,
  Header,
} from '../../components';


const Search = () =>   <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Search" />
        <SearchInfluencers />
      </KeyboardAvoidingView>
    </SafeAreaView>
  

export default Search;
