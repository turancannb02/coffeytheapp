import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Alert,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Swipeable} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {useUser} from './UserContext'; // Import the useUser hook

const MainScreen = () => {
  const {userData} = useUser(); // Access user data from context

  const [savedFortunes, setSavedFortunes] = useState([]);
  const [isFortuneGridVisible, setIsFortuneGridVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const homeIcon = require('./assets/home.png');
  const plusIcon = require('./assets/plus.png');
  const gearIcon = require('./assets/gear.png');
  const wheelIcon = require('./assets/wheel.png');
  const notificationIcon = require('./assets/bell.png');
  const coffeeIcon = require('./assets/coffee.png');
  const horoscopeIcon = require('./assets/horoscope.png');
  const constellationIcon = require('./assets/constellation.png');
  const closeIcon = require('./assets/close.png');
  const backIcon = require('./assets/back.png');

  const services = [
    {key: '1', title: 'Kahve falı baktır', icon: coffeeIcon},
    {key: '2', title: 'Günlük Burçlar', icon: horoscopeIcon},
    {key: '3', title: 'Astroloji Haritası', icon: constellationIcon},
  ];

  const handleKahveFaliBak = () => {
    setIsFortuneGridVisible(!isFortuneGridVisible);
  };

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

  const deleteFortune = index => {
    const updatedFortunes = savedFortunes.filter((_, i) => i !== index);
    setSavedFortunes(updatedFortunes);
  };

  const handleDeleteConfirmation = index => {
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

  const renderRightActions = index => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDeleteConfirmation(index)}>
      <Image source={closeIcon} style={styles.closeIcon} />
    </TouchableOpacity>
  );

  const renderFortuneItem = (item, index) => (
    <Swipeable renderRightActions={() => renderRightActions(index)} key={index}>
      <TouchableOpacity
        style={styles.fortuneItem}
        onPress={() =>
          navigation.navigate('FortuneTellerViewScreen', {
            fortuneText: item,
            userData,
            updateSavedFortunes: setSavedFortunes,
          })
        }>
        <Text style={styles.fortuneItemText}>Fal #{index + 1}</Text>
        <Text style={styles.fortuneItemPreview}>
          {item.substring(0, 60)}...
        </Text>
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
      <View style={styles.gridContainer}>
        {services.map(service => (
          <View key={service.key}>
            <TouchableOpacity
              style={styles.gridItem}
              onPress={service.key === '1' ? handleKahveFaliBak : showAlert}>
              <Image source={service.icon} style={styles.icon} />
              <Text style={styles.gridText}>{service.title}</Text>
            </TouchableOpacity>

            {isFortuneGridVisible && service.key === '1' && (
              <View style={styles.fortuneGridContainer}>
                {Array.isArray(savedFortunes) && savedFortunes.length > 0 ? (
                  savedFortunes.map((fortune, index) =>
                    renderFortuneItem(fortune, index),
                  )
                ) : (
                  <View style={styles.noFortunesContainer}>
                    <Text style={styles.noFortunesText}>
                      Kayıtlı falınız bulunmamaktadır. Hemen +'ya basınız ve
                      falınızı baktırınız.
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </View>
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
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton2}
            onPress={() => setModalVisible(false)}>
            <Image source={closeIcon} style={styles.closeIcon2} />
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
    justifyContent: 'flex-start', // Ensure everything is aligned at the top initially
    position: 'relative',
  },
  header: {
    height: 250,
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
    zIndex: 1,
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
    alignItems: 'center',  // Center the grid items horizontally
    justifyContent: 'flex-start',  // Start from the top under the welcome text
    marginTop: 20,  // Adjust as needed to move the grids closer to the welcomeText
  },
  contentContainer: {
    marginTop: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  fortuneGridContainer: {
    marginVertical: 20,
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
    marginHorizontal: 40,
    margin: 10,
    padding: 10,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#c58257',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    textAlign: 'center',
    marginTop: 50,
    zIndex: 1,  // Ensure it's on top
    position: 'relative',  // Position relative to avoid overlap issues
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
