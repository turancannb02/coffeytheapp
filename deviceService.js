import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

const createUserDocument = async (uid, userData) => {
  try {
    const userNumber = await getNextUserNumber(); // Function to get the next incremental number
    const os = Platform.OS; // e.g., 'ios' or 'android'
    const appVersion = DeviceInfo.getVersion(); // e.g., '1.0.0'
    const osVersion = DeviceInfo.getSystemVersion(); // e.g., '14.4'

    // Combine user data with device info
    const userDocumentData = {
      ...userData,
      userId: uid,
      userNumber: userNumber,
      os: os,
      appVersion: appVersion,
      osVersion: osVersion,
    };

    await firestore().collection('test-users').doc(uid).set(userDocumentData);

    console.log(`User document created with userNumber: ${userNumber}`);
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};
