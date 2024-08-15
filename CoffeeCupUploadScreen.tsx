import React, {useState} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CoffeeCupUploadScreen = ({navigation, route}) => {
  const {userData} = route.params;
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
        {text: 'Take Photo', onPress: () => takePhoto(index, options)},
        {
          text: 'Choose from Gallery',
          onPress: () => chooseFromGallery(index, options),
        },
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const takePhoto = (index: number, options) => {
    launchCamera(options, response =>
      handleImagePickerResponse(response, index),
    );
  };

  const chooseFromGallery = (index: number, options) => {
    launchImageLibrary(options, response =>
      handleImagePickerResponse(response, index),
    );
  };

  const allImagesUploaded = images.every(img => img !== null);

  return (
    <View style={styles.flexContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Kahve Fincanınızı Yükleyin</Text>
        </View>
        <Text style={styles.title}>Kahve Fincanı</Text>
        <Text style={styles.subTitle}>Kahve fincanınızın fotoğraflarını yükleyiniz.</Text>
        <View style={styles.imageContainer}>
          {images.slice(0, 3).map((img, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageBox}
              onPress={() => showImagePickerOptions(index)}>
              {img ? (
                <Image source={{uri: img}} style={styles.image} />
              ) : (
                <Text style={styles.addIcon}>+</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.title}>Kahve Tabağı</Text>
        <Text style={styles.subTitle}>Kahve tabağınızın fotoğrafını yükleyiniz.</Text>
        <TouchableOpacity
          style={styles.imageBox}
          onPress={() => showImagePickerOptions(3)}>
          {images[3] ? (
            <Image source={{uri: images[3]}} style={styles.image} />
          ) : (
            <Text style={styles.addIcon}>+</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.button,
          allImagesUploaded ? styles.buttonActive : styles.buttonInactive,
        ]}
        disabled={!allImagesUploaded}
        onPress={() =>
          navigation.navigate('FortuneLoadingScreen', {images, userData})
        }>
        <Text style={styles.buttonText}>Falcıya Gönder!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'space-between', // This pushes the button to the bottom
  },
  container: {
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
    fontSize: 36,
    color: '#88400d',
    fontFamily: 'Nunito-Black',
  },
  title: {
    fontSize: 24,
    color: '#88400d',
    marginBottom: 5,
    textAlign: 'left',
    fontFamily: 'Nunito-Black',
  },
  subTitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'Nunito-Variable',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  imageBox: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 20,
    marginBottom: 10,
    marginVertical: 5,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  addIcon: {
    fontSize: 50,
    color: 'gray',
  },
  button: {
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: 30,  // Add horizontal margin to match the container padding
    marginBottom: 30,  // Add bottom margin to separate from the bottom of the screen
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Nunito-Black',
    color: '#fcf4e4',
  },
  buttonActive: {
    backgroundColor: '#88400d',
  },
  buttonInactive: {
    backgroundColor: 'darkgrey',
  },
});

export default CoffeeCupUploadScreen;
