import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth'; // Ensures Firebase Auth module is set up
import '@react-native-firebase/storage'; // Add this if you are handling images
import { NativeModules, NativeEventEmitter } from 'react-native';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAFZdEv-BA4meAYORBXkR4qKrjL6b9krzE',
  authDomain: 'coffey-3ec22.firebaseapp.com',
  databaseURL:
    'https://coffey-3ec22-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'coffey-3ec22',
  storageBucket: 'coffey-3ec22.appspot.com',
  messagingSenderId: '523532096471',
  appId: '1:523532096471:ios:74ef36b7b10ba2c019f192',
};

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Set up NativeEventEmitter for Firebase
const eventEmitter = new NativeEventEmitter();

// Now you can use firebaseEmitter to listen for any Firebase-specific events
