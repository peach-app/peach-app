import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@apollo/react-hooks';
import { Alert, ActivityIndicator } from 'react-native';

import { Main, Icon } from './styles';
import UPDATE_USER_AVATAR from './graphql/update-avatar';

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/peach-app/image/upload';

const CLOUDINARY_PRESET = 'u4mzj2ke';

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

    const upload = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!upload.cancelled) {
      const file = `data:image/jpg;base64,${upload.base64}`;

      const data = {
        file,
        upload_preset: CLOUDINARY_PRESET,
      };

      setUploading(true);

      const res = await fetch(CLOUDINARY_UPLOAD_URL, {
        body: JSON.stringify(data),
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
