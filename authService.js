import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export const signInAnonymously = async () => {
  try {
    const userCredential = await firebase.auth().signInAnonymously();
    const userId = userCredential.user.uid; // Get the USID after successful sign-in
    const deviceDetails = {
      os: Platform.OS,
      appVersion: DeviceInfo.getVersion(),
      osVersion: DeviceInfo.getSystemVersion(),
    };
    return { userId, deviceDetails };
  } catch (error) {
    console.error('Error signing in anonymously', userCredential);
    throw error;
  }
};

export const saveUserData = async (userId, userData, deviceDetails) => {
  try {
    const userNumber = await getNextUserNumber(); // Function to get the next incremental number

    const userDocumentData = {
      ...userData,
      userId,
      userNumber,
      ...deviceDetails,
    };

    // Make sure this uses firestore().collection() or firestore().doc()
    await firestore()
        .collection('test-users')
        .doc(userId)
        .set(userDocumentData);

    console.log(`User document created with userNumber: ${userNumber}`);
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

// Function to get the next available user number
const getNextUserNumber = async () => {
  const docRef = firestore().collection('config').doc('userNumber');
  const doc = await docRef.get();

  if (doc.exists) {
    const currentNumber = doc.data().latestNumber || 0;
    const nextNumber = currentNumber + 1;

    // Update the document with the new number
    await docRef.set({ latestNumber: nextNumber });

    return nextNumber;
  } else {
    // Initialize if the document doesn't exist
    await docRef.set({latestNumber: 1});
    return 1;
  }
};
