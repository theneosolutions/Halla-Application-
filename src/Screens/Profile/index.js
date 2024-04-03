import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import IconF from 'react-native-vector-icons/AntDesign';
import IconE from 'react-native-vector-icons/Entypo';
import FeIcon from 'react-native-vector-icons/Feather';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import {getFromLocalStorage} from '../../Services/Api';
import {getProfileWithUserId} from '../../Services/ApiList';
import ProfileTabStyle from '../../styles/CommonStyle/ProfileTabStyles';
import {SF} from '../../utils';
import styles from './styles';
const Profile = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchData = async id => {
      try {
        const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
        const response = await getProfileWithUserId(Gettingtoken.id);
        console.log('profilee:.....======---', response?.data?.createdAt);
        setProfileData(response.data);
        console.log('setProfileData=====', profileData?.firstName);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, []);
  const clearLocalStorageData = async () => {
    try {
      await AsyncStorage.removeItem('profileData');
      // Other keys to remove if any
      // await AsyncStorage.removeItem('otherKey');
      // ...
      console.log('Local storage data cleared');
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  };
  const handleLogout = () => {
    // Clear local storage data
    clearLocalStorageData();
    // Other logout actions
    // ...
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.BackgroundWhite}>
        <View style={styles.whilistminbody}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <View style={styles.mainboxViewJohn}>
              <Image
                style={styles.LeftImageStyles}
                resizeMode="cover"
                source={{uri: profileData?.profilePhoto}}
              />
              <View>
                <Text style={styles.johnboxtwo}>{profileData?.firstName}</Text>
                <Text style={styles.basicMemberStyle}>
                  {profileData?.email}
                </Text>
              </View>

              <IconF size={SF(20)} name="right" style={styles.Jognboxthree} />
            </View>
          </TouchableOpacity>
          {/* ///////////////// */}

          <View style={styles.accountview}>
            <Text style={styles.accountstyle}>Account</Text>
          </View>

          {/* /////////////johnsmith///////////// */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ConfirmPassword')}>
            <View style={styles.mainsecboxViewJohn}>
              <IconE size={SF(20)} name="lock" style={styles.LeftIconStyles} />
              <Text style={styles.johnboxtwo}>Change Password</Text>
              <IconF size={SF(20)} name="right" style={styles.Jognboxthree} />
            </View>
          </TouchableOpacity>

          {/* ///////////////////////// */}

          <View style={styles.mainsecboxViewJohn}>
            <IconM
              size={SF(20)}
              name="bell-ring"
              style={styles.LeftIconStyles}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>OrderManagement</Text>

            <IconF
              size={SF(20)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
            />
          </View>

          {/* //////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <FeIcon
              size={SF(20)}
              name="settings"
              style={styles.LeftIconStyles}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Document Management</Text>

            <IconF
              size={SF(20)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
            />
          </View>

          {/* //////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconMI
              size={SF(20)}
              name="payment"
              style={styles.LeftIconStyles}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Payment</Text>

            <IconF
              size={SF(20)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
            />
          </View>

          {/* //////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconMI
              size={SF(20)}
              name="align-horizontal-left"
              style={styles.LeftIconStyles}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Sign Out</Text>

            <IconF
              size={SF(20)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
            />
          </View>

          {/* //////////////////////////// */}
          <View style={ProfileTabStyle.accountview}>
            <Text style={ProfileTabStyle.accountstyle}>More Options</Text>
          </View>

          {/* /////////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconMI
              size={SF(20)}
              name="align-horizontal-left"
              style={styles.LeftIconStyles}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Newsletter</Text>

            <IconF
              size={SF(20)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
            />
          </View>
          {/* //////////////////////////////////// */}
          <View style={ProfileTabStyle.mainsecboxViewJohn}>
            <IconMI
              size={SF(20)}
              name="align-horizontal-left"
              style={styles.LeftIconStyles}
            />

            <Text style={ProfileTabStyle.johnboxtwo}>Text Message</Text>

            <IconF
              size={SF(20)}
              name="right"
              style={ProfileTabStyle.Jognboxthree}
            />
          </View>
          {/* //////////////////////////////////// */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={ProfileTabStyle.mainsecboxViewJohn}>
              <IconMI
                size={SF(20)}
                name="align-horizontal-left"
                style={styles.LeftIconStyles}
              />

              <Text style={ProfileTabStyle.johnboxtwo}>Phone Call</Text>
              <Text style={{paddingLeft: SF(70), fontSize: SF(12)}}>$USD</Text>
              <IconF
                size={SF(20)}
                name="right"
                style={ProfileTabStyle.Jognboxthree}
              />
            </View>
          </TouchableOpacity>
          {/* //////////////////////////////////// */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={ProfileTabStyle.mainsecboxViewJohn}>
              <IconMI
                size={SF(20)}
                name="align-horizontal-left"
                style={styles.LeftIconStyles}
              />

              <Text style={ProfileTabStyle.johnboxtwo}>Phone Call</Text>
              <Text style={{paddingLeft: SF(60), fontSize: SF(12)}}>$USD</Text>
              <IconF
                size={SF(20)}
                name="right"
                style={ProfileTabStyle.Jognboxthree}
              />
            </View>
          </TouchableOpacity>
          {/* /////////////////////////////////// */}

          <TouchableOpacity onPress={handleLogout}>
            <View style={ProfileTabStyle.mainsecboxViewJohn}>
              <IconMI
                size={SF(20)}
                name="align-horizontal-left"
                style={styles.LeftIconStyles}
              />

              <Text style={ProfileTabStyle.johnboxtwo}>LogOut</Text>

              <Text style={{paddingLeft: SF(25), fontSize: SF(12)}}>
                facebood go.
              </Text>
              <IconF
                size={SF(20)}
                name="right"
                style={ProfileTabStyle.Jognboxthree}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Profile;

// import React, {useState, useEffect, useMemo} from 'react';
// import {View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Modal,
//   StyleSheet,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/EvilIcons';
// import IconF from 'react-native-vector-icons/AntDesign';
// import IconG from 'react-native-vector-icons/Ionicons';
// import images from '../../index';
// import {SH, SF, SW, Colors} from '../../utils';
// import {useTranslation} from 'react-i18next';
// import {useNavigation, useTheme} from '@react-navigation/native';
// import styles from './styles';
// import {getFromLocalStorage} from '../../Services/Api';
// import {getProfileWithUserId} from '../../Services/ApiList';

// const Profile = props => {
//   const navigation = useNavigation();
//   const {t} = useTranslation();
//   const [loading, setLoading] = useState(true);
//   const [profileData, setProfileData] = useState(null);
//   useEffect(() => {
//     const fetchData = async (id) => {
//       try {
//         const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
//         const response = await getProfileWithUserId(Gettingtoken.id);
//         console.log('profilee:.....======', response.data.createdAt);
//         setProfileData(response.data);
//         console.log('setProfileData',profileData.firstName)
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchData();

//   }, []);

//  return (
//     <View style={{flex: 1}}>
//       <View style={styles.BackgroundWhite}>
//         <View style={styles.whilistminbody}>
//         <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//               <IconF
//                 size={SF(20)}
//                 name="left"
//                 style={styles.headerIcon}
//               />
//             </TouchableOpacity>
//             <Text style={styles.headerText}>Profile</Text>

//           </View>

//           <View style={styles.ImagCenter}>
//           <View>
//             <Image
//               style={styles.ImageStyles}
//               resizeMode="cover"

//                 source={{ uri: profileData.profilePhoto}}
//             />
//             <Text style={styles.UserName}>{profileData.firstName}</Text>
//           </View>
//         </View>
//         <View style={styles.ProfileDetailesMinview}>
//           {/* ///////////////////////williomjonson//////////////// */}
//           <View style={styles.profiledetailboxview}>
//             <Text style={styles.boxone}>WilliomsonJhon</Text>
//             <Text style={styles.boxtwo}></Text>
//             <Icon
//               size={SF(30)}
//               name="pencil"
//               style={styles.boxthree}
//             />
//           </View>
//           {/* //////////////////Williomjanson/////////////////// */}
//           <View style={styles.profiledetailboxview}>
//             <Text style={styles.boxone}>+880 000 111 333</Text>
//             <Text style={styles.boxtwo}></Text>
//             <Icon
//               size={SF(30)}
//               name="pencil"
//               style={styles.boxthree}
//               />
//           </View>
//           {/* //////////////////Williomjanson/////////////////// */}
//           <View style={styles.profiledetailboxview}>
//             <Text style={styles.boxone}>email@website.com</Text>
//             <Text style={styles.boxtwo}></Text>
//             <Icon
//               size={SF(30)}
//               name="pencil"
//              style={styles.boxthree}
//             />
//           </View>

//           {/* //////////////////Williomjanson/////////////////// */}
//           <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//             <View style={styles.profiledetailboxview}>
//               <Text style={styles.boxone}>
//                 email@website.com{'\n'}Fusce Rd.Frederick Nebraska
//               </Text>
//               <Text style={styles.boxtwo}></Text>
//               <Icon
//                 size={SF(30)}
//                 name="pencil"
//                 style={styles.boxthree}

//               />
//             </View>
//           </TouchableOpacity>
//           {/* /////////////////////////////// */}

//           <TouchableOpacity
//             style={styles.savebtn}
//             onPress={() => navigation.navigate('ChatScreen')}>
//             <Text style={styles.savebtntext}>Save Now</Text>
//           </TouchableOpacity>
//         </View>

//         </View>
//       </View>
//     </View>
//   );
// };
// export default Profile;
