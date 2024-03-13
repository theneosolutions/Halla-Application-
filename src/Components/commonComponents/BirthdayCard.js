import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import images from '../../index';
import {SW, SH} from '../../utils/dimensions';
// import Icon from 'react-native-vector-icons/Feather';
const BirthdayCard = ({title, text, imageUrl, iconName, onPress, onEdit}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl && <Image source={imageUrl} style={styles.image} />}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.bottomContent}>
          <Image source={images.exampleImage} style={styles.bottomImage} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    //backgroundColor: 'red',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    marginBottom: 16,
    margin: SW(5),
    //backgroundColor: 'red',
    width: '45%',
  },
  imageContainer: {
    //marginRight: 10,
    justifyContent: 'center',
  },
  image: {
    width: SW(160),
    height: 160,
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
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
