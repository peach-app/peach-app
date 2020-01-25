import React, { useState } from 'react';
import set from 'lodash/fp/set';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, StatusBar, Header, SearchInfluencers , Grid,  Button} from '../../components';
import { ACTION_COMPONENTS } from '../../consts';
import { RequestedInfluencersWrapper } from './styles';
import RequestedInfluencers from './RequestedInfluencers';
import { formatInfluencersArray } from './helper'; 



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
          <Grid.Item size={12}>
            <Button
              onPress={() => console.log('yy')}
              title="Finish"
              fixedWidth
            />
            </Gird.Item>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RequestInfluencers;
