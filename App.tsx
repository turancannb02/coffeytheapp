import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import MainScreen from './MainScreen';
import CoffeeCupUploadScreen from './CoffeeCupUploadScreen';
import FortuneLoadingScreen from './FortuneLoadingScreen';
import FortuneTellerViewScreen from './FortuneTellerViewScreen';
import SettingsScreen from './SettingsScreen';
import messaging from '@react-native-firebase/messaging';
import { initializeUser } from './my-backend/initializeUser'; // Adjust the path if necessary

const Stack = createStackNavigator();

const App: React.FC = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token =', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
              name="CoffeeCupUploadScreen"
              component={CoffeeCupUploadScreen}
              options={{ title: 'Fotoğraf Yükle' }}
          />
          <Stack.Screen
              name="FortuneLoadingScreen"
              component={FortuneLoadingScreen}
              options={{ title: 'Fal Yükleniyor' }}
          />
          <Stack.Screen
              name="FortuneTellerViewScreen"
              component={FortuneTellerViewScreen}
              options={{ title: 'Fal Görüntüle' }}
          />
          <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
