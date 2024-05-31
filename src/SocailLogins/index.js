// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import {Alert} from 'react-native';

// GoogleSignin.configure({
//   webClientId:
//     '460747338389-d3btpq0i5bj7jdfvub1jp1qii5eibo2i.apps.googleusercontent.com',
//   androidClientId:
//     '460747338389-9esqd3jiverbgdfeemdih6id2l07g1in.apps.googleusercontent.com',
//   // iosClientId:
//   //   '703619378540-lbcpb16v9o3nbin7v96o8199bcq5og2u.apps.googleusercontent.com',
//   forceCodeForRefreshToken: true,
// });

// // Replace 'specific@gmail.com' with your specific Gmail ID
// const specificGmailID = 'specific@gmail.com';

// export const onGoogleButtonPress = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await GoogleSignin.signOut();
//       const isSignedIn = await GoogleSignin.isSignedIn();

//       if (isSignedIn) {
//         Alert.alert('User is already signed in');
//         let info = await GoogleSignin.signInSilently();
//         handleSignInSuccess(info, resolve);
//       } else {
//         console.log('Continue Login');
//         const userInfo = await GoogleSignin.signIn();
//         console.log('Successfully logged in with Google');
//         handleSignInSuccess(userInfo, resolve);
//       }
//     } catch (err) {
//       handleSignInError(err, reject);
//     }
//   });
// };

// const handleSignInSuccess = (userInfo, resolve) => {
//   // Check if the signed-in user's email is the specific Gmail account
//   if (userInfo.user.email === specificGmailID) {
//     // Handle the specific Gmail ID login
//     Alert.alert('Successfully logged in with specific Gmail ID');
//     // Perform any specific actions or navigate to a different screen
//   } else {
//     resolve({
//       data: userInfo,
//       message: 'Successfully logged in with Google',
//     });
//   }
// };

// const handleSignInError = (err, reject) => {
//   if (err.code === statusCodes.SIGN_IN_CANCELLED) {
//     reject({data: err, message: 'Google sign-in cancelled'});
//   } else if (err.code === statusCodes.IN_PROGRESS) {
//     reject({data: err, message: 'Error in Google login, timeout'});
//   } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//     reject({data: err, message: 'Error: Play services not available'});
//   } else {
//     reject({data: err, message: 'Error in Google login'});
//   }
// };

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '275688306512-3gl98v3c5gpq2fldt75ubpudgn9dmcd0.apps.googleusercontent.com',
  offlineAccess: true,
});
export const onGoogleButtonPress = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      resolve(idToken);
    } catch (err) {
      // Handle different error scenarios
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        reject({ data: err, message: 'Google sign-in cancelled' });
      } else if (err.code === statusCodes.IN_PROGRESS) {
        reject({ data: err, message: 'Error in Google login: Timeout' });
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        reject({ data: err, message: 'Error: Play services not available' });
      } else {
        reject({ data: err, message: 'Error in Google login' });
      }
    }
  });
};

const onGoogleSignOut = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      resolve({ data: null, message: 'Google user sign out successfully' });
    } catch (error) {
      reject({ data: error, message: 'Google user sign out Failed' });
    }
  });
};
