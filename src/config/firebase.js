import {initializeApp} from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAua_FiFeNB3NEA1aaHyeLNKUuZ_bH36vI',
  authDomain: 'mazoomapp-cca03.firebaseapp.com',
  databaseURL: 'https://mazoomapp-cca03-default-rtdb.firebaseio.com',
  projectId: 'mazoomapp-cca03',
  storageBucket: 'mazoomapp-cca03.appspot.com',
  messagingSenderId: '460747338389',
  appId: '1:460747338389:web:e8a8f18a23a8a492d4a19c',
  measurementId: 'G-BMNTP28P47',
  databaseURL: 'https://mazoomapp-cca03-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
// export {app, analytics};
// export default firebaseConfig;
