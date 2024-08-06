import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Modal,
  Button,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [sexualInterest, setSexualInterest] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [birthTime, setBirthTime] = useState(new Date());
  const [isFormValid, setIsFormValid] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const checkFormValidity = () => {
    setIsFormValid(
      name.trim() !== '' && age.trim() !== '' && parseInt(age, 10) > 0,
    );
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setBirthday(currentDate);
    setDatePickerVisible(Platform.OS === 'ios'); // Ensures the picker disappears after selection on Android
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || birthTime;
    setBirthTime(currentTime);
    setTimePickerVisible(Platform.OS === 'ios'); // Ensures the picker disappears after selection on Android
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Kişisel Bilgiler</Text>
        <TextInput
          style={styles.input}
          placeholder="İsim"
          value={name}
          onChangeText={text => {
            setName(text);
            checkFormValidity();
          }}
        />
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

        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={value => {
            setStatus(value);
          }}
          items={[
            {label: 'Bekar', value: 'Bekar'},
            {label: 'Evli', value: 'Evli'},
            {label: 'Boşanmış', value: 'Boşanmış'},
            {label: 'Karmaşık', value: 'Karmaşık'},
            {label: 'Diğer', value: 'Diğer'},
          ]}
          placeholder={{label: 'Durum Seçin', value: null}}
        />

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
          placeholder={{label: 'İlgi Alanınızı Seçin', value: null}}
        />

        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={value => {
            setSexualInterest(value);
          }}
          items={[
            {label: 'Aşk', value: 'Aşk'},
            {label: 'Kariyer', value: 'Kariyer'},
            {label: 'Sağlık', value: 'Sağlık'},
          ]}
          placeholder={{label: 'Falın Amacını Seçin', value: null}}
        />

        <TouchableOpacity
          style={[styles.button, styles.buttonActive]}
          onPress={() => setDatePickerVisible(true)}>
          <Text style={styles.buttonText}>Doğum Tarihi Seç</Text>
        </TouchableOpacity>
        <Text
          style={
            styles.dateDisplay
          }>{`Seçilen Tarih: ${birthday.toLocaleDateString()}`}</Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonActive]}
          onPress={() => setTimePickerVisible(true)}>
          <Text style={styles.buttonText}>Doğum Saati Seç</Text>
        </TouchableOpacity>
        <Text
          style={
            styles.dateDisplay
          }>{`Seçilen Saat: ${birthTime.toLocaleTimeString()}`}</Text>

        {datePickerVisible && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={datePickerVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={birthday}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                />
                <Button
                  title="Tamam"
                  onPress={() => setDatePickerVisible(false)}
                />
              </View>
            </View>
          </Modal>
        )}

        {timePickerVisible && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={timePickerVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DateTimePicker
                  testID="timePicker"
                  value={birthTime}
                  mode="time"
                  display="spinner"
                  is24Hour={true}
                  onChange={handleTimeChange}
                />
                <Button
                  title="Tamam"
                  onPress={() => setTimePickerVisible(false)}
                />
              </View>
            </View>
          </Modal>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            isFormValid ? styles.buttonActive : styles.buttonInactive,
          ]}
          onPress={() => {
            if (isFormValid) {
              navigation.navigate('NextScreen');
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
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonActive: {
    backgroundColor: '#88400d',
  },
  buttonInactive: {
    backgroundColor: '#ccc',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateDisplay: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
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
    paddingRight: 30,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    marginBottom: 15,
  },
};

export default RegistrationScreen;
