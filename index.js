/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/Language/i18n';
import 'intl-pluralrules';
import {Provider} from 'react-redux';
import {store} from './src/Services/redux/store';
// import {initializeApp} from '@react-native-firebase/app';

// Initialize Firebase
// initializeApp();
// import messaging from '@react-native-firebase/messaging';
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);

// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
// console.log('Message handled in the background!', remoteMessage);
// });
