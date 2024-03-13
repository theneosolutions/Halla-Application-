// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useEffect, useRef} from 'react';
// // import {SvgXml} from 'react-native-svg';
// // import {cameraFile, deleteFile, imageFile} from '../../assets/svgs';
// //import CustomText from '../CustomText';
// import Button from './Button';
// import RBSheet from 'react-native-raw-bottom-sheet';
// //import Theme, {moderateScale, scale, verticalScale} from '../../Theme';
// import ImagePicker from 'react-native-image-crop-picker';

// export default function PhotoPicker({
//   visible,
//   onClose = () => null,
//   onSelectImage = () => null,
//   onDeleteImage = () => null,
//   isDelete = false,
// }) {
//   const sheetRef = useRef();
//   useEffect(() => {
//     if (visible) {
//       sheetRef.current.open();
//     }
//   }, [visible]);
//   const openPicker = () => {
//     ImagePicker.openPicker({
//       cropping: true,
//       height: 400,
//       width: 400,
//     }).then(image => {
//       console.log(image.path);
//       let name = image.path?.split('/').pop();
//       onSelectImage({
//         uri: image.path,
//         type: 'image/jpeg',
//         fileName: name.split('.')[0],
//         name: name,
//       });
//       sheetRef.current.close();
//       onClose();
//     });
//   };
//   const openCamera = () => {
//     ImagePicker.openCamera({
//       cropping: true,
//       height: 400,
//       width: 400,
//     }).then(image => {
//       console.log(image.path);
//       let name = image.path?.split('/').pop();
//       onSelectImage({
//         uri: image.path,
//         type: 'image/jpeg',
//         fileName: name.split('.')[0],
//         name: name,
//       });
//     });
//     sheetRef.current.close();
//     onClose();
//   };
//   return (
//     <RBSheet
//       ref={sheetRef}
//       height={verticalScale(260)}
//       onClose={onClose}
//       closeOnPressBack={() => {
//         onClose();
//         sheetRef.current.close();
//       }}
//       closeOnPressMask={() => {
//         onClose();
//         sheetRef.current.close();
//       }}
//       customStyles={{
//         container: {
//           backgroundColor: Theme.colors.white,
//           borderTopRightRadius: scale(8),
//           borderTopLeftRadius: scale(8),
//         },
//       }}>
//       <TouchableOpacity
//         style={[styles.outerView, {marginTop: moderateScale(40)}]}
//         onPress={openPicker}>
//         <View style={styles.innerView}>
//           <SvgXml xml={imageFile} />
//         </View>
//         <View style={styles.innerView2}>
//           <CustomText style={styles.text}>Pick From Photo Gallery </CustomText>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.outerView} onPress={openCamera}>
//         <View style={styles.innerView}>
//           <SvgXml xml={cameraFile} />
//         </View>
//         <View style={styles.innerView2}>
//           <CustomText style={styles.text}>Take Photo</CustomText>
//         </View>
//       </TouchableOpacity>
//       {isDelete && (
//         <TouchableOpacity
//           style={styles.outerView}
//           onPress={() => {
//             onDeleteImage();
//             sheetRef.current.close();
//             onClose();
//           }}>
//           <View style={styles.innerView}>
//             <SvgXml xml={deleteFile} />
//           </View>
//           <View style={styles.innerView2}>
//             <CustomText style={[styles.text, {color: Theme.colors.red}]}>
//               Delete Photo
//             </CustomText>
//           </View>
//         </TouchableOpacity>
//       )}
//       <Button
//         style={{
//           marginVertical: moderateScale(20),
//           alignSelf: 'center',
//         }}
//         text={'Close'}
//         onPress={() => {
//           sheetRef.current.close();
//           onClose();
//         }}
//       />
//     </RBSheet>
//   );
// }

// const styles = StyleSheet.create({
//   outerView: {
//     flexDirection: 'row',
//     margin: moderateScale(20),
//     marginVertical: moderateScale(10),
//   },
//   innerView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   innerView2: {
//     flex: 8,
//     justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   text: {
//     fontSize: Theme.fontSizes.small,
//   },
// });
