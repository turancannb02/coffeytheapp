import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Animated, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from './authService';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(1.2), []); // Start larger

  useEffect(() => {
    // Start the animation
    const animations = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale to normal size
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    animations.start(async () => {
      const userData = await getUserData();
      if (userData) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main', params: { userData } }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    });

    return () => animations.stop(); // Clean up the animation on unmount
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
