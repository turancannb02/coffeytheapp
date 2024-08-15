// SettingsScreen.js
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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';

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

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserDetails(documentSnapshot.data());
        }
      });

    return () => unsubscribe(); // Detach listener on unmount
  }, []);

  const handleUpdate = async () => {
    const {gender, status, sexualInterest, intention} = userDetails;
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .set({gender, status, sexualInterest, intention}, {merge: true});
    Alert.alert('Profil Güncellendi', 'Profiliniz başarıyla güncellendi.');
  };

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
          <Text style={styles.header}>Ayarlar</Text>
        </View>

        <Image
          source={require('./assets/people.png')}
          style={styles.profilePic}
        />

        <View style={styles.form}>
          <Text style={styles.label}>İsim</Text>
          <TextInput
            style={styles.inputNonEditable}
            value={userDetails.name}
            editable={false}
          />

          <Text style={styles.label}>Yaş</Text>
          <TextInput
            style={styles.inputNonEditable}
            value={userDetails.age}
            editable={false}
          />

          <Text style={styles.label}>Cinsiyet</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => handleChange('gender', value)}
            items={[
              {label: 'Erkek', value: 'Erkek'},
              {label: 'Kadın', value: 'Kadın'},
              {label: 'Diğer', value: 'Diğer'},
            ]}
            placeholder={{label: 'Cinsiyet Seçin', value: null}}
          />

          <Text style={styles.label}>İlişki Durumu</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => handleChange('status', value)}
            items={[
              {label: 'Bekar', value: 'Bekar'},
              {label: 'Evli', value: 'Evli'},
              {label: 'Nişanlı', value: 'Nişanlı'},
              {label: 'Boşanmış', value: 'Boşanmış'},
              {label: 'Karmaşık', value: 'Karmaşık'},
            ]}
            placeholder={{label: 'İlişki Durumunuzu Seçin', value: null}}
          />

          <Text style={styles.label}>İlgi Alanı</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => handleChange('sexualInterest', value)}
            items={[
              {label: 'Erkekler', value: 'Erkekler'},
              {label: 'Kadınlar', value: 'Kadınlar'},
              {label: 'Diğer', value: 'Diğer'},
            ]}
            placeholder={{label: 'İlgi Alanınızı Seçin', value: null}}
          />
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Profil Güncelle</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Sorunuz mu var? Lütfen{' '}
          <Text style={styles.emailLink} onPress={handleEmail}>
            xyz@gmail.com
          </Text>
          'a mail yazınız.
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
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
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
    elevation: 5,
  },
  updateButton: {
    backgroundColor: '#8a4412',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  updateButtonText: {
    fontSize: 24,
    color: '#fcf4e4',
    fontFamily: 'Nunito-Black',
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
    elevation: 5,
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
