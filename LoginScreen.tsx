import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
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
          onPress={() => {
            console.log('Button Pressed. Attempting to navigate.');
            navigation.navigate('Registration');
          }}>
          <Text style={styles.buttonText}>Hemen Başlayın!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fcf4e4', // Light cream background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300, // Increased width
    height: 300, // Increased height
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
    paddingTop: 10, // Adjusted top padding to accommodate larger logo
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
    marginBottom: 100, // Reduced margin to position the button a bit lower
  },
  button: {
    backgroundColor: '#8a4412',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 0,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100, // Ensures button is towards the bottom
  },
  buttonText: {
    color: '#fcf4e4',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
