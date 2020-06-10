import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import { AddNewAction, Loading } from 'components';
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_PRESET } from 'consts';

import ADD_WORK_SAMPLE from './graphql/add-work-sample';

export const AddNewWorkSample = () => {
  const [uploading, setUploading] = useState(false);

  const [addWorkSample, { loading }] = useMutation(ADD_WORK_SAMPLE, {
    refetchQueries: ['getWorkSamples'],
    awaitRefetchQueries: true,
  });

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'In order to upload a work sample, we need permission to access your photo library.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'Try again',
            onPress: () => handleImageUpload(),
          },
        ],
        { cancelable: false }
      );
    }

    const { cancelled, base64 } = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      base64: true,
    });

    if (cancelled) return;

    const file = `data:image/jpg;base64,${base64}`;

    setUploading(true);

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      body: JSON.stringify({
        file,
        upload_preset: CLOUDINARY_PRESET,
      }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    });

    setUploading(false);

    const { secure_url } = await res.json();

    if (secure_url) {
      addWorkSample({
        variables: {
          url: secure_url,
        },
      });
    }
  };

  if (uploading || loading) {
    return <Loading />;
  }

  return <AddNewAction text="Add new sample" onPress={handleImageUpload} />;
};
