import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.background}>
      <Image
        source={require('./assets/app_logo_1.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Hoşgeldiniz!</Text>
        <Text style={styles.descriptionText}>
          Elinizin altındaki falcıyla hemen falınızı öğrenin.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Hemen Başlayın!</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('SomeScreenForGoogleLogin');
            }}>
            <Text style={styles.modalText}>Google ile Giriş Yapınız</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('HomeScreen');
            }}>
            <Text style={styles.modalText}>Üyeliksiz Devam Et</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fcf4e4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  welcomeText: {
    color: '#8a4412',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descriptionText: {
    color: '#8a4412',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#8a4412',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 0,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  buttonText: {
    color: '#fcf4e4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fcf4e4',
    padding: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    backgroundColor: '#8a4412',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalText: {
    color: '#fcf4e4',
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
