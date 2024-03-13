import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import usePushNotification from './src/utils/PushNotification_helper';
import {SafeAreaView, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation/index';
//import {Provider} from 'react-redux';
//import {store} from './src/Services/redux/store';
//import Languages from './src/Language/i18n';
//import {getFromLocalStorage, setItemInLocalStorage} from './src/Services/Api';
// import notifee from '@notifee/react-native';

const App = () => {
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
    // listenToBackgroundNotifications();
  }, []);
  return (
    //<Provider store={store}>
    //<SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
    //</SafeAreaView>
    //</Provider>
  );
};

export default App;
// // const {
//   requestUserPermission,
//   getFCMToken,
//   listenToBackgroundNotifications,
//   listenToForegroundNotifications,
//   onNotificationOpenedAppFromBackground,
//   onNotificationOpenedAppFromQuit,
// } = usePushNotification();

// useEffect(() => {
//   const listenToNotifications = () => {
//     try {
//       getFCMToken();
//       requestUserPermission();
//       onNotificationOpenedAppFromQuit();
//       listenToBackgroundNotifications();
//       listenToForegroundNotifications();
//       onNotificationOpenedAppFromBackground();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   listenToNotifications();
// }, []);

// import React, {useEffect} from 'react';
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {useTranslation} from 'react-i18next';
// import i18n from 'i18next';
// import {initReactI18next} from 'react-i18next';
// import en from './src/Language/english';
// import ar from './src/Language/arabic';
// // Initialize i18next
// i18n.use(initReactI18next).init({
//   resources: {
//     en: {translation: en},
//     ar: {translation: ar},
//   },
//   lng: 'en', // default language
//   fallbackLng: 'en',
//   interpolation: {
//     escapeValue: false,
//   },
// });
// const App = () => {
//   const {t, i18n} = useTranslation();
//   const changeLng = lng => {
//     i18n.changeLanguage(lng);
//   };
//   return (
//     <View style={{flex: 1, backgroundColor: 'gray'}}>
//       <TouchableOpacity onPress={() => changeLng('en')} style={styles.button}>
//         <Text style={styles.buttonText}>English</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => changeLng('ar')} style={styles.button}>
//         <Text style={styles.buttonText}>Arabic</Text>
//       </TouchableOpacity>
//       <Text style={styles.text}>{t('started')}</Text>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   // ... your existing styles ...
//   button: {
//     backgroundColor: '#6258E8',
//     padding: 10,
//     borderRadius: 3,
//     margin: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   text: {
//     marginBottom: 100,
//     fontSize: 18,
//     color: 'white',
//     textAlign: 'center',
//   },
//   // ... any other styles ...
// });
// export default App;
