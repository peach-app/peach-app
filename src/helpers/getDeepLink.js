import * as Device from 'expo-device';

const PC_HARDWARE = 3;

export default async () => {
  const device = await Device.getDeviceTypeAsync();

  if (device !== PC_HARDWARE) {
    // check if prod:
    // and replace with in expo.scheme file (in app.json) alias
    // peach-app://
    // else local -> replace here
    return 'exp://192.168.1.108:19000';
  }

  // check if prod:
  // https://dashboard.peachapp.io/
  // else local -> replace here
  return 'https://dashboard.peachapp.io/';
};
