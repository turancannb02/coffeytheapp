// RegistrationScreen.js

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {signInAnonymously, saveUserData} from './authService';
import {useUser} from './UserContext'; // Import the useUser hook

const RegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [sexualInterest, setSexualInterest] = useState('');
  const [intention, setIntention] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [isFormValid, setIsFormValid] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const {setUserData} = useUser(); // Get the setUserData function from UserContext

  const checkFormValidity = () => {
    setIsFormValid(
      name.trim() !== '' && age.trim() !== '' && parseInt(age, 10) > 0,
    );
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setBirthday(currentDate);
    setShowDatePicker(false);
  };

  const handleBack = () => {
    Alert.alert(
      'Çıkış Yap',
      'Emin misiniz? İptal ederseniz girdiğiniz bilgiler silinecektir.',
      [
        {text: 'İptal', style: 'cancel'},
        {text: 'Evet', onPress: () => navigation.goBack()},
      ],
    );
  };

  const handleRegister = async () => {
    setIsLoading(true);

    try {
      const {userId, deviceDetails} = await signInAnonymously();

      if (userId && deviceDetails) {
        const userData = {
          name: name.trim(),
          age: age.trim(),
          gender: gender.trim(),
          status: status.trim(),
          sexualInterest: sexualInterest.trim(),
          intention: intention.trim(),
          birthday: birthday.toISOString(),
        };

        console.log('UserData before saving:', userData);

        await saveUserData(userId, userData, deviceDetails);

        console.log('Navigating to Main with userData:', userData);

        setUserData(userData); // Save user data in context

        navigation.navigate('Main'); // No need to pass userData, it's in the context
      } else {
        Alert.alert(
          'Registration Error',
          'Unable to register. Please try again.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred during registration. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
            <Image
              source={require('./assets/close.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Kişisel Bilgiler</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>İsim</Text>
          <TextInput
            style={styles.input}
            placeholder="İsim"
            value={name}
            onChangeText={setName}
            onEndEditing={checkFormValidity}
            editable={!isLoading} // Disable input during loading
          />

          <Text style={styles.label}>Yaş</Text>
          <TextInput
            style={styles.input}
            placeholder="Yaş"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            onEndEditing={checkFormValidity}
            editable={!isLoading} // Disable input during loading
          />

          <Text style={styles.label}>Doğum Tarihi</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
            disabled={isLoading} // Disable button during loading
          >
            <Text>{formatDate(birthday)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={birthday}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Cinsiyet</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={setGender}
            items={[
              {label: 'Erkek', value: 'Erkek'},
              {label: 'Kadın', value: 'Kadın'},
              {label: 'Diğer', value: 'Diğer'},
            ]}
            placeholder={{label: 'Cinsiyet Seçin', value: null}}
            disabled={isLoading} // Disable picker during loading
          />

          <Text style={styles.label}>İlişki Durumu</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={setStatus}
            items={[
              {label: 'Bekar', value: 'Bekar'},
              {label: 'Evli', value: 'Evli'},
              {label: 'Nişanlı', value: 'Nişanlı'},
              {label: 'Boşanmış', value: 'Boşanmış'},
              {label: 'Karmaşık', value: 'Karmaşık'},
              {label: 'Diğer', value: 'Diğer'},
            ]}
            placeholder={{label: 'İlişki Durumunuzu Seçin', value: null}}
            disabled={isLoading} // Disable picker during loading
          />

          <Text style={styles.label}>İlgi Alanı</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={setSexualInterest}
            items={[
              {label: 'Erkekler', value: 'Erkekler'},
              {label: 'Kadınlar', value: 'Kadınlar'},
              {label: 'Diğer', value: 'Diğer'},
            ]}
            placeholder={{label: 'İlgi Alanınızı Seçin', value: null}}
            disabled={isLoading} // Disable picker during loading
          />

          <Text style={styles.label}>Falın Amacı</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={setIntention}
            items={[
              {label: 'Genel', value: 'Genel'},
              {label: 'Aşk', value: 'Aşk'},
              {label: 'Kariyer', value: 'Kariyer'},
              {label: 'Sağlık', value: 'Sağlık'},
            ]}
            placeholder={{label: 'Falın Amacını Seçin', value: null}}
            disabled={isLoading} // Disable picker during loading
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            isFormValid ? styles.buttonActive : styles.buttonInactive,
          ]}
          onPress={handleRegister}
          disabled={!isFormValid || isLoading}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          )}
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 36,
    fontFamily: 'Nunito-Black',
    color: '#8a4412',
  },
  label: {
    fontSize: 18,
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
    borderColor: 'black',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  datePickerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Nunito-Black',
  },
  buttonActive: {
    backgroundColor: '#fcf4e4',
  },
  buttonInactive: {
    backgroundColor: 'darkgrey',
  },
  closeIcon: {
    width: 40,
    height: 40,
    tintColor: '#8a4412',
  },
  closeButton: {
    position: 'absolute',
    left: 15,
    top: 20,
    zIndex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: '#8a4412',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 30,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 30,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    marginBottom: 15,
  },
};

export default RegistrationScreen;
