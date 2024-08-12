// src/services/storageService.js
import storage from '@react-native-firebase/storage';
import {PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';

export const uploadImage = async (userId, imagePath) => {
  // Android permission check
  if (Platform.OS === 'android') {
    const hasPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'This app needs access to your storage to upload files',
      },
    );
    if (hasPermission !== PermissionsAndroid.RESULTS.GRANTED) {
      console.error('Storage permission not granted');
      return;
    }
  }

  // Check file existence
  const fileExists = await RNFS.exists(imagePath);
  if (!fileExists) {
    console.error('File does not exist at path:', imagePath);
    return;
  }

  try {
    const imageRef = storage().ref(`images/${userId}/${Date.now()}.jpg`);
    await imageRef.putFile(imagePath);
    const downloadURL = await imageRef.getDownloadURL();
    console.log('Image uploaded successfully, URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
