import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [sexualInterest, setSexualInterest] = useState('');
  const [intension, setIntension] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [isFormValid, setIsFormValid] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of the DatePicker

  const checkFormValidity = () => {
    setIsFormValid(
      name.trim() !== '' && age.trim() !== '' && parseInt(age, 10) > 0,
    );
  };

  // Handle date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setBirthday(currentDate);
    setShowDatePicker(false); // Hide picker after selection
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Kişisel Bilgiler</Text>

        <Text style={styles.label}>İsim</Text>
        <TextInput
          style={styles.input}
          placeholder="İsim"
          value={name}
          onChangeText={text => {
            setName(text);
            checkFormValidity();
          }}
        />

        <Text style={styles.label}>Yaş</Text>
        <TextInput
          style={styles.input}
          placeholder="Yaş"
          keyboardType="numeric"
          value={age}
          onChangeText={text => {
            setAge(text);
            checkFormValidity();
          }}
        />

        <Text style={styles.label}>Doğum Tarihi</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}>
          <Text>{birthday.toLocaleDateString()}</Text>
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
          onValueChange={value => {
            setGender(value);
          }}
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
          onValueChange={value => setStatus(value)}
          items={[
            {label: 'Bekar', value: 'Bekar'},
            {label: 'Evli', value: 'Evli'},
            {label: 'Boşanmış', value: 'Boşanmış'},
            {label: 'Karmaşık', value: 'Karmaşık'},
            {label: 'Diğer', value: 'Diğer'},
          ]}
          placeholder={{label: 'İlişki Durumunuzu Seçin', value: null}}
        />
        <Text style={styles.label}>İlgi Alanı</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={value => {
            setSexualInterest(value);
          }}
          items={[
            {label: 'Erkek', value: 'Erkek'},
            {label: 'Kadın', value: 'Kadın'},
            {label: 'Diğer', value: 'Diğer'},
          ]}
          placeholder={{label: 'İlgi Alanınızı Seçin', value: null}}
        />
        <Text style={styles.label}>Falın Amacı</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={value => {
            setIntension(value);
          }}
          items={[
            {label: 'Aşk', value: 'Aşk'},
            {label: 'Kariyer', value: 'Kariyer'},
            {label: 'Sağlık', value: 'Sağlık'},
          ]}
          placeholder={{label: 'Falın Amacını Seçin', value: null}}
        />

        <TouchableOpacity
          style={[
            styles.button,
            isFormValid ? styles.buttonActive : styles.buttonInactive,
          ]}
          onPress={() => {
            if (isFormValid) {
              navigation.navigate('Main', {userName: name});
            }
          }}
          disabled={!isFormValid}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fcf4e4',
  },
  form: {
    marginTop: 70,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    color: '#8a4412',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8a4412',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  datePicker: {
    marginBottom: 20,
    backgroundColor: '#fcf4e4',
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  datePickerButton: {
    // Style for the button that triggers the DatePicker
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonActive: {
    backgroundColor: '#88400d',
  },
  buttonInactive: {
    backgroundColor: '#ccc',
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
