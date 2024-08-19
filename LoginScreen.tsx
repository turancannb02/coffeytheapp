import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '523532096471-lf9fvd32luk7e0rtsnu3fjv1pnqou8lv.apps.googleusercontent.com', // Replace with your web client ID
});

const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    navigation.navigate('HomeScreen');
  } catch (error) {
    console.error('Google Sign-In Error: ', error);
    alert('Google Sign-In failed. Please try again.');
  }
};


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
              onPress={onGoogleButtonPress}>
              <Image
                source={require('./assets/google_icon.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.authButtonText}>Google ile Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('SomeScreenForFacebookLogin');
              }}>
              <Image
                source={require('./assets/facebook_icon.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.authButtonText}>Facebook ile Giriş Yapınız</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ya da</Text>
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
    fontWeight: '1000',
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
    padding: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    backgroundColor: '#fcf4e4',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
  authButtonsContainer: {
    flexDirection: 'column', // Change to column
    justifyContent: 'center', // Center the buttons vertically
    alignItems: 'center', // Center the buttons horizontally
  },
  authButton: {
    backgroundColor: '#fcf4e4',
    borderRadius: 50,
    padding: 10,
    width: 350, // Make the buttons full width
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10, // Add margin between buttons
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  authButtonText: {
    color: '#8a4412',
    textAlign: 'center',
    fontFamily: 'Nunito-Black',
    fontSize: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50, // Adjust spacing as needed
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  dividerText: {
    width: 70,
    textAlign: 'center',
    color: 'lightgrey',
    fontFamily: 'Nunito-Black',
    fontSize: 20,
  },
});

export default LoginScreen;
