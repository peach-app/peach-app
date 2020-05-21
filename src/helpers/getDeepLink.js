import * as Device from 'expo-device';

const PC_HARDWARE = 3;

export default async () => {
  const device = await Device.getDeviceTypeAsync();

  if (device !== PC_HARDWARE) {
    return 'peach-app://';
  }

  return 'https://dashboard.peachapp.io/';
};
