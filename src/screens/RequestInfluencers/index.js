import React, { useState } from 'react';
import set from 'lodash/fp/set';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, StatusBar, Header, SearchInfluencers} from '../../components';
import { ACTION_COMPONENTS, MODAL_TYPES } from '../../consts';
import { RequestedInfluencersWrapper } from './styles';
import RequestedInfluencers from './RequestedInfluencers';
import { formatInfluencersArray } from './helper'; 
import { useModal } from '../../contexts/Modal';


const RequestInfluencers = ({ navigation }) => {

  const { openModal } = useModal();

  const [isLoading, setLoading] = useState(false);

  const [requestedInfluencers, setRequestedInfluencers] = useState([]);
  console.log("REQUESTED", requestedInfluencers);
  const hasRequestedInfluencers = requestedInfluencers.length > 0;
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Request Influencers" rightActionLabel={hasRequestedInfluencers && "Finish"} onRightActionPressed={() =>
          openModal({
            type: MODAL_TYPES.CONFIRM_REQUEST_INFLUENCERS,
            props: {
             shouldCloseOnBackdropClick: true,
             requestedInfluencers
            }
          })
        } />
        <StatusBar />
        {
          requestedInfluencers &&
          <RequestedInfluencers requestedInfluencers={requestedInfluencers}/>
        }
          
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
