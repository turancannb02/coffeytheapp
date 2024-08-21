import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDeviceDetails } from './deviceService';

// Sign in the user anonymously or using Firebase authentication
export const signInAnonymously = async () => {
  try {
    const userCredential = await auth().signInAnonymously();
    const deviceDetails = await getDeviceDetails();
    await saveUserData(userCredential.user.uid, deviceDetails);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in anonymously:', error);
    return null;
  }
};

// Save user data to AsyncStorage for persistent login
export const saveUserData = async (userId, deviceData) => {
  try {
    const userData = { userId, device: deviceData };
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    console.log('User data saved to AsyncStorage:', userData);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Retrieve user data from AsyncStorage
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

// Logout function to clear user data
export const logout = async () => {
  try {
    await auth().signOut();
    await AsyncStorage.removeItem('userData');
    console.log('User signed out and local data cleared');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
