import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initializeUser = async () => {
  try {
    let userId = await AsyncStorage.getItem('userId');

    if (!userId) {
      // No user is signed in, sign in anonymously
      const userCredential = await auth().signInAnonymously();
      userId = userCredential.user.uid;
      await AsyncStorage.setItem('userId', userId);
    } else {
      // If the Firebase Auth user is null, attempt to re-authenticate
      if (!auth().currentUser) {
        const userCredential = await auth().signInAnonymously();
        userId = userCredential.user.uid;
        await AsyncStorage.setItem('userId', userId);
      }
    }
  } catch (error) {
    console.error('Error initializing user:', error);
  }
};

export { initializeUser };
