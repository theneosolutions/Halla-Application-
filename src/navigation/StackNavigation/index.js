import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from '../../Screens/SplashScreen/index';
import ChatScreen from '../../Screens/ChatScreen/index';
import Profile from '../../Screens/Profile/index';
import Scan from '../../Screens/Scan/index';
import Home from '../../Screens/Home/index';
import Notification from '../../Screens/Notification/index';
import SettingScreen from '../../Screens/SettingScreen/index';
import ProfileDetail from '../../Screens/ProfileDetail/index';
import MessagesV1 from '../../Screens/MessagesV1/index';
import MessageV2 from '../../Screens/MessageV2/index';
import RegistrationScreen from '../../Screens/RegistrationScreen/index';
// import AppleLogin from '../../Screens/AppleLogin/index';
// import GoogleLogin from '../../Screens/GoogleLogin/index';
import MapScreen from '../../Screens/MapScreen/index';
import ImagePicker from '../../Screens/ImagePicker/index';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddGuest from '../../Screens/AddGuest/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../../Screens/Card/index';
import EditProfile from '../../Screens/EditProfile/index';
import EditEvent from '../../Screens/EditEvent/index';
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import Invitationreport from '../../Screens/Invitationreport/index';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CreateEvent from '../../Screens/CreateEvent/index';
import ForgotPass from '../../Screens/ForgotPass/index';
import Forgotemail from '../../Screens/ForgotEmail/index';
import OTPVerify from '../../Screens/OTPVerify/index';
import ResetPass from '../../Screens/ResetPass/index';
import ResetPassDone from '../../Screens/ResetPassDone/index';
import Upcommingevents from '../../Screens/Upcommingevents/index';
import Attendedevents from '../../Screens/AttendedEvent/index';
import MissedEvent from '../../Screens/MissedEvent/index';
import NewEvents from '../../Screens/NewEvents/index';
import SignUp from '../../Screens/SignUp/index';
import AddNewGuest from '../../Screens/AddNewGuest/index';
import AllDone from '../../Screens/AllDone/index';
import {getPathDown} from './curve';
import {Svg, Path} from 'react-native-svg';
import {scale} from 'react-native-size-scaling';
import Login from '../../Screens/Login/index';
import ConfirmPassword from '../../Screens/ConfirmPassword/index';
import ScanList from '../../Screens/ScanList/index';
import AddMembers from '../../Screens/AddMembers/index';
import TopUp from '../../Screens/TopUp/index';
import PaymentDetails from '../../Screens/PaymentDetails/index';
import WebViewScreen from '../../Screens/PaymentDetails/WebViewScreen';
import InvitesDetail from '../../Screens/InvitesDetail/index';
import InvitesMessages from '../../Screens/InvitesMessages/index';
import {
  useFocusEffect,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import SignUpOTP from '../../Screens/SignUpOTP/index';
import SignInOTP from '../../Screens/SignInOTP/index';
import ForgotPassSMSOTP from '../../Screens/ForgotPassSMSOTP/index';
import ForgotPhone from '../../Screens/ForgotPhone/index';
import {getFromLocalStorage} from '../../Services/Api';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

// const StackNavigation = () => {
//   <AuthStack />;
// };
const AuthStack = () => {
  const checkStatus = async () => {
    const status = await getFromLocalStorage('@UserStatus');
    if (status === 'true') {
      navigation.navigate('Home');
    }
  };
  useEffect(() => {
    checkStatus();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ForgotPhone" component={ForgotPhone} />
      <Stack.Screen name="SignInOTP" component={SignInOTP} />
      <Stack.Screen
        name="ImagePicker"
        component={ImagePicker}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddGuest"
        component={AddGuest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddMembers"
        component={AddMembers}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ForgotPass"
        component={ForgotPass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassSMSOTP"
        component={ForgotPassSMSOTP}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Forgotemail"
        component={Forgotemail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPVerify"
        component={OTPVerify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPass"
        component={ResetPass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassDone"
        component={ResetPassDone}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignUpOTP" component={SignUpOTP} />

      <Stack.Screen
        name="Invitationreport"
        component={Invitationreport}
        options={{headerShown: false}}
      />
      <Stack.Screen name="InvitesMessages" component={InvitesMessages} />
      <Stack.Screen name="InvitesDetail" component={InvitesDetail} />
      <Stack.Screen
        name="AddNewGuest"
        component={AddNewGuest}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Notification" Component={Notification} />  */}
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        //component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TopUp"
        component={TopUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Upcommingevents"
        component={Upcommingevents}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Attendedevents"
        component={Attendedevents}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MissedEvent"
        component={MissedEvent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewEvents"
        component={NewEvents}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="EditEvent"
        component={EditEvent}
        options={{headerShown: false}}
      />

      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MessagesV1" component={MessagesV1} />
      <Stack.Screen name="MessageV2" component={MessageV2} />
      <Stack.Screen
        name="Card"
        component={Card}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllDone"
        component={AllDone}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const TabNavigator = ({navigation, route}) => {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get('window').width);
  const returnpathDown = getPathDown(maxWidth, 60, 50);
  const [activeTab, setActiveTab] = useState('Home');

  useFocusEffect(
    React.useCallback(() => {
      const routeName = getFocusedRouteNameFromRoute(route);
      console.log('🚀 ~ React.useCallback ~ routeName:', routeName);
      // Set the active tab name
      setActiveTab(routeName);
    }, [route]),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            top: activeTab == 'Home' ? 4 : 0,
            margin: 0,
            backgroundColor: activeTab == 'Home' ? 'transparent' : '#DEE1F5',
            zIndex: activeTab == 'Home' ? -50 : 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 56,
                  width: 56,
                  backgroundColor: '#293170',
                  borderRadius: 35,
                }}>
                <Icon name={'home'} size={24} color={'white'} />
              </View>
            ) : (
              <Icon
                name={'home'}
                size={24}
                color={focused ? '#293170' : 'gray'}
              />
            );
          },
          tabBarLabel: ({focused, color, size}) => {
            return focused ? (
              <View>
                <Svg width={maxWidth} height={scale(60)}>
                  <Path fill={'#DEE1F5'} {...{d: returnpathDown}} />
                </Svg>
              </View>
            ) : (
              <Text style={{color: focused ? '#293170' : 'gray'}}>Home</Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="messages"
        component={MessageV2}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            top: activeTab == 'messages' ? 4 : 0,
            margin: 0,
            backgroundColor:
              activeTab == 'messages' ? 'transparent' : '#DEE1F5',
            zIndex: activeTab == 'messages' ? -50 : 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 56,
                  width: 56,
                  backgroundColor: '#293170',
                  borderRadius: 35,
                }}>
                <Icon name={'message-square'} size={24} color={'white'} />
              </View>
            ) : (
              <Icon
                name={'message-square'}
                size={24}
                color={focused ? '#293170' : 'gray'}
              />
            );
          },
          tabBarLabel: ({focused, color, size}) => {
            return focused ? (
              <View>
                <Svg width={maxWidth} height={scale(60)}>
                  <Path fill={'#DEE1F5'} {...{d: returnpathDown}} />
                </Svg>
              </View>
            ) : (
              <Text style={{color: focused ? '#293170' : 'gray'}}>
                Messages
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{
          headerShown: false,
          unmountOnBlur: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor:
              activeTab == 'CreateEvent' ? 'transparent' : '#DEE1F5',
            zIndex: activeTab == 'CreateEvent' ? -50 : 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 56,
                  width: 56,
                  backgroundColor: '#293170',
                  borderRadius: 35,
                }}>
                <Icon name={'plus'} size={24} color={'white'} />
              </View>
            ) : (
              <Icon
                name={'plus'}
                size={24}
                color={focused ? '#293170' : 'gray'}
              />
            );
          },
          tabBarLabel: ({focused, color, size}) => {
            return focused ? (
              <View>
                <Svg width={maxWidth} height={scale(60)}>
                  <Path fill={'#DEE1F5'} {...{d: returnpathDown}} />
                </Svg>
              </View>
            ) : (
              <Text style={{color: 'gray'}}>Event</Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="ScanList"
        component={ScanList}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            top: activeTab == 'ScanList' ? 4 : 0,
            backgroundColor:
              activeTab == 'ScanList' ? 'transparent' : '#DEE1F5',
            zIndex: activeTab == 'ScanList' ? -50 : 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 56,
                  width: 56,
                  backgroundColor: '#293170',
                  borderRadius: 35,
                }}>
                <MaterialCommunityIcons
                  name={'line-scan'}
                  size={24}
                  color={'white'}
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                name={'line-scan'}
                size={24}
                color={focused ? '#293170' : 'gray'}
              />
            );
          },
          tabBarLabel: ({focused, color, size}) => {
            return focused ? (
              <View>
                <Svg width={maxWidth} height={scale(60)}>
                  <Path fill={'#DEE1F5'} {...{d: returnpathDown}} />
                </Svg>
              </View>
            ) : (
              <Text style={{color: focused ? '#293170' : 'gray'}}>
                ScanList
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            top: activeTab == 'Profile' ? 4 : 0,
            backgroundColor: activeTab == 'Profile' ? 'transparent' : '#DEE1F5',
            zIndex: activeTab == 'Profile' ? -50 : 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 56,
                  width: 56,
                  backgroundColor: '#293170',
                  borderRadius: 35,
                }}>
                <FontAwesome name={'user-circle-o'} size={24} color={'white'} />
              </View>
            ) : (
              <FontAwesome
                name={'user-circle-o'}
                size={24}
                color={focused ? '#293170' : 'gray'}
              />
            );
          },
          tabBarLabel: ({focused, color, size}) => {
            return focused ? (
              <View>
                <Svg width={maxWidth} height={scale(60)}>
                  <Path fill={'#DEE1F5'} {...{d: returnpathDown}} />
                </Svg>
              </View>
            ) : (
              <Text style={{color: focused ? '#293170' : 'gray'}}>Profile</Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
