import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useUser} from './UserContext';

const {width} = Dimensions.get('window');

const CoffeeCupUploadScreen = ({route}) => {
  const {userData, setUserData} = useUser();
  const navigation = useNavigation();
  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [startX, setStartX] = useState(0);

  const updateImageAtIndex = (imageUri: string, index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = imageUri;
    setImages(updatedImages);
  };

  const handleImagePickerResponse = (
    response: ImagePickerResponse,
    index: number,
  ) => {
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
    if (images[index]) {
      // If an image is already selected, show options to change or remove
      Alert.alert(
        'Change Photo',
        'Choose an option',
        [
          {text: 'Take New Photo', onPress: () => takePhoto(index)},
          {text: 'Choose from Gallery', onPress: () => chooseFromGallery(index)},
          {text: 'Remove Photo', onPress: () => removePhoto(index)},
          {text: 'Cancel', style: 'cancel'},
        ],
        {cancelable: true},
      );
    } else {
      // If no image is selected, show options to add
      Alert.alert(
        'Add Photo',
        'Choose an option',
        [
          {text: 'Take Photo', onPress: () => takePhoto(index)},
          {text: 'Choose from Gallery', onPress: () => chooseFromGallery(index)},
          {text: 'Cancel', style: 'cancel'},
        ],
        {cancelable: true},
      );
    }
  };

  const takePhoto = (index: number, options: ImagePickerResponse) => {
    launchCamera(options, response =>
      handleImagePickerResponse(response, index),
    );
  };

  const chooseFromGallery = (index: number, options: ImagePickerResponse) => {
    launchImageLibrary(options, response =>
      handleImagePickerResponse(response, index),
    );
  };

  const allImagesUploaded = images.every(img => img !== null);

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
        navigation.navigate('FortuneLoadingScreen', {images, userData});
      }
    } catch (error) {
      Alert.alert('Hata', 'Fal gönderilemedi. Lütfen tekrar deneyin.');
      console.error('Error sending fortune:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Swipe down to refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleTouchStart = e => {
    setStartX(e.nativeEvent.pageX);
  };

  const handleTouchEnd = e => {
    const endX = e.nativeEvent.pageX;
    const dx = endX - startX;
    if (dx > 50) {
      navigation.goBack();
    } else if (dx < -50) {
      navigation.navigate('Settings' as never);
    }
  };

  const removePhoto = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  return (
    <View
      style={styles.flexContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
      <View style={styles.headerContainer}>
        <View style={styles.wavyBackground} />
        <Text style={styles.header}>Kahve Fincanınızı Yükleyin</Text>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.infoBox}>
          <Image
            source={require('./assets/info.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Kahve falınızı falcıya göndermek için fincanın içinden 3 farklı
            açıdan ve 1 tane de tabağından fotoğraf ekleyin.{' '}
          </Text>
        </View>

        <Text style={styles.title}>Kahve Fincanı</Text>
        <Text style={styles.subTitle}>
          Kahve fincanınızın fotoğraflarını yükleyiniz.
        </Text>
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
        <Text style={styles.subTitle}>
          Kahve tabağınızın fotoğrafını yükleyiniz.
        </Text>
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
      <View>
        <TouchableOpacity
          style={[
            styles.button,
            allImagesUploaded ? styles.buttonActive : styles.buttonInactive,
          ]}
          disabled={!allImagesUploaded || loading}
          onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Falcıya Gönder!</Text>
          )}
        </TouchableOpacity>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.goBack()}>
            <Image source={require('./assets/home.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.navBar2}>
          <TouchableOpacity
            style={styles.navItem2}
            onPress={() => navigation.navigate('Settings' as never)}>
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
    paddingHorizontal: 20,
    backgroundColor: '#fcf4e4',
  },
  headerContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  wavyBackground: {
    position: 'absolute',
    top: -110,
    left: 105,
    right: 105,
    height: 300,
    backgroundColor: '#88400d',
    borderBottomLeftRadius: width * 0.5,
    borderBottomRightRadius: width * 0.5,
    transform: [{scaleX: 1.9}],
  },
  header: {
    fontSize: 36,
    color: '#fcf4e4',
    fontFamily: 'Nunito-Black',
    textAlign: 'center',
    zIndex: 1,
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 20, // added horizon
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 3,
    marginHorizontal: 2,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    color: '#666',
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Nunito-Regular',
  },
  title: {
    fontSize: 24,
    color: '#88400d',
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'left',
    fontFamily: 'Nunito-Black',
  },
  subTitle: {
    fontSize: 14,
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
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 20,
    marginBottom: 10,
    marginVertical: 4,
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  addIcon: {
    fontSize: 40,
    color: 'gray',
  },
  button: {
    padding: 12,
    borderRadius: 20,
    top: 140,
    alignItems: 'center',
    backgroundColor: '#fcf4e4',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 2,
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
    // position: 'relative',
    bottom: 20,
    right: 60,
    alignSelf: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
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
    bottom: 100,
    left: 60,
    alignSelf: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
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
