/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './firebaseConfig.js';  // Make sure this path is correct
import notificationService from './NotificationService';

// Register the main component of the app
AppRegistry.registerComponent(appName, () => App);

notificationService.start();
