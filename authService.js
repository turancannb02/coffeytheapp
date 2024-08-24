import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

export const signInAnonymously = async () => {
  try {
    const userCredential = await firebase.auth().signInAnonymously();
    const userId = userCredential.user.uid; // Get the USID after successful sign-in
    const deviceDetails = {
      os: Platform.OS,
      appVersion: DeviceInfo.getVersion(),
      osVersion: DeviceInfo.getSystemVersion(),
    };

    // Store sign-in status in AsyncStorage
    await AsyncStorage.setItem('isSignedIn', 'true');
    await AsyncStorage.setItem('userId', userId);

    return {userId, deviceDetails};
  } catch (error) {
    console.error('Error signing in anonymously', error);
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

    // Save the user data to Firestore
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
    await docRef.set({latestNumber: nextNumber});

    return nextNumber;
  } else {
    // Initialize if the document doesn't exist
    await docRef.set({latestNumber: 1});
    return 1;
  }
};

// Check if the user is already signed in
export const checkSignInStatus = async () => {
  try {
    const isSignedIn = await AsyncStorage.getItem('isSignedIn');
    const userId = await AsyncStorage.getItem('userId');
    return isSignedIn === 'true' && userId
      ? {isSignedIn: true, userId}
      : {isSignedIn: false, userId: null};
  } catch (error) {
    console.error('Error checking sign-in status:', error);
    return {isSignedIn: false, userId: null};
  }
};
