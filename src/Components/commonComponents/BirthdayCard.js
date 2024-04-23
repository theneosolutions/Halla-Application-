import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import images from '../../index';
import {SW, SH} from '../../utils/dimensions';
// import Icon from 'react-native-vector-icons/Feather';
const BirthdayCard = ({
  title,
  text,
  imageUrl,
  iconName,
  onPress,
  onEdit,
  data,
  isSelected,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}>
      <TouchableOpacity
        // activeOpacity={1}
        onPress={onPress}
        // style={styles.container}

        style={[styles.container, isSelected && styles.selectedContainer]}>
        <View style={styles.imageContainer}>
          {imageUrl && <Image source={imageUrl} style={styles.image} />}
        </View>
        {/* <View style={styles.contentContainer}>
          <View style={styles.bottomContent}>
            <Image source={images.exampleImage} style={styles.bottomImage} />
          </View>
        </View> */}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    alignItems: 'center',
    // padding: 20,
    shadowOpacity: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    marginBottom: 16,
    margin: SW(15),
    marginRight: SW(2),
    // backgroundColor: 'red',
    width: 120,
  },
  imageContainer: {
    // elevation: 10,
    // shadowOpacity: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 120,
    height: 95,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: '#BD9956',
  },
  image: {
    width: SW(77),
    height: 81,
    borderRadius: 5,
    // elevation: 10,
    // shadowOpacity: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  // contentContainer: {
  //   flex: 1,
  //   marginRight: 16,
  // },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 0,
    color: 'black',
  },

  text: {
    fontSize: 16,
  },
  editButton: {
    marginLeft: 'auto', // Pushes the button to the right
  },
  selectedContainer: {
    borderColor: 'black', // Change border color when selected
    shadowOpacity: 20, // Change shadow opacity when selected
    elevation: 15,
    backgroundColor: 'gray', // Change elevation when selected
  },
});

export default BirthdayCard;
