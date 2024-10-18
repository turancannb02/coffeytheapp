import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Swipeable} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {useUser} from './UserContext';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import BannerAdComponent from './BannerAdComponent';
import { useTranslation } from 'react-i18next';

const MainScreen = () => {
  const {userData, setUserData} = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const [savedFortunes, setSavedFortunes] = useState([]);
  const [isFortuneGridVisible, setIsFortuneGridVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [coinsModalVisible, setCoinsModalVisible] = useState(false);
  const [thirdModalVisible, setThirdModalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthTime, setBirthTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();

  const homeIcon = require('./assets/home.png');
  const plusIcon = require('./assets/plus.png');
  const gearIcon = require('./assets/gear.png');
  const wheelIcon = require('./assets/wheel.png');
  const coinsIcon = require('./assets/coins.png');
  const coffeeIcon = require('./assets/coffee.png');
  const horoscopeIcon = require('./assets/horoscope.png');
  const constellationIcon = require('./assets/constellation.png');
  const closeIcon = require('./assets/close.png');
  const backIcon = require('./assets/back.png');

  const services = [
    { key: '1',
      title: t('Geçmiş Kahve Falları'),
      icon: coffeeIcon},
    {key: '2',
      title: t('Geçmiş Günlük Burçlar'),
      icon: horoscopeIcon,
      comingSoon: true},
    {
      key: '3',
      title: t('Geçmiş Astroloji Haritası'),
      icon: constellationIcon,
      comingSoon: true,
    },
  ];

  useEffect(() => {
    fetchUpdatedUserData();
  }, []);

  const fetchUpdatedUserData = async () => {
    try {
      const userId = userData?.userId;
      if (userId) {
        const userDoc = await firestore()
          .collection('test-users')
          .doc(userId)
          .get();
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching updated user data:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUpdatedUserData();
    setRefreshing(false);
  };

  const handleKahveFaliBak = () => {
    if (userData?.REMAINING_COINS > 0) {
      navigation.navigate('CoffeeCupUploadScreen', {userData});
    } else {
      Alert.alert(t('Fal hakkınız kalmamıştır.'));
    }
  };

  /* will use these part after adding the other grids -like active

  const handleDateChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
  };

  const handleTimeChange = (event: Event, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || birthTime;
    setShowTimePicker(false);
    setBirthTime(currentTime);
  };
*/
  function renderRightActions(index: number): React.ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <LinearGradient colors={['#fff', '#f8d8c1']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.wheelButton}
            onPress={() => console.log('Wheel of Prizes')}>
            <Image source={wheelIcon} style={styles.wheelIcon} />
          </TouchableOpacity>
          <Animated.Text
            style={[
              styles.welcomeText,
              {
                fontSize: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [32, 24],
                  extrapolate: 'clamp',
                }),
              },
            ]}>
            {t('👋 Hoşgeldin')} {userData?.name}
          </Animated.Text>
          <TouchableOpacity
            style={styles.coinsButton}
            onPress={() => setCoinsModalVisible(true)}>
            <Image source={coinsIcon} style={styles.coinsIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {services.map(service => (
            <View key={service.key}>
              <TouchableOpacity
                style={[
                  styles.gridItem,
                  service.comingSoon && styles.comingSoonItem,
                ]}
                onPress={service.key === '1' ? handleKahveFaliBak : () => {}}
                disabled={service.comingSoon}>
                {service.comingSoon && (
                  <View style={styles.blurOverlay}>
                    <View style={styles.blurBackground} />
                    <Text style={styles.comingSoonText}>{t('Çok Yakında')}</Text>
                  </View>
                )}
                <Image source={service.icon} style={styles.icon} />
                <Text style={styles.gridText}>{service.title}</Text>
              </TouchableOpacity>

              {isFortuneGridVisible && service.key === '1' && (
                <View style={styles.fortuneGridContainer}>
                  {Array.isArray(savedFortunes) && savedFortunes.length > 0 ? (
                    savedFortunes.map((fortune, index) => (
                      <Swipeable
                        renderRightActions={() => renderRightActions(index)}
                        key={index}>
                        <TouchableOpacity
                          style={styles.fortuneItem}
                          onPress={() =>
                            navigation.navigate(
                              'FortuneTellerViewScreen' as never,
                              {
                                fortuneText: fortune,
                                userData,
                                updateSavedFortunes: setSavedFortunes,
                              } as never,
                            )
                          }>
                          <Text style={styles.fortuneItemText}>
                            {t('Fal #')}{index + 1}
                          </Text>
                          <Text style={styles.fortuneItemPreview}>
                            {fortune.substring(0, 60)}...
                          </Text>
                        </TouchableOpacity>
                      </Swipeable>
                    ))
                  ) : (
                    <View style={styles.noFortunesContainer}>
                      <Text style={styles.noFortunesText}>
                        {t('Kayıtlı falınız bulunmamaktadır.')}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
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
          onPress={() => navigation.navigate('Settings' as never)}>
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
              setSecondModalVisible(true);
            }}>
            <Image source={coffeeIcon} style={styles.modalIcon} />
            <Text style={styles.modalText}>{t('Kahve falı baktır')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.comingSoonItem]}
            onPress={() => {
              setModalVisible(false);
              setThirdModalVisible(true);
            }}>
            <View style={styles.blurOverlay}>
              <View style={styles.blurBackground} />
              <Text style={styles.comingSoonText}>{t('Çok Yakında')}</Text>
            </View>
            <Image source={horoscopeIcon} style={styles.modalIcon} />
            <Text style={styles.modalText}>{t('Günlük Burçlar')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.comingSoonItem]}
            onPress={() => {}}>
            <View style={styles.blurOverlay}>
              <View style={styles.blurBackground} />
              <Text style={styles.comingSoonText}>{t('Çok Yakında')}</Text>
            </View>
            <Image source={constellationIcon} style={styles.modalIcon} />
            <Text style={styles.modalText}>{t('Astroloji Haritası')}</Text>
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
              setModalVisible(true);
            }}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.secondModalText}>
            {t('Lütfen fincanınızı ve fincan tabağınızı hazır konuma getiriniz.')}
          </Text>
          <TouchableOpacity
            style={styles.secondModalButton}
            onPress={handleKahveFaliBak}>
            <Text style={styles.modalText}>{t('Devam Et')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={coinsModalVisible}
        onSwipeComplete={() => setCoinsModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton2}
            onPress={() => setCoinsModalVisible(false)}>
            <Image source={closeIcon} style={styles.closeIcon2} />
          </TouchableOpacity>
          <Text style={styles.coinsModalText}>
            {t('Kalan Fal Hakkınız')}: {userData?.REMAINING_COINS}
          </Text>
        </View>
      </Modal>
      {/*

      Topic for another time - maybe in v2.0 (?)

      */}
      {/*
        <Modal
          isVisible={thirdModalVisible}
          onSwipeComplete={() => setThirdModalVisible(false)}
          swipeDirection="down"
          style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton2}
              onPress={() => setThirdModalVisible(false)}>
              <Image source={closeIcon} style={styles.closeIcon2} />
            </TouchableOpacity>
            <Text style={styles.thirdModalTitle}>Doğum Bilgileriniz</Text>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateTimeButtonText}>
                Doğum Tarihi: {birthDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}>
              <Text style={styles.dateTimeButtonText}>
                Doğum Saati:{' '}
                {birthTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.expandedButton}
              onPress={() => {
                setThirdModalVisible(false);
                // Navigate to daily horoscope screen or perform action
                console.log('Navigate to daily horoscope');
              }}>
              <Image source={horoscopeIcon} style={styles.expandedButtonIcon} />
              <Text style={styles.expandedButtonText}>Burç Yorumunu Gör</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={(
              event: DateTimePickerEvent,
              selectedDate: Date | undefined,
            ) => {
              handleDateChange(event, selectedDate);
            }}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={birthTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(
              event: DateTimePickerEvent,
              selectedTime: Date | undefined,
            ) => {
              handleTimeChange(event, selectedTime);
            }}
          />
        )}
      */}

      {/*

Can't handle it. " ERROR  Test Banner ad failed to load: [Error: [googleMobileAds/error-code-no-fill] The ad request was successful, but no ad was returned due to lack of ad inventory.]"
will handle it valla


      Banner Ad Integration
      <View style={styles.adContainer}>
        <BannerAdComponent />
      </View>*/}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  scrollViewContent: {
    paddingBottom: 100,
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
    elevation: 2,
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
  coinsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 5,
  },
  coinsIcon: {
    width: 30,
    height: 30,
  },
  grid: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  fortuneGridContainer: {
    marginVertical: 20,
    marginRight: 20,
    marginLeft: 20,
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
    elevation: 2,
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
    elevation: 2,
    overflow: 'hidden',
  },
  comingSoonItem: {
    opacity: 0.75,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(8px)',
  },
  comingSoonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 15,
    zIndex: 2,
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
    zIndex: 1,
    position: 'relative',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    width: '90%',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 50, // moved it up 70 to integrate admob - but not now
    left: '5%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
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
  coinsModalText: {
    color: '#fcf4e4',
    textAlign: 'center',
    fontFamily: 'Nunito-Black',
    fontSize: 24,
    marginBottom: 20,
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
    flexDirection: 'row',
    overflow: 'hidden',
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
  },
  thirdModalTitle: {
    color: '#fcf4e4',
    textAlign: 'center',
    fontFamily: 'Nunito-Black',
    fontSize: 24,
    marginBottom: 20,
  },
  dateTimeButton: {
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
  },
  dateTimeButtonText: {
    color: '#8a4412',
    textAlign: 'center',
    fontFamily: 'Nunito-Black',
    fontSize: 18,
  },
  expandedButton: {
    backgroundColor: '#fcf4e4',
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  expandedButtonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  expandedButtonText: {
    color: '#8a4412',
    textAlign: 'center',
    fontFamily: 'Nunito-Black',
    fontSize: 24,
  },

  /*

Will fix it and im not gonna delete it bc position was perfect

  adContainer: {
    position: 'absolute',
    bottom: 0, // Place the ad at the very bottom of the screen
    width: '100%',
    alignItems: 'center',
  }

  */

});

export default MainScreen;
