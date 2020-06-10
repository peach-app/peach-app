import React from 'react';
import PropTypes from 'prop-types';
import { Alert, ActivityIndicator } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import { SkeletonRect } from 'components';

import { Main, Media, Icon } from './styles';
import DELETE_WORK_SAMPLE from './graphql/delete-work-sample';

export const WorkSampleMedia = ({ isLoading, media, _id }) => {
  const [deleteSample, { loading }] = useMutation(DELETE_WORK_SAMPLE, {
    refetchQueries: ['getWorkSamples'],
    awaitRefetchQueries: true,
    variables: {
      id: _id,
    },
  });

  const handleDelete = () => {
    Alert.alert(
      'Delete Work Sample',
      'Are you sure you want to delete this sample?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, I am',
          onPress: () => {
            deleteSample();
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (isLoading) {
    return <SkeletonRect height={100} isLoading />;
  }

  return (
    <Main onPress={handleDelete}>
      <Media source={{ uri: media.url }} />
      {loading ? <ActivityIndicator color="white" /> : <Icon />}
    </Main>
  );
};

WorkSampleMedia.defaultProps = {
  isLoading: false,
  _id: null,
  media: null,
};

WorkSampleMedia.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
  media: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};
