import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export const initializeUser = async (userData) => {
  try {
    const user = firebase.auth().currentUser;

    if (!user) {
      const newUser = await firebase.auth().signInAnonymously();
      const userId = newUser.user.uid;
      await AsyncStorage.setItem('userId', userId);
      await createUserDocument(userId, userData);
    } else {
      const userId = user.uid;
      await AsyncStorage.setItem('userId', userId);
      await createUserDocument(userId, userData);
    }
  } catch (error) {
    console.error('Failed to initialize user:', error);
  }
};

const getNextUserNumber = async () => {
  const docRef = firestore().collection('config').doc('userNumber');
  const doc = await docRef.get();

  if (doc.exists) {
    const currentNumber = doc.data().latestNumber || 0;
    const nextNumber = currentNumber + 1;
    await docRef.set({ latestNumber: nextNumber });
    return nextNumber;
  } else {
    await docRef.set({ latestNumber: 1 });
    return 1;
  }
};

const createUserDocument = async (uid, userData) => {
  try {
    const userNumber = await getNextUserNumber();
    const os = Platform.OS;
    const appVersion = DeviceInfo.getVersion();
    const osVersion = DeviceInfo.getSystemVersion();

    const userDocumentData = {
      ...userData,
      userId: uid,
      userNumber: userNumber,
      os: os,
      appVersion: appVersion,
      osVersion: osVersion,
      REMAINING_COINS: 2,  // Initialize with 2 daily coins
      LAST_POSTED_FORTUNE: null,  // Initialize with no last fortune
    };

    await firestore().collection('test-users').doc(uid).set(userDocumentData);
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};
