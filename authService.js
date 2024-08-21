// New features added for auto sign-in functionality

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getDeviceDetails, setDeviceDetails } from './deviceService';
import { saveUserData, getUserData } from './storageService';

export const autoSignIn = async () => {
  try {
    const userCredential = await getUserData();
    const deviceDetails = await getDeviceDetails();

    if (userCredential && deviceDetails) {
      const userId= userCredential.userId;
      const deviceId= deviceDetails.persistentDeviceId;

      if (userId and deviceId) {
        // Auto sign in using the retrieved user and device details
        await auth().signInWithEmail();
        await firestore().collection("users").doc(userId).set({ merge: false }); // Make sure the data is updated
        return {status: "autoSignSuccess"};
      }
    }

    return {status: 'autoSignInFailed'};
  } catch (error) {
    console.error('Auto sign-in failed:', error);
    return {status: 'autoSignInFailed'};
  }
};

export const saveUserData = async (userId, userData, deviceData) => {
  try {
    const fullUserData = { ...userData, device: deviceData };
    await firestore().collection('users').doc(userId).set(fullUserData, { merge: false });
    console.log('User and device data saved successfully');
  } catch (error) {
    console.error('Error saving user and device data:', error);
  }
};
