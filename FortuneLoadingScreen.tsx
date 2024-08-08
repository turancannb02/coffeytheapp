// FortuneLoadingScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import getFortuneText from './getFortuneText'; // Import the API request function
import { getZodiacSign } from './zodiacUtils'; // Import the utility function

const FortuneLoadingScreen = ({ navigation, route }) => {
  const { images, userData } = route.params; // Extract userData and images
  const [loading, setLoading] = useState(true);
  const [fortuneReady, setFortuneReady] = useState(false);
  const [fortuneText, setFortuneText] = useState('');

  useEffect(() => {
    // Fetch fortune when the component mounts
    fetchFortune();
  }, []);

  const fetchFortune = async () => {
    try {
      console.log('User Data:', userData); // Debugging line
      const zodiacSign = getZodiacSign(new Date(userData.birthday));
      // Construct the prompt using the images and user data
      const prompt = `Görselleri bir falcı gibi yorumla. Kullanıcının adı ${userData.name}, yaşı ${userData.age}, cinsiyeti ${userData.gender}, ilgi alanı ${userData.sexualInterest}, ilişki durumu ${userData.status}, falın amacı ${userData.intention}, ve burcu ${zodiacSign}. Samimi bir dil kullan ve kullanıcıların duymak isteyeceği şeyleri belirt. Yorumlamayı profesyonel yap ve genel olarak giriş, gelişme ve sonuç paragraflarından oluşsun istiyorum.`;

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

  return (
    <View style={styles.container}>
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
            navigation.navigate('FortuneTellerViewScreen', { fortuneText })
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
  loadingText: {
    fontSize: 16,
    color: '#88400d',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 2,
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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
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
