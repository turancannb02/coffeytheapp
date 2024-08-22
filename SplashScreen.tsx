import React, {useEffect, useMemo} from 'react';
import {View, StyleSheet, Animated, ImageBackground, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(1.2), []);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        const animations = Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1,
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
            navigation.navigate('Main');
          } else {
            navigation.navigate('Login');
          }
        });

        return () => animations.stop();
      } catch (error) {
        console.error('Error checking user status:', error);
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
                opacity: fadeAnim,
                transform: [{scale: scaleAnim}],
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
