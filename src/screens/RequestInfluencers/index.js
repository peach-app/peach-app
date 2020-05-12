import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ACTION_COMPONENTS, MODAL_TYPES } from 'consts';
import {
  SafeAreaView,
  StatusBar,
  Header,
  SearchInfluencers,
  KeyboardAvoidingView,
} from 'components';
import { useModal } from 'contexts/Modal';

import { RequestedInfluencers } from './components';
import { formatInfluencersArray } from './helper';

export const RequestInfluencers = () => {
  const navigation = useNavigation();
  const {
    params: { campaignId },
  } = useRoute();
  const { openModal } = useModal();

  const [requestedInfluencers, setRequestedInfluencers] = useState([]);

  const hasRequestedInfluencers = requestedInfluencers.length > 0;

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Header
          title="Request Influencers"
          rightActionLabel={hasRequestedInfluencers && 'Finish'}
          onRightActionPressed={() =>
            openModal({
              type: MODAL_TYPES.CONFIRM_REQUEST_INFLUENCERS,
              props: {
                requestedInfluencers,
                campaignId,
                navigation,
              },
            })
          }
        />
        <StatusBar />

        {requestedInfluencers.length > 0 && (
          <RequestedInfluencers requestedInfluencers={requestedInfluencers} />
        )}

        <SearchInfluencers
          onActionPressed={actionedInfluencer =>
            setRequestedInfluencers(
              formatInfluencersArray(requestedInfluencers, actionedInfluencer)
            )
          }
          action={ACTION_COMPONENTS.ADD_REMOVE}
          actionedItems={requestedInfluencers}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
