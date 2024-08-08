import React, {useRef} from 'react';
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

interface MainScreenProps {
  route: {
    params: {
      userName: string;
    };
  };
}

const MainScreen: React.FC<MainScreenProps> = ({route}) => {
  const {userName} = route.params;
  const navigation = useNavigation();
  const homeIcon: ImageSourcePropType = require('./assets/home.png');
  const plusIcon: ImageSourcePropType = require('./assets/plus.png');
  const gearIcon: ImageSourcePropType = require('./assets/gear.png');
  const wheelIcon: ImageSourcePropType = require('./assets/wheel.png');
  const notificationIcon: ImageSourcePropType = require('./assets/bell.png');
  const coffeeIcon: ImageSourcePropType = require('./assets/coffee.png');
  const horoscopeIcon: ImageSourcePropType = require('./assets/horoscope.png');
  const constellationIcon: ImageSourcePropType = require('./assets/constellation.png');

  const services = [
    {key: '1', title: 'Kahve falı baktır', icon: coffeeIcon},
    {key: '2', title: 'Günlük Burçlar', icon: horoscopeIcon},
    {key: '3', title: 'Astroloji Haritası', icon: constellationIcon},
  ];

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
            navigation.navigate('CoffeeCupUploadScreen');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const fontSize = scrollY.interpolate({
    inputRange: [50, 100],
    outputRange: [32, 20],
    extrapolate: 'clamp',
  });

  const welcomePosition = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 50],
    extrapolate: 'clamp',
  });

  return (
    <LinearGradient colors={['#fff', '#f8e9c1']} style={styles.container}>
      <Animated.Text
        style={[
          styles.welcomeText,
          {
            fontSize: fontSize,
            transform: [{translateY: fontSize}, {translateX: welcomePosition}],
            textAlign: 'center', // Ensure text is centered when it moves
          },
        ]}>
        👋 Hoşgeldin {userName}!
      </Animated.Text>
      <TouchableOpacity
        style={styles.wheelButton}
        onPress={() => console.log('Wheel of Prizes')}>
        <Image source={wheelIcon} style={styles.wheelIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={() => console.log('Notifications')}>
        <Image source={notificationIcon} style={styles.notificationIcon} />
      </TouchableOpacity>
      <Animated.FlatList
        data={services}
        keyExtractor={item => item.key}
        numColumns={1}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.gridItem} onPress={showAlert}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.gridText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        style={styles.grid}
        contentContainerStyle={styles.contentContainer} // Add this line
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
        <TouchableOpacity style={styles.navItem} onPress={showAlert}>
          <Image source={plusIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => console.log('Settings')}>
          <Image source={gearIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
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
  wheelButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
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
    zIndex: 1,
    padding: 5,
  },
  notificationIcon: {
    width: 30,
    height: 30,
  },
  grid: {
    flex: 1, // Ensures it takes available space
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
  icon: {
    width: 30,
    height: 30,
  },
  welcomeText: {
    fontSize: 32,
    color: '#88400d',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 100,
    position: 'absolute', // Fixes the welcome text position
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    overflow: 'hidden',
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
});

export default MainScreen;
