import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import getFortuneText from './getFortuneText'; // Assuming this is the function that fetches the fortune
import {getZodiacSign} from './zodiacUtils'; // Adjust the path if necessary
import { saveFortune } from './authService'; // Import saveFortune from authService

const FortuneLoadingScreen = ({navigation, route}) => {
  const {userData} = route.params;
  const [loading, setLoading] = useState(true);
  const [fortuneReady, setFortuneReady] = useState(false);
  const [fortuneText, setFortuneText] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchFortune = async () => {
      try {
        console.log('User Data:', userData);

        const currentUser = auth().currentUser;
        if (currentUser) {
          setUserId(currentUser.uid);
        } else {
          console.error("No user is currently signed in.");
        }

        const zodiacSign = getZodiacSign(new Date(userData.birthday));
        const prompt = `Görselleri bir falcı gibi yorumla. Kullanıcı: ${userData.name}, yaş: ${userData.age}, cinsiyet: ${userData.gender}, ilgi alanı: ${userData.sexualInterest}, ilişki durumu: ${userData.status}, falını amaçla ${userData.intention}, ve burcu ${zodiacSign}. Samimi bir dil kullan ve kullanıcının isteklerine uygun bir fal sun.`;

        const responseText = await getFortuneText(prompt);
        if (responseText) {
          console.log("FORTUNE_OUTPUT:", responseText);  // Log the fortune output
          setFortuneText(responseText);

          // Save the fortune to Firestore
          if (userId) {
            await saveFortune(userId, responseText)
                .then(() => {
                  console.log('Fortune saved to Firestore successfully');
                })
                .catch((error) => {
                  console.error('Error saving fortune to Firestore:', error);
                });
          } else {
            console.error("User ID is missing, cannot save fortune.");
          }
        } else {
          throw new Error('Failed to get a valid response from OpenAI.');
        }
      } catch (error) {
        console.error('Error fetching fortune:', error);
      }
    };

    fetchFortune();
  }, [userData]);

  const navigateToFortuneTeller = () => {
    if (userId) {
      navigation.navigate('FortuneTellerViewScreen', {
        userId: userId,
        fortuneText: fortuneText,
        userData: userData, // Pass userData here
      });
    } else {
      console.error('User ID is missing, cannot navigate.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/women_holding_coffee_cup.png')}
        style={styles.image}
      />
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#88400d" />
          <Text style={styles.loadingText}>
            Lütfen bekleyin, falınız hazırlanıyor...
          </Text>
        </>
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            fortuneReady ? styles.buttonActive : styles.buttonDisabled,
          ]}
          onPress={navigateToFortuneTeller}
          disabled={!fortuneReady}>
          <Text style={styles.buttonText}>Falın Görüntüle!</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcf4e4',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 20,
    color: '#88400d',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fcf4e4',
    fontFamily: 'Nunito-Black',
  },
  buttonActive: {
    backgroundColor: '#88400d',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default FortuneLoadingScreen;
