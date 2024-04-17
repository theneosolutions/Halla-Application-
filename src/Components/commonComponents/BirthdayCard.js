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
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={styles.container}>
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
    backgroundColor: 'white',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    marginBottom: 16,
    margin: SW(15),
    // backgroundColor: 'red',
    width: 150,
  },
  imageContainer: {
    elevation: 10,
    shadowOpacity: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 160,
    height: 160,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: '#BD9956',
  },
  image: {
    width: SW(130),
    height: 100,
    borderRadius: 5,
    elevation: 10,
    shadowOpacity: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
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
});

export default BirthdayCard;
