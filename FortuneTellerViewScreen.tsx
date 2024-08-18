import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FortuneTellerViewScreen = ({navigation, route}) => {
  const {fortuneText} = route.params;

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: fortuneText,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Paylaşma hatası', error.message);
    }
  };

  const handleSave = async () => {
    try {
      let savedFortunes = await AsyncStorage.getItem('savedFortunes');
      savedFortunes = savedFortunes ? JSON.parse(savedFortunes) : [];
      savedFortunes.push(fortuneText);
      await AsyncStorage.setItem(
        'savedFortunes',
        JSON.stringify(savedFortunes),
      );
      Alert.alert('Falınız kaydedildi!');
    } catch (error) {
      Alert.alert('Kayıt hatası', error.message);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Fal Yorumunuz</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleSave}>
            <Image source={require('./assets/star.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Image source={require('./assets/share.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fortuneContainer}>
        <Text style={styles.fortuneText}>{fortuneText}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(
            'Navigating back to MainScreen with userData:',
            route.params.userData,
          );
          navigation.navigate('Main', {userData: route.params.userData});
        }}>
        <Text style={styles.buttonText}>Ana Menüye Dön</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf4e4',
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between', // Ensures content is spread across the screen
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 36,
    color: '#88400d',
    fontFamily: 'Nunito-Black',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
  fortuneContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    flex: 1,
  },
  fortuneText: {
    fontSize: 20,
    color: '#88400d',
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Nunito-Variable',
  },
  button: {
    backgroundColor: '#88400d',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  buttonText: {
    fontSize: 24,
    color: '#fcf4e4',
    fontFamily: 'Nunito-Variable',
  },
});

export default FortuneTellerViewScreen;
