import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useUser } from './UserContext';

const CoffeeCupUploadScreen = ({ route }) => {
  const { userData, setUserData } = useUser();
  const navigation = useNavigation();
  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const updateImageAtIndex = (imageUri: string, index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = imageUri;
    setImages(updatedImages);
  };

  const handleImagePickerResponse = (response: ImagePickerResponse, index: number) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const source = response.assets[0].uri;
      if (source) {
        updateImageAtIndex(source, index);
      }
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
          { text: 'Take Photo', onPress: () => takePhoto(index) },
          {
            text: 'Choose from Gallery',
            onPress: () => chooseFromGallery(index),
          },
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        ],
        { cancelable: true }
    );
  };

  const takePhoto = (index: number, options: ImagePickerResponse) => {
    launchCamera(options, (response) => handleImagePickerResponse(response, index));
  };

  const chooseFromGallery = (index: number, options: ImagePickerResponse) => {
    launchImageLibrary(options, (response) => handleImagePickerResponse(response, index));
  };

  const allImagesUploaded = images.every((img) => img !== null);

  const handleSubmit = async () => {
    if (!allImagesUploaded) {
      Alert.alert('Hata', 'Lütfen tüm resimleri yükleyin.');
      return;
    }

    setLoading(true);

    try {
      const updatedCoins = userData?.REMAINING_COINS - 1;
      const userId = userData?.userId;

      if (userId) {
        await firestore().collection('test-users').doc(userId).update({
          REMAINING_COINS: updatedCoins,
          LAST_POSTED_FORTUNE: new Date().toISOString(),
        });

        // Update user data locally
        setUserData(prevState => ({
          ...prevState,
          REMAINING_COINS: updatedCoins,
        }));

        // Navigate to the loading screen
        navigation.navigate('FortuneLoadingScreen', { images, userData });
      }
    } catch (error) {
      Alert.alert('Hata', 'Fal gönderilemedi. Lütfen tekrar deneyin.');
      console.error('Error sending fortune:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.title}>Kahve Tabağı</Text>
          <Text style={styles.subTitle}>Kahve tabağınızın fotoğrafını yükleyiniz.</Text>
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
        </ScrollView>
        <View>
          <TouchableOpacity
              style={[
                styles.button,
                allImagesUploaded ? styles.buttonActive : styles.buttonInactive,
              ]}
              disabled={!allImagesUploaded || loading}
              onPress={handleSubmit}
          >
            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <Text style={styles.buttonText}>Falcıya Gönder!</Text>
            )}
          </TouchableOpacity>
          <View style={styles.navBar}>
            <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.goBack()}
            >
              <Image source={require('./assets/home.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.navBar2}>
            <TouchableOpacity
                style={styles.navItem2}
                onPress={() => navigation.navigate('Settings' as never)}
            >
              <Image source={require('./assets/gear.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#fcf4e4',
    justifyContent: 'space-between',
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: '#fcf4e4',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  header: {
    fontSize: 36,
    color: '#88400d',
    fontFamily: 'Nunito-Black',
    textAlign: 'center',
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
    shadowOffset: { width: 0, height: 2 },
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
    top: 140,
    alignItems: 'center',
    backgroundColor: '#fcf4e4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: 20,
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
    backgroundColor: 'darkgray',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(255,255,255)',
    width: '20%',
    paddingVertical: 15,
    position: 'relative',
    bottom: 30,
    right: 60,
    alignSelf: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 15,
    marginHorizontal: 5,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  navBar2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    width: '20%',
    paddingVertical: 15,
    position: 'relative',
    bottom: 110,
    left: 60,
    alignSelf: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    marginHorizontal: 5,
  },
  navItem2: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default CoffeeCupUploadScreen;
