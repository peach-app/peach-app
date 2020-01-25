import React, { useState } from 'react';
import set from 'lodash/fp/set';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, StatusBar, Header, SearchInfluencers , Grid,  Button} from '../../components';
import { ACTION_COMPONENTS } from '../../consts';
import { RequestedInfluencersWrapper } from './styles';
import RequestedInfluencers from './RequestedInfluencers';

const formatInfluencersArray = (requestedInfluencers, actionedInfluencer) => {
  console.log(requestedInfluencers, actionedInfluencer);

  if (requestedInfluencers.length > 0) {

    if (requestedInfluencers.find(influencer => influencer._id === actionedInfluencer._id)) {
      return requestedInfluencers.filter(influencer => influencer._id !== actionedInfluencer._id);
    }
    return [...requestedInfluencers, actionedInfluencer];

  }

  console.log(actionedInfluencer);

  return [actionedInfluencer];

};


const RequestInfluencers = ({ navigation }) => {
  const [requestedInfluencers, setRequestedInfluencers] = useState([]);
  console.log("REQUESTED", requestedInfluencers);
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Request Influencers" />
        <StatusBar />
        <RequestedInfluencers requestedInfluencers={requestedInfluencers}/>
        <SearchInfluencers
          onActionPressed={actionedInfluencer => setRequestedInfluencers(formatInfluencersArray(requestedInfluencers, actionedInfluencer))}
          action={ACTION_COMPONENTS.ADD_REMOVE}
          actionedItems={requestedInfluencers}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RequestInfluencers;
