import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import images from '../../index';
import {SW, SH} from '../../utils/dimensions';

const Formcard = ({
  eventName,
  eventDescription,
  eventDate,
  mapLocation,
  imageUrl,
  onCardPress,
  //   onEditPress,
}) => {
  return (
    <TouchableOpacity onPress={onCardPress} style={styles.container}>
      {/* <View style={styles.imageContainer}>
        {imageUrl && <Image source={images.invited} style={styles.image} />}
      </View> */}
      {/* <View style={styles.contentContainer}> */}
      <Text style={styles.title}>{eventName}</Text>
      <Text style={styles.description}>{eventDescription}</Text>
      <Text style={styles.date}>{eventDate}</Text>
      <Text style={styles.location}>{mapLocation}</Text>
      {/* <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
          <Icon name="edit" size={24} color="black" />
        </TouchableOpacity> */}
      {/* </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    paddingVertical: 50,
    // marginBottom: 16,
    // margin: SW(5),
    width: '48%',
    margin: 5,
  },
  imageContainer: {
    // justifyContent: 'center',
  },
  image: {
    margin: SH(5),
    width: SW(60),
    height: 20,
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 20,
    color: 'black',
  },
  description: {
    fontSize: 12,
    marginTop: 4,
    color: 'gray',
  },
  date: {
    fontSize: 12,
    marginTop: 4,
    color: 'gray',
  },
  location: {
    fontSize: 12,
    marginTop: 4,
    color: 'gray',
  },
  //   editButton: {
  //     position: 'absolute',
  //     marginLeft: 'auto',
  //     //top: 10,
  //     //right: 10,
  //   },
});

export default Formcard;
