// CoffeeCupUploadScreen.js (or .ts)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CoffeeCupUploadScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  const [images, setImages] = useState<Array<string | null>>([
    null,
    null,
    null,
    null,
  ]);

  const updateImageAtIndex = (imageUri: string, index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = imageUri;
    setImages(updatedImages);
  };

  const handleImagePickerResponse = (response, index) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error:', response.errorMessage);
    } else {
      const source = response.assets[0].uri;
      updateImageAtIndex(source, index);
    }
  };

  const showImagePickerOptions = (index: number) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => takePhoto(index, options) },
        {
          text: 'Choose from Gallery',
          onPress: () => chooseFromGallery(index, options),
        },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const takePhoto = (index: number, options) => {
    launchCamera(options, (response) =>
      handleImagePickerResponse(response, index)
    );
  };

  const chooseFromGallery = (index: number, options) => {
    launchImageLibrary(options, (response) =>
      handleImagePickerResponse(response, index)
    );
  };

  const allImagesUploaded = images.every((img) => img !== null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Kahve Fincanınızı Yükleyin</Text>
      </View>
      <Text style={styles.title}>Kahve Fincanı Fotoğraflarını Yükle</Text>
      <Text style={styles.subTitle}>
        İlk 3 fotoğraf kahve fincanı içi için
      </Text>
      <View style={styles.imageContainer}>
        {images.slice(0, 3).map((img, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageBox}
            onPress={() => showImagePickerOptions(index)}
          >
            {img ? (
              <Image source={{ uri: img }} style={styles.image} />
            ) : (
              <Text style={styles.addIcon}>+</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.title}>Kahve Tabağı Fotoğrafını Yükle</Text>
      <TouchableOpacity
        style={styles.imageBox}
        onPress={() => showImagePickerOptions(3)}
      >
        {images[3] ? (
          <Image source={{ uri: images[3] }} style={styles.image} />
        ) : (
          <Text style={styles.addIcon}>+</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          allImagesUploaded ? styles.buttonActive : styles.buttonDisabled,
        ]}
        disabled={!allImagesUploaded}
        onPress={() =>
          navigation.navigate('FortuneLoadingScreen', { images, userData })
        }
      >
        <Text style={styles.buttonText}>Falcıya Gönder!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: '#fcf4e4',
  },
  headerContainer: {
    alignItems: 'flex-start',
    marginBottom: 50,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#88400d',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#88400d',
    marginBottom: 5,
    textAlign: 'left',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
    textAlign: 'left',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  imageBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  addIcon: {
    fontSize: 28,
    color: 'gray',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#88400d',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonActive: {
    backgroundColor: '#88400d',
    borderWidth: 2,
    borderColor: '#88400d',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    borderWidth: 0,
  },
});

export default CoffeeCupUploadScreen;
