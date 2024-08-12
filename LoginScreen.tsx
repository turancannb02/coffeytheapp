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
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('SomeScreenForGoogleLogin');
              }}>
              <Image
                source={require('./assets/google_icon.png')} // Make sure you have this icon
                style={styles.iconStyle}
              />
              <Text style={styles.authButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('SomeScreenForFacebookLogin'); // Make sure you have a handler for this
              }}>
              <Image
                source={require('./assets/facebook_icon.png')} // Make sure you have this icon
                style={styles.iconStyle}
              />
              <Text style={styles.authButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>
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
    backgroundColor: '#8a4412',
    padding: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    backgroundColor: '#fcf4e4',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalText: {
    color: '#8a4412',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  authButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: 30,
  },
  authButton: {
    backgroundColor: '#fcf4e4',
    borderRadius: 50,
    padding: 10,
    width: '70%', // Adjust the width so two buttons fit in the same row
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },
  iconStyle: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  authButtonText: {
    color: '#8a4412',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50, // Adjust spacing as needed
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'lightgrey',
  },
  dividerText: {
    width: 30,
    textAlign: 'center',
    color: 'lightgrey',
  },
});

export default LoginScreen;
