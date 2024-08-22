// services/authService.js

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getDeviceDetails} from './deviceService';


export const signInAnonymously = async () => {
  try {
    // Ensure the current user is signed out before signing in a new anonymous user
    if (auth().currentUser) {
      await auth().signOut();
    }

    const userCredential = await auth().signInAnonymously();
    const deviceDetails = await getDeviceDetails(); // Fetch device details during sign-in
    return {userId: userCredential.user.uid, deviceDetails};
  } catch (error) {
    console.error('Error signing in anonymously:', error);
    return null;
  }
};

export const saveUserData = async (userId, userData, deviceData) => {
  try {
    // Combine user data with device data
    const fullUserData = {...userData, device: deviceData};
    // Use set() with merge: false to ensure it always creates a new document or fully replaces an existing one
    await firestore()
        .collection('test-users')
        .doc(userId)
        .set(fullUserData, {merge: false});
    console.log('User and device data saved successfully');
  } catch (error) {
    console.error('Error saving user and device data:', error);
  }
};
