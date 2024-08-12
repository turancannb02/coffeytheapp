// App.tsx
import React from 'react';
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

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
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
          options={{title: 'Fotoğraf Yükle'}}
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
  );
};

export default App;
