import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Animated, ImageBackground, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(1.2), []); // Starting bigger and shrinking down

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        const animations = Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1, // Animate scale to normal size
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]);

        animations.start(() => {
          if (userToken) {
            console.log('User token found:', userToken);
            navigation.navigate('Main');
          } else {
            console.log('No user token found, navigating to Login');
            navigation.navigate('Login');
          }
        });

        return () => animations.stop(); // Clean up the animation on unmount
      } catch (error) {
        console.error('Error checking user status:', error);
        // Handle any errors appropriately (e.g., navigate to an error screen)
      }
    };

    checkUserStatus();
  }, [navigation, fadeAnim, scaleAnim]);

  return (
      <ImageBackground
          source={require('./assets/background-3.png')}
          style={styles.background}
          resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.splashContainer}>
            <Animated.Text
                style={[
                  styles.title,
                  {
                    opacity: fadeAnim, // Fade in the text
                    transform: [{ scale: scaleAnim }], // Scale the text
                  },
                ]}>
              Coffey'e Hoşgeldiniz!
            </Animated.Text>
          </View>
        </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default SplashScreen;
