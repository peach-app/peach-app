import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@apollo/react-hooks';
import { Alert } from 'react-native';
import { Main, Copy, Icon } from './styles';
import UPDATE_USER_AVATAR from './graphql/update-avatar';
import { Loading } from '../Loading';

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/peach-app/image/upload';

const CLOUDINARY_PRESET = 'u4mzj2ke';

export const AvatarUpload = () => {
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

      await fetch(CLOUDINARY_UPLOAD_URL, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(async res => {
          const resFormatted = await res.json();

          if (resFormatted.url) {
            updateUserAvatar({
              variables: {
                url: resFormatted.url,
              },
            });
          }
        })
        .catch(err => console.log(err));
    }
  };

  if (loading) {
    return (
      <Main>
        <Loading />
      </Main>
    );
  }
  return (
    <Main onPress={handleImageUpload}>
      <Icon />
      <Copy>Upload avatar</Copy>
    </Main>
  );
};
