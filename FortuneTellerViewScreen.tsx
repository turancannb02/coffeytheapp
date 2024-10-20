import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const FortuneTellerViewScreen = ({ navigation, route }) => {
  const { fortuneText, userData, updateSavedFortunes } = route.params;
  const [savedFortunes, setSavedFortunes] = useState([]);
  const [processedFortuneText, setProcessedFortuneText] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const loadSavedFortunes = async () => {
      try {
        const storedFortunes = await AsyncStorage.getItem('savedFortunes');
        if (storedFortunes) {
          setSavedFortunes(JSON.parse(storedFortunes));
        }
      } catch (error) {
        console.error('Error loading saved fortunes:', error);
      }
    };

    loadSavedFortunes();
    processFortuneText();
  }, []);

  const processFortuneText = () => {
    let processed = fortuneText;
    // Remove markdown formatting
    processed = processed.replace(/\*\*/g, '');
    // Replace placeholders with actual user data
    processed = processed.replace(/\${userData\.name}/g, userData.name);
    processed = processed.replace(/\${userData\.age}/g, userData.age);
    processed = processed.replace(/\${userData\.gender}/g, userData.gender);
    processed = processed.replace(/\${userData\.status}/g, userData.status);
    processed = processed.replace(/\${userData\.sexualInterest}/g, userData.sexualInterest);
    processed = processed.replace(/\${userData\.intention}/g, userData.intention);
    processed = processed.replace(/\${zodiacSign}/g, userData.zodiacSign);
    setProcessedFortuneText(processed);
  };

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
      Alert.alert('Sharing error', error.message);
    }
  };

  const handleSave = async () => {
    try {
      const updatedFortunes = [...savedFortunes, fortuneText];
      await AsyncStorage.setItem('savedFortunes', JSON.stringify(updatedFortunes));
      setSavedFortunes(updatedFortunes);
      Alert.alert('Your fortune has been saved!');
    } catch (error) {
      Alert.alert('Saving error', error.message);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your Fortune</Text>
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
        <Text style={styles.fortuneText}>{processedFortuneText}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Main', { userData })}>
        <Text style={styles.buttonText}>Return to Main Screen</Text>
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
    justifyContent: 'space-between',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    width: '100%',
  },
  buttonText: {
    fontSize: 24,
    color: '#fcf4e4',
    fontFamily: 'Nunito-Variable',
  },
});

export default FortuneTellerViewScreen;
