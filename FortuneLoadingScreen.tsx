import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image, // Import the Image component
} from 'react-native';
import getFortuneText from './getFortuneText';
import { getZodiacSign } from './zodiacUtils';
import messaging from '@react-native-firebase/messaging';

const FortuneLoadingScreen = ({ navigation, route }) => {
  const { images, userData } = route.params;
  const [loading, setLoading] = useState(true);
  const [fortuneReady, setFortuneReady] = useState(false);
  const [fortuneText, setFortuneText] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    console.log('FortuneLoadingScreen received userData:', userData);
    fetchFortune();
  }, []);

  const fetchFortune = async () => {
    try {
      console.log('User Data:', userData);
      const zodiacSign = getZodiacSign(new Date(userData.birthday));
      const prompt = 'Görselleri bir falcı gibi yorumla. Kullanıcının adı ${userData.name}, yaşı ${userData.age}, cinsiyeti ${userData.gender}, ilgi alanı ${userData.sexualInterest}, ilişki durumu ${userData.status}, falın amacı ${userData.intention}, ve burcu ${zodiacSign}. Samimi bir dil kullan ve kullanıcıların duymak isteyeceği şeyleri belirt. Yorumlamayı profesyonel yap ve genel olarak giriş, gelişme ve sonuç paragraflarından oluşsun istiyorum.';

      const responseText = await getFortuneText(prompt);
      if (responseText) {
        setFortuneText(responseText);
        setFortuneReady(true);
      } else {
        throw new Error('Failed to get a valid response from OpenAI.');
      }
    } catch (error) {
      console.error('Error fetching fortune:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendNotificationToBackend = async (token, fortuneText) => {
    try {
      const response = await fetch('http://your-server-ip:3000/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          title: 'Your Fortune is Ready!',
          body: 'Tap to read your fortune.',
        }),
      });

      if (response.ok) {
        console.log('Notification request sent successfully!');
      } else {
        console.error('Failed to send notification request.');
      }
    } catch (error) {
      console.error('Error sending notification request:', error);
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
                Lütfen bekleyin, falınız hazırlanıyor... 🌟
              </Text>
            </>
        ) : (
            <TouchableOpacity
                style={[
                  styles.button,
                  fortuneReady ? styles.buttonActive : styles.buttonDisabled,
                ]}
                onPress={() =>
                    navigation.navigate('FortuneTellerViewScreen', { fortuneText, userData })
                }
                disabled={!fortuneReady}
            >
              <Text style={styles.buttonText}>Falı Görüntüle! 🔮</Text>
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
    width: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    resizeMode: 'contain', // Keep the aspect ratio
    marginBottom: 20, // Spacing between the image and the loading indicator
  },
  loadingText: {
    fontSize: 20,
    color: '#88400d',
    marginTop: 20,
    fontFamily: 'Nunito-Black',
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 20,
    borderWidth: 0,
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
    fontSize: 20,
    color: '#fcf4e4',
    fontFamily: 'Nunito-Black',
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

export default FortuneLoadingScreen;
