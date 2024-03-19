import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/AntDesign';
import IconG from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import ProfileTabStyle from '../../styles/CommonStyle/ProfileTabStyles';
import images from '../../index';
import {SH, SF, SW, Colors} from '../../utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';


const Profile = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();


  return (
    <View style={{flex: 1}}>
      <View style={styles.BackgroundWhite}>
        <View style={styles.whilistminbody}>
     
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <View style={styles.mainboxViewJohn}>
              <Image
                style={styles.LeftImageStyles}
                resizeMode="cover"
                source={images.User_image_one_profile}
              />
              <View>
                <Text style={styles.johnboxtwo}>Jhon Smith</Text>
                <Text style={styles.basicMemberStyle}>
                  Basic Members
                </Text>
              </View>

              <IconF
                size={SF(20)}
                name="right"
                style={styles.Jognboxthree}
   
              />
            </View>
          </TouchableOpacity>
          {/* ///////////////// */}

          <View style={styles.accountview}>
            <Text style={styles.accountstyle}>Account</Text>
          </View>

          {/* /////////////johnsmith///////////// */}

          <View style={styles.mainsecboxViewJohn}>
            <IconE
              size={SF(20)}
              name="lock"
              style={styles.LeftIconStyles}
            
            />

            <Text style={styles.johnboxtwo}>Change Password</Text>

            <IconF
              size={SF(20)}
              name="right"
              style={styles.Jognboxthree}
        
            />
          </View>
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

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={ProfileTabStyle.mainsecboxViewJohn}>
              <IconMI
                size={SF(20)}
                name="align-horizontal-left"
                style={styles.LeftIconStyles}
           
              />

              <Text style={ProfileTabStyle.johnboxtwo}> Currency</Text>

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


// import {StyleSheet} from 'react-native';
// import {Fonts, SF, SH, SW, Colors} from '../../utils';
// const styles = StyleSheet.create({
//     BackgroundWhite: {
//         backgroundColor: 'white',
//         // backgroundColor: Colors.theme_background_han_Purple,
//       },
//       whilistminbody: {
//         width: '100%',
//         // marginTop: '1%',
//         height: '100%',
//       },
//       ImagCenter: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         width: '100%',
    
//         marginTop: SH(10),
//       },
//       ImageStyles: {
//         width: SW(90),
//         height: SH(100),
//         borderRadius: SH(300),
//         backgroundColor: 'gray',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       InfoProFile: {
//         marginTop: '5%',
//         justifyContent: 'center',
//         fontFamily: Fonts.Poppins_Medium,
//         //color: 'black',
//         color: Colors.black_text_color,
//         fontSize: SF(23),
//         fontWeight: '800',
//         alignItems: 'center',
//         textAlign: 'center',
//         // padding: SH(30),
//       },
      
//       textstyle: {
//         color: 'white',
//         fontSize: SF(16),
//         textAlign: 'center',
//         justifyContent: 'center',
//         // margin: SW(2),
//         fontWeight: '500',
//         padding: SH(10),
//       },
//       ActiveButton: {
//         height: SH(40),
//         width: SW(90),
//         backgroundColor: Colors.darkBlue,
//         borderRadius: SH(20),
//         // margin: SH(10),
//         marginLeft: SW(8),
//       },
//       btnview: {
//         flexDirection: 'row',
      
//         justifyContent: 'center',
//         margin: SH(20),
    
//       },
//       ProfileDetailesMinview: {
//         width: '90%',
//         marginHorizontal: '5%',
//       },
//     headerContainer: {
//         width: '100%',
//         flexDirection: 'row',
//         height: 50,
//         backgroundColor: '#F2F2F4',
//         padding: SW(10),
//         alignItems: 'center',
//       },
//       headerText: {
//         flex: 1,
//         marginRight: 'auto',
//         fontWeight: '700',
//         fontSize: SF(20),
//         color: 'black',
//       },
//       headerIcon: {
//         height: SH(50),
//         marginLeft: 10,
//         marginRight: 20,
//         marginTop: 30,
//         color: '#000',
       
//       },

//       UserName: {
//         color: Colors.black_text_color,
//         fontFamily: Fonts.Poppins_Medium,
//         textAlign: 'center',
//         fontSize: SF(12),
//         fontWeight: '800',
//         marginTop:5
//       },
//       EditProFile: {
//         marginTop: '1%',
//         fontFamily: Fonts.Poppins_Medium,
//         color: Colors.black_text_color,
//         fontSize: SF(15),
//         paddingBottom: SH(13),
//         textAlign: 'center',
//       },
//       boxView: {
//         height: SH(60),
//         width: SW(340),
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: SH(30),
//         // backgroundColor: 'gray',
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         borderTopWidth: 0.3,
//         borderTopColor: Colors.gray_text_color,
//          borderColor:'black' // Choose your desired color
    
//         // marginTop: SH(5), // Adjust as needed
//       },
//       folowerLineView: {
//         borderRightWidth: 0.3,
//         color: 'gray',
//         height: '70%',
//         borderRightColor: 'black',
//         shadowOpacity:12,
//         paddingLeft:35
        
//       },
//       linetext: {
//         fontSize: SF(17),
//         color: Colors.black_text_color,
//         marginRight: SH(15),
//         fontWeight: '700',
//       },
//       seclinetext: {
//         fontSize: SF(14),
//         color: Colors.black_text_color,
//         fontWeight: '400',
//         paddingRight: SW(18),
//       },
//       onesidebox: {
//         borderRightWidth: 0.2,
//         color: 'gray',
//         height: '70%',
//         borderRightColor: 'black',
//         justifyContent:'center',
//         alignItems:'center',
//         paddingLeft:10
//       },
//       iconStyle: {
//         height: SH(50),
//         width: SW(40),
//         // backgroundColor: 'yellow',
//         marginLeft: 'auto',
//         paddingTop: SH(8),
//         color:'black'
//         // padding: SW(5),
//       },
//       mainboxView: {
//         height: SH(40),
//         width: SW(340),
//         backgroundColor: 'transparent',
//         flexDirection: 'row',
//         borderBottomWidth: 0.3,
//         borderColor:'black',
//         margin: SH(8),
//       },
//       boxone: {
//         height: SH(50),
//         width: SW(150),
//         paddingTop: SH(10),
//         fontSize: SF(17),
//         color: Colors.black_text_color,
//         fontWeight: '500',
//         // backgroundColor: 'red',
//       },
//       boxtwo: {
//         height: SH(50),
//         width: SW(150),
//         // backgroundColor: 'purple',
//         paddingLeft: SW(80),
//         paddingTop: SH(10),
//       },
//       ActiveButton: {
//         height: SH(40),
//         width: SW(90),
//         backgroundColor: Colors.darkBlue,
//         borderRadius: SH(20),
//         // margin: SH(10),
//         marginLeft: SW(8),
//       },
//       mainboxViewJohn: {
//         height: SH(60),
//         width: SW(360),
//         backgroundColor: 'transparent',
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//         margin: SF(10),
//       },
//       LeftImageStyles: {
//         width: SW(40),
//         height: SH(50),
//         borderRadius: SH(300),
//         backgroundColor: 'gray',
//         marginLeft: SW(5),
       
//       },
//       johnboxtwo: {
//         height: SH(30),
//         width: SW(180),
//         color: Colors.black_text_color,
//         //backgroundColor: 'purple',
//         paddingLeft: SW(10),
//         paddingTop: SH(4),
//         fontSize: SF(18),
//         fontWeight: '500',
//       },
//       basicMemberStyle: {
//         fontSize: 10,
//         color: 'black',
//         paddingLeft: SW(10),
//       },
//       Jognboxthree: {
//         height: SH(50),
//         width: SW(40),
//         marginLeft: 'auto',
//         paddingTop: SH(15),
//         color:'black'
      
//       },
//       accountview: {
//         height: SH(50),
//         width: SW(360),
//         backgroundColor: Colors.darkBlue,
//         marginLeft: SH(10),
//         borderTopLeftRadius: 18,
//         borderBottomRightRadius: 18,
//         marginTop: SH(2),
       
//       },
//       accountstyle: {
//         fontSize: SF(17),
//         color: Colors.ghost_white_color,
//         fontWeight: '700',
//         padding: SF(14),
//       },
//       mainsecboxViewJohn: {
//         height: SH(48),
//         width: SW(360),
//         backgroundColor: 'transparent',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft: SW(8),
//         marginTop: SH(2),
//         color: 'black',
//         borderBottomWidth: 0.5,
//         borderColor:'black'
//       },
//       LeftIconStyles: {
//         width: SW(30),
//         height: SH(70),
//         paddingTop: SH(26),
//         color:"black",
//         marginLeft: SW(10),
//       },
//       johnboxtwo: {
//         height: SH(30),
//         width: SW(180),
//         color: Colors.black_text_color,
//         paddingLeft: SW(10),
//         paddingTop: SH(4),
//         fontSize: SF(18),
//         fontWeight: '500',
//       },
//       Jognboxthree: {
//         height: SH(50),
//         width: SW(40),
//         marginLeft: 'auto',
//         paddingTop: SH(15),
//         color:'black'
    
//       },
     
 
// });
// export default styles;
