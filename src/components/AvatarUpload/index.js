import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@apollo/react-hooks';
import { Alert, ActivityIndicator } from 'react-native';

import { CLOUDINARY_PRESET, CLOUDINARY_UPLOAD_URL } from 'consts';

import { Main, Icon } from './styles';
import UPDATE_USER_AVATAR from './graphql/update-avatar';

export const AvatarUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [updateUserAvatar, { loading }] = useMutation(UPDATE_USER_AVATAR, {
    refetchQueries: ['getUser'],
  });

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'In order to upload your avatar, we need permission to access your photo library.',
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
      allowsEditing: true,
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
      updateUserAvatar({
        variables: {
          url: secure_url,
        },
      });
    }
  };

  if (uploading || loading) {
    return (
      <Main>
        <ActivityIndicator color="white" />
      </Main>
    );
  }

  return (
    <Main onPress={handleImageUpload}>
      <Icon />
    </Main>
  );
};
