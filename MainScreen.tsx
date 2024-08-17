import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Alert,
  Animated,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Swipeable} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

interface MainScreenProps {
  route: {
    params: {
      userData: {
        name: string;
        age: string;
        gender: string;
        status: string;
        sexualInterest: string;
        intention: string;
        birthday: Date;
      };
    };
  };
}

const MainScreen: React.FC<MainScreenProps> = ({route}) => {
  const { userData } = route.params || { userData: null };
  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User data is missing!</Text>
      </View>
    );
  }

  const [savedFortunes, setSavedFortunes] = useState<string[]>([]);
  const [isFortuneGridVisible, setIsFortuneGridVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const navigation = useNavigation();
  const homeIcon: ImageSourcePropType = require('./assets/home.png');
  const plusIcon: ImageSourcePropType = require('./assets/plus.png');
  const gearIcon: ImageSourcePropType = require('./assets/gear.png');
  const wheelIcon: ImageSourcePropType = require('./assets/wheel.png');
  const notificationIcon: ImageSourcePropType = require('./assets/bell.png');
  const coffeeIcon: ImageSourcePropType = require('./assets/coffee.png');
  const horoscopeIcon: ImageSourcePropType = require('./assets/horoscope.png');
  const constellationIcon: ImageSourcePropType = require('./assets/constellation.png');
  const closeIcon: ImageSourcePropType = require('./assets/close.png');
  const closeIcon2: ImageSourcePropType = require('./assets/close.png');
  const backIcon: ImageSourcePropType = require('./assets/back.png');

  const services = [
    {key: '1', title: 'Kahve falı baktır', icon: coffeeIcon},
    {key: '2', title: 'Günlük Burçlar', icon: horoscopeIcon},
    {key: '3', title: 'Astroloji Haritası', icon: constellationIcon},
  ];

  useEffect(() => {
    const fetchSavedFortunes = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedFortunes');
        if (saved) {
          setSavedFortunes(JSON.parse(saved));
        }
      } catch (error) {
        console.log('Error fetching saved fortunes:', error);
      }
    };

    fetchSavedFortunes();
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  const showAlert = () => {
    Alert.alert(
      'Fal baktırmaya hazır mısın?',
      'Lütfen fincanını ve fincan tabağını hazır konuma getir.',
      [
        {
          text: 'İptal',
          onPress: () => console.log('İptal pressed'),
          style: 'cancel',
        },
        {
          text: 'Devam Et',
          onPress: () => {
            console.log('Devam Et pressed');
            navigation.navigate('CoffeeCupUploadScreen', {userData});
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleKahveFaliBak = () => {
    setIsFortuneGridVisible(!isFortuneGridVisible);
  };

  const deleteFortune = async (index: number) => {
    const updatedFortunes = savedFortunes.filter((_, i) => i !== index);
    setSavedFortunes(updatedFortunes);
    await AsyncStorage.setItem('savedFortunes', JSON.stringify(updatedFortunes));
  };

  const handleDeleteConfirmation = (index: number) => {
    Alert.alert(
      'Silmek istediğinize emin misiniz?',
      '',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Silme işlemi iptal edildi'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => deleteFortune(index),
        },
      ],
      {cancelable: true},
    );
  };

  const renderRightActions = (index: number) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDeleteConfirmation(index)}>
      <Image source={closeIcon} style={styles.closeIcon} />
    </TouchableOpacity>
  );

  const renderFortuneItem = ({item, index}) => (
    <Swipeable renderRightActions={() => renderRightActions(index)}>
      <TouchableOpacity
        style={styles.fortuneItem}
        onPress={() => navigation.navigate('FortuneTellerViewScreen', {fortuneText: item})}>
        <Text style={styles.fortuneItemText}>Fal #{index + 1}</Text>
        <Text style={styles.fortuneItemPreview}>{item.substring(0, 60)}...</Text>
      </TouchableOpacity>
    </Swipeable>
  );

  const Header = () => (
    <Animated.View
      style={[styles.header, {backgroundColor: headerBackgroundColor}]}>
      <TouchableOpacity
        style={styles.wheelButton}
        onPress={() => console.log('Wheel of Prizes')}>
        <Image source={wheelIcon} style={styles.wheelIcon} />
      </TouchableOpacity>
      <Animated.Text
        style={[
          styles.welcomeText,
          {
            fontSize: fontSize,
            transform: [
              {translateX: welcomePositionX},
              {translateY: welcomePositionY},
            ],
            textAlign: 'center',
            flex: 1,
          },
        ]}>
        👋 Hoşgeldin {userData.name}!
      </Animated.Text>
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={() => console.log('Notifications')}>
        <Image source={notificationIcon} style={styles.notificationIcon} />
      </TouchableOpacity>
    </Animated.View>
  );

  const fontSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [32, 24],
    extrapolate: 'clamp',
  });

  const welcomePositionX = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [-30, 0],
    extrapolate: 'clamp',
  });

  const welcomePositionY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [30, -25],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', '#ffffff'],
    extrapolate: 'clamp',
  });

  return (
    <LinearGradient colors={['#fff', '#f8d8c1']} style={styles.container}>
      <Header />

      <Animated.FlatList
        data={services}
        keyExtractor={item => item.key}
        numColumns={1}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              style={styles.gridItem}
              onPress={item.key === '1' ? handleKahveFaliBak : showAlert}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.gridText}>{item.title}</Text>
            </TouchableOpacity>

            {isFortuneGridVisible && item.key === '1' && (
              <View style={styles.fortuneGridContainer}>
                {savedFortunes.length > 0 ? (
                  <FlatList
                    data={savedFortunes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderFortuneItem}
                    contentContainerStyle={styles.fortuneGrid}
                  />
                ) : (
                  <View style={styles.noFortunesContainer}>
                    <Text style={styles.noFortunesText}>
                      Kayıtlı falınız bulunmamaktadır. Hemen +'ya basınız ve falınızı baktırınız.
                    </Text>
                  </View>
                )}
              </View>
            )}
          </>
        )}
        style={styles.grid}
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
      />

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => console.log('Home')}>
          <Image source={homeIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setModalVisible(true)}>
          <Image source={plusIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Settings')}>
          <Image source={gearIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* First Modal for choosing options */}
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton2}
            onPress={() => setModalVisible(false)}>
            <Image source={closeIcon2} style={styles.closeIcon2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(false);
              setSecondModalVisible(true); // Open the second modal
            }}>
            <Image source={coffeeIcon} style={styles.modalIcon} />
            <Text style={styles.modalText}>Kahve falı baktır</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={showAlert}>
            <Image source={horoscopeIcon} style={styles.modalIcon} />
            <Text style={styles.modalText}>Günlük Burçlar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={showAlert}>
            <Image source={constellationIcon} style={styles.modalIcon} />
            <Text style={styles.modalText}>Astroloji Haritası</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Second Modal for Kahve falı baktır */}
      <Modal
        isVisible={secondModalVisible}
        onSwipeComplete={() => setSecondModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setSecondModalVisible(false);
              setModalVisible(true); // Reopen the first modal
            }}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.secondModalText}>
            Lütfen fincanınızı ve fincan tabağınızı hazır konuma getiriniz.
          </Text>
          <TouchableOpacity
            style={styles.secondModalButton}
            onPress={() => {
              setSecondModalVisible(false);
              navigation.navigate('CoffeeCupUploadScreen', {userData});
            }}>
            <Text style={styles.modalText}>Devam Et</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    position: 'relative',
    justifyContent: 'space-between',
  },
  header: {
    height: 120,
    paddingTop: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  wheelButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 5,
  },
  wheelIcon: {
    width: 30,
    height: 30,
  },
  notificationButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 5,
  },
  notificationIcon: {
    width: 30,
    height: 30,
  },
  grid: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    marginTop: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  fortuneGridContainer: {
    marginVertical: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  fortuneGrid: {
    padding: 10,
  },
  fortuneItem: {
    backgroundColor: '#fcf4e4',
    padding: 15,
    marginVertical: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 3,
  },
  fortuneItemText: {
    fontSize: 18,
    fontFamily: 'Nunito-Black',
    color: '#88400d',
  },
  fortuneItemPreview: {
    fontSize: 14,
    color: '#88400d',
    fontFamily: 'Nunito-Variable',
  },
  noFortunesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noFortunesText: {
    fontSize: 16,
    color: '#88400d',
    textAlign: 'center',
    fontFamily: 'Nunito-Variable',
  },
  deleteButton: {
    backgroundColor: '#ff4c4c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 15,
    marginVertical: 5,
  },
  closeIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  gridItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#c58257',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  gridText: {
    fontSize: 24,
    marginLeft: 10,
    color: '#000',
    fontFamily: 'Nunito-Black',
  },
  icon: {
    width: 30,
    height: 30,
  },
  welcomeText: {
    fontSize: 36,
    color: '#88400d',
    fontFamily: 'Nunito-Black',
    alignSelf: 'center',
    marginTop: 30,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    width: '90%',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 20,
    left: 25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#8a4412',
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  backIcon: {
    width: 36,
    height: 36,
    tintColor: '#fcf4e4',
  },
  closeButton2: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  closeIcon2: {
    width: 40,
    height: 40,
    tintColor: '#fcf4e4',
  },
  modalButton: {
    backgroundColor: '#fcf4e4',
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
  },
  modalIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  modalText: {
    color: '#8a4412',
    textAlign: 'center',
    fontFamily: 'Nunito-Black',
    fontSize: 24,
  },
  secondModalText: {
    color: '#fcf4e4',
    textAlign: 'center',
    fontFamily: 'Nunito-Black',
    fontSize: 20,
    marginBottom: 20,
  },
  secondModalButton: {
    backgroundColor: '#fcf4e4',
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default MainScreen;
