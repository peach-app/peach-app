import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import { KeyboardAvoidingView } from 'react-native';
import {
  SafeAreaView,
  StatusBar,
  Header,
  SearchInfluencers,
} from '../../components';
import { ACTION_COMPONENTS, MODAL_TYPES } from '../../consts';
import RequestedInfluencers from './RequestedInfluencers';
import { formatInfluencersArray } from './helper';
import { useModal } from '../../contexts/Modal';

const RequestInfluencers = ({ navigation }) => {
  const { openModal } = useModal();

  const campaignId = get('state.params.campaignId', navigation);

  const [requestedInfluencers, setRequestedInfluencers] = useState([]);

  const hasRequestedInfluencers = requestedInfluencers.length > 0;
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header
          title="Request Influencers"
          rightActionLabel={hasRequestedInfluencers && 'Finish'}
          onRightActionPressed={() =>
            openModal({
              type: MODAL_TYPES.CONFIRM_REQUEST_INFLUENCERS,
              props: {
                shouldCloseOnBackdropClick: true,
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

RequestInfluencers.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default RequestInfluencers;
