import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user data after login/register
export const saveUserData = async (user) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data', error);
  }
};

// Retrieve user data
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData): null;
  } catch (error) {
    console.error('Error retrieving user data', error);
  }
};

// Clear user data on logout
export const clearUserData = async () => {
   try {
      await AsyncStorage.removeItem('userData');
  } catch (error) {
      console.error('Error clearing user data', error);
  }
};