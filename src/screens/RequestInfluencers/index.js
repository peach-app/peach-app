import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import SearchInfluencers from '../../components/SearchInfluencers';
import RequestedInfluencers from './RequestedInfluencers';

const RequestInfluencers = ({ navigation }) => {
  const [requestedInfluencers, setRequestedInfluencers] = useState([]);
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Request Influencers" />
        <StatusBar />

        <SearchInfluencers
          isActionable
          onActionPressed={res => console.log(res)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RequestInfluencers;
