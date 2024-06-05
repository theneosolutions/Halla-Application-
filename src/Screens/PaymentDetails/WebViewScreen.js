import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {getFromLocalStorage} from '../../Services/Api'; // Assuming you have a function to get data from local storage
import {useNavigation} from '@react-navigation/native';
const WebViewScreen = ({route}) => {
  const navigation = useNavigation();
  const {packageData} = route.params;
  const {price, name, id} = packageData;
  const [userid, setUserId] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('dddpppppppWEB------', packageData);
  console.log('userid', userid);

  useEffect(() => {
    const fetchUserIdFromLocalStorage = async () => {
      // setLoading(true);
      try {
        const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
        setLoading(false);
        // Assuming 'userId' is the key used to store the userid in local storage
        setUserId(userInfo.id);
      } catch (error) {
        console.error('Error fetching userid from local storage:', error);
      }
    };

    fetchUserIdFromLocalStorage();
  }, []);

  const handleNavigationStateChange = newNavState => {
    const {url} = newNavState;
    console.log('🚀 ~ handleNavigationStateChange ~ url:', url);

    // Check if the URL contains a success message
    if (url.includes('paid')) {
      // Redirect to the Home Screen
      Alert.alert('Payment Success', 'Payment was successful. Thank you!');
      // Redirect to the Home Screen
      navigation.navigate('Home');
      return;
    } else if (url.includes('failed')) {
      // Display an error message
      Alert.alert(
        'Payment Error',
        'Payment was not successful. Please try again.',
      );
    }
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#293170" />
        </View>
      ) : (
        // <View style={styles.webViewContainer}>
        //   <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        //     <Text style={styles.backButtonText}>Back</Text>
        //   </TouchableOpacity>
        <WebView
          source={{
            uri: `https://zain.d26sw7gpdqxzte.amplifyapp.com/payments?user=${userid}&package=${packageData}&amount=${price}&description=test&callbackUrl=https://zain.d26sw7gpdqxzte.amplifyapp.com/payments/payments_redirect`,
            // uri: `https://zain.d26sw7gpdqxzte.amplifyapp.com/payments?user=${userid}&package=${packageData}&amount=${price}&description=test&callbackUrl=https://zain.d26sw7gpdqxzte.amplifyapp.com/payments/payments_redirect`
          }} // Specify the URL you want to open
          style={styles.webView}
          onNavigationStateChange={handleNavigationStateChange}
        />
        // </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    color: 'blue',
    justifyContent: 'center',
  },
});
export default WebViewScreen;
