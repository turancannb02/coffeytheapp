import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

// Function to initialize the user
export const initializeUser = async (userData) => {
  try {
    const user = firebase.auth().currentUser;

    if (!user) {
      // Sign in anonymously if no user is signed in
      const newUser = await firebase.auth().signInAnonymously();
      console.log('Anonymous user signed in:', newUser.user.uid);
      // Create Firestore document with new UID and user data
      await createUserDocument(newUser.user.uid, userData);
    } else {
      console.log('User already signed in:', user.uid);
      // Update Firestore document with user data
      await createUserDocument(user.uid, userData);
    }
  } catch (error) {
    console.error('Failed to initialize user:', error);
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
    await docRef.set({ latestNumber: 1 });
    return 1;
  }
};

// Function to create or update the user's Firestore document
const createUserDocument = async (uid, userData) => {
  try {
    const userNumber = await getNextUserNumber();
    const os = Platform.OS; // 'ios' or 'android'
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

    // Save the user document in Firestore
    await firestore().collection('test-users').doc(uid).set(userDocumentData);

    console.log(`User document created with userNumber: ${userNumber}`);
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};
