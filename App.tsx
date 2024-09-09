import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import MainScreen from './MainScreen';
import CoffeeCupUploadScreen from './CoffeeCupUploadScreen';
import FortuneLoadingScreen from './FortuneLoadingScreen';
import FortuneTellerViewScreen from './FortuneTellerViewScreen';
import SettingsScreen from './SettingsScreen';
import {UserProvider} from './UserContext';
import notificationService from './NotificationService';
import mobileAds from 'react-native-google-mobile-ads';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    notificationService.start();
      mobileAds()
          .initialize()
          .then(adapterStatuses => {
              console.log('AdMob initialized', adapterStatuses);
          });
  }, []);


  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
            name="CoffeeCupUploadScreen"
            component={CoffeeCupUploadScreen}
            options={{title: 'Falı Yükle'}}
          />
          <Stack.Screen
            name="FortuneLoadingScreen"
            component={FortuneLoadingScreen}
            options={{title: 'Fal Yükleniyor'}}
          />
          <Stack.Screen
            name="FortuneTellerViewScreen"
            component={FortuneTellerViewScreen}
            options={{title: 'Fal Görüntüle'}}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{title: 'Settings'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
