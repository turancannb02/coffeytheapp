import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  Linking,
  ActivityIndicator,
  Picker,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import {checkSignInStatus} from './authService'; 
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({
    name: '',
    age: '',
    gender: '',
    status: '',
    sexualInterest: '',
    intention: '',
    birthday: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false); 
  const [language, setLanguage] = useState('tr');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const userDoc = await firestore()
            .collection('test-users')
            .doc(userId)
            .get();
          if (userDoc.exists) {
            setUserDetails(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const checkUserStatus = async () => {
      const {isSignedIn, userId} = await checkSignInStatus();
      setIsAnonymous(isSignedIn && !userId);
    };

    fetchUserData();
    checkUserStatus();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('language').then(lang => {
      if (lang) setLanguage(lang);
    });
  }, []);

  const handleLanguageChange = async (lang) => {
    setLanguage(lang);
    await AsyncStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert(
        'Logout Error',
        'An error occurred during logout. Please try again.',
      );
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const {gender, status, sexualInterest, intention} = userDetails;
    try {
      await firestore()
        .collection('test-users')
        .doc(auth().currentUser.uid)
        .set({gender, status, sexualInterest, intention}, {merge: true});
      Alert.alert('Profil Güncellendi', 'Profiliniz başarıyla güncellendi.');
    } catch (error) {
      Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };
  /*
  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const userId = await AsyncStorage.getItem('userId');
              if (userId) {
                await firestore().collection('test-users').doc(userId).delete();
                await auth().currentUser.delete();
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userId');
                navigation.navigate('Login');
              }
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert(
                'Delete Account Error',
                'An error occurred while deleting your account. Please try again.',
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };
*/
  const handleChange = (name, value) => {
    setUserDetails(prevDetails => ({...prevDetails, [name]: value}));
  };

  const handleEmail = () => {
    Linking.openURL('mailto:xyz@gmail.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('./assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.header}>{t('Ayarlar')}</Text>
        </View>

        <Image
          source={require('./assets/people.png')}
          style={styles.profilePic}
        />

        <View style={styles.form}>
          <Text style={styles.label}>{t('İsim')}</Text>
          <TextInput
            style={styles.inputNonEditable}
            value={userDetails.name}
            editable={false}
          />

          <Text style={styles.label}>{t('Yaş')}</Text>
          <TextInput
            style={styles.inputNonEditable}
            value={userDetails.age}
            editable={false}
          />

          <Text style={styles.label}>{t('Cinsiyet')}</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => handleChange('gender', value)}
            items={[
              {label: t('Erkek'), value: 'Erkek'},
              {label: t('Kadın'), value: 'Kadın'},
              {label: t('Diğer'), value: 'Diğer'},
            ]}
            placeholder={{label: t('Cinsiyet Seçin'), value: null}}
            value={userDetails.gender}
          />

          <Text style={styles.label}>{t('İlişki Durumu')}</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => handleChange('status', value)}
            items={[
              {label: t('Bekar'), value: 'Bekar'},
              {label: t('Evli'), value: 'Evli'},
              {label: t('Nişanlı'), value: 'Nişanlı'},
              {label: t('Boşanmış'), value: 'Boşanmış'},
              {label: t('Karmaşık'), value: 'Karmaşık'},
            ]}
            placeholder={{label: t('İlişki Durumunuzu Seçin'), value: null}}
            value={userDetails.status}
          />

          <Text style={styles.label}>{t('İlgi Alanı')}</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => handleChange('sexualInterest', value)}
            items={[
              {label: t('Erkekler'), value: 'Erkekler'},
              {label: t('Kadınlar'), value: 'Kadınlar'},
              {label: t('Diğer'), value: 'Diğer'},
            ]}
            placeholder={{label: t('İlgi Alanınızı Seçin'), value: null}}
            value={userDetails.sexualInterest}
          />

          <Text style={styles.label}>Dil / Language</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={handleLanguageChange}
            items={[
              {label: 'Türkçe', value: 'tr'},
              {label: 'English', value: 'en'},
            ]}
            placeholder={{label: 'Dil Seçin / Select Language', value: null}}
            value={language}
          />

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdate}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.updateButtonText}>Profil Güncelle</Text>
            )}
          </TouchableOpacity>

          {!isAnonymous && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Text style={styles.updateButtonText}>Çıkış Yap</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.footerText}>
          {t('Sorunuz mu var?')} {t('Lütfen')}{' '}
          <Text style={styles.emailLink} onPress={handleEmail}>
            xyz@gmail.com
          </Text>
          {' '}{t("'a mail yazınız.")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf4e4',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    padding: 20,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 40,
    height: 40,
    tintColor: '#8a4412',
  },
  header: {
    fontSize: 36,
    fontFamily: 'Nunito-Black',
    left: 75,
    color: '#8a4412',
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Nunito-Black',
    color: '#8a4412',
    marginBottom: 10,
  },
  inputNonEditable: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    color: '#6c757d',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  updateButton: {
    backgroundColor: '#8a4412',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    // Add shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // for Android
  },
  updateButtonText: {
    fontSize: 24,
    color: '#fcf4e4',
    fontFamily: 'Nunito-Black',
  },
  deleteButton: {
    backgroundColor: 'rgba(255,0,0,0.87)',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
    color: '#6c757d',
    fontFamily: 'Nunito-Variable',
  },
  emailLink: {
    color: '#0000ee',
    textDecorationLine: 'underline',
  },
  logoutButton: {
    backgroundColor: '#e63946',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    // Add shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // for Android
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
};

export default SettingsScreen;
