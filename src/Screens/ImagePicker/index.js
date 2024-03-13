import {Image, ScrollView, TouchableOpacity, View, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PhotoPicker, TextInput, Button} from '../../Components';
import {SW, SF, SH} from '../../utils';
import Scanstyle from '../../styles/CommonStyle/Scanstyle';
const ImagePicker = () => {
  const pickerRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [updateUser, updateUserResponse] = useState();
  const [imagePath, setImagePath] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);
  // const dispatch = useDispatch();
  const defaultImageUri =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ68xCJyjzwUC0J89fXPOkmIvW09vTZjHRkVg&usqp=CAU';

  ImageCropPicker.openPicker({
    width: 400,
    height: 400,
    cropping: true,
  })
    .then(image => {
      if (image) {
        setImagePath(image.path);
      }
    })
    .catch(error => {
      console.log('Error choosing from gallery:', error);
    });

  const deleteProfilePicture = () => {
    setImagePath(null);
  };
  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image) {
          setImagePath(image.path);
        } else {
          // Handle case when user cancels image selection
          console.log('User cancelled image selection');
        }
      })
      .catch(error => {
        console.log('Error choosing from gallery:', error);
      });
  };

  //   const openImagePicker = () => {
  //     setModalVisible(true);
  //   };
  //   const takePictureFromCamera = () => {
  //     ImageCropPicker.openCamera({
  //       width: 400,
  //       height: 400,
  //       cropping: true,
  //     })
  //       .then(image => {
  //         if (image) {
  //           setImagePath(image.path);
  //           setImageSelected(true);
  //         }
  //         setModalVisible(false); // Close the modal after selecting an image
  //       })
  //       .catch(error => {
  //         console.log('Error opening camera:', error);
  //       });
  //   };
  //   const choosePictureFromGallery = () => {
  //     ImageCropPicker.openPicker({
  //       width: 400,
  //       height: 400,
  //       cropping: true,
  //     })
  //       .then(image => {
  //         if (image) {
  //           // console.log(
  //           //   '🚀 ~ file: index.js:90 ~ choosePictureFromGallery ~ image:',
  //           //   image,
  //           // );
  //           setImagePath(image.path);
  //         }
  //       })
  //       .catch(error => {
  //         console.log('Error choosing from gallery:', error);
  //       });
  //   };
  //   const deleteProfilePicture = () => {
  //     setImagePath(defaultImageUri);
  //     setImageSelected(true);
  //     setModalVisible(false); // Close the modal after deleting the image
  //   };

  //   const UpdateProfile = async () => {
  //     console.log('user?._id', user?.id);
  //     let url = `users/${user?.id}`;
  //     let method = 'PUT';
  //     let data = {
  //       firstName: firstname,
  //       lastName: lastname,
  //     };
  //     try {
  //       setupdateLoading(true);
  //       let res = await updateUser({
  //         url,
  //         method,
  //         body: data,
  //         token,
  //       }).unwrap();
  //       console.log('res', res);
  //       if (res) {
  //         dispatch(setUser(res));
  //         navigation.goBack();
  //       }
  //     } catch (e) {
  //       console.log('e', e);
  //       setupdateLoading(false);
  //     }
  //   };

  //   const enabledButtonStyle = {
  //     backgroundColor: 'rgba(109, 209, 156, 1)',
  //     borderColor: 'rgba(109, 209, 156, 1)',
  //     borderWidth: 1,
  //   };

  //   const disabledButtonStyle = {
  //     backgroundColor: 'rgba(0, 0, 0, 0.04)',
  //     borderWidth: 1,
  //     borderColor: 'rgba(0, 0, 0, 0.15)',
  //   };
  //   const enabledButtontextStyle = {
  //     color: 'rgba(0, 0, 0, 0.88)',
  //   };
  //   const disabledButtontextStyle = {
  //     color: 'red',
  //   };

  return (
    <View>
      <TouchableOpacity onPress={openImagePicker} activeOpacity={0.6}>
        <View
          style={{
            height: 150,
            width: 150,
            backgroundColor: 'lightGray',
            justifyContent: 'center',
            marginHorizontal: SW(120),
            borderRadius: SF(120),
          }}>
          <Image
            source={{uri: imagePath}}
            style={{
              height: 150,
              width: 150,
              backgroundColor: 'gray',
              justifyContent: 'center',
              borderRadius: SF(120),
            }}
          />
          <TouchableOpacity
            onPress={openImagePicker}
            style={Scanstyle.btnstyle}>
            <View>
              <Text>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {/* ////////////deletebutton/////////// */}
      {/* <Button
        title="Delete Image"
        onPress={deleteProfilePicture}
        style={Scanstyle.btnstyle}
      /> */}
      {/* //////////////////////// */}
    </View>
    // <View>
    //   <PersonalInfo />
    //   <Text>ImagePicker</Text>
    //   <TouchableOpacity
    //     onPress={openImagePicker}
    //     style={styles.imagemainview}
    //     activeOpacity={0.6}>
    //     <View style={styles.profileview}>
    //       <Image
    //         source={imagePath ? {uri: imagePath.uri} : {uri: defaultImageUri}}
    //         style={{
    //           height: moderateScale(110),
    //           width: moderateScale(110),
    //         }}
    //       />
    //       <View style={styles.editView}>
    //         <Text style={{color: Theme.colors.white}}>Edit</Text>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    //   <Button
    //     onPress={() => UpdateProfile()}
    //     disableStyle={imageSelected ? enabledButtonStyle : disabledButtonStyle}
    //     disableTextColor={'rgba(0, 0, 0, 0.25)'}
    //     loading={updateLoading}
    //     disabled={firstname === '' && lastname === '' && email === ''}
    //     text={'Save'}
    //   />
    //   <PhotoPicker
    //     ref={pickerRef}
    //     isDelete={true}
    //     visible={modalVisible}
    //     onSelectImage={image => setImagePath(image)}
    //     onDeleteImage={() => setImagePath(null)}
    //     onClose={() => setModalVisible(false)}
    //   />
    // </View>
  );
};

export default ImagePicker;
