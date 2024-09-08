import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
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
          <Text style={styles.modalWelcomeText}>
            Falınızı öğrenmeye hazır mısınız?
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('Registration');
            }}>
            <Text style={styles.modalText}>Üyeliksiz Devam Et</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// @ts-ignore
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
    fontSize: 54,
    fontFamily: 'Nunito-Black',
    fontWeight: '900',
    marginBottom: 30,
  },
  descriptionText: {
    color: '#8a4412',
    fontSize: 20,
    fontFamily: 'Nunito-Black',
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fcf4e4',
    fontSize: 24,
    fontFamily: 'Nunito-Black',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#8a4412',
    padding: 30,
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalWelcomeText: {
    color: '#fcf4e4',
    fontSize: 24,
    fontFamily: 'Nunito-Black',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#fcf4e4',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  modalText: {
    color: '#8a4412',
    textAlign: 'center',
    fontFamily: 'Nunito-Black',
    fontSize: 20,
  },
});

export default LoginScreen;
