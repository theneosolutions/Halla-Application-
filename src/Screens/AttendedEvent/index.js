import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {SH, Colors, SW, SF} from '../../utils';
import IconF from 'react-native-vector-icons/AntDesign';
import {useNavigation, useTheme} from '@react-navigation/native';
const DATA = [
  {
    id: '1',
    title: 'Birthday Party',
    image: require('../../images/wallpaper2.png'),
    text: 'Description for item 1',
    // image2: require('./path/to/image2.png'),
    // image3: require('./path/to/image3.png'),
  },
  {
    id: '2',
    title: 'Wedding',
    image: require('../../images/wallpaper3.png'),
    text: 'Description for item 2',
    // image2: require('./path/to/image5.png'),
    // image3: require('./path/to/image6.png'),
  },

  {
    id: '3',
    title: 'Dinner',
    image: require('../../images/wallpaper.png'),
    text: 'Description for item 2',
    // image2: require('./path/to/image5.png'),
    // image3: require('./path/to/image6.png'),
  },
  // Add more data objects as needed
];

const AttendedEvent = props => {
  const {navigation} = props;
  const renderItem = ({item}) => (
    <View style={styles.slide}>
      {/* Wrap the image inside TouchableOpacity */}
      <TouchableOpacity onPress={() => navigation.navigate('Invitationreport')}>
        <Image source={item.image} style={styles.images} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>{item.text}</Text>
        <View style={{flexDirection: 'row'}}>
          <Image source={item.image2} style={styles.image2} />
          <Image source={item.image3} style={styles.image3} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Handle button press action here
        }}>
        <Text style={styles.buttonText}>Draft</Text>
      </TouchableOpacity>
    </View>
  );

  // const {selectedBirthday, imageUrl} = route.params;

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '99%',
          flexDirection: 'row',
          height: 50,
          backgroundColor: '#f8f9fc',
          padding: SW(10),
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <IconF
            size={SF(20)}
            name="left"
            style={{
              height: SH(30),
              marginLeft: 10,
              marginRight: 20,
              color: 'black',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            alignItems: 'center',
            alignContent: 'center',
            fontWeight: '700',
            fontSize: SF(20),
            color: 'black',
          }}>
          Attended Events
        </Text>
        {/* <Egypto
          size={SF(20)}
          name="dots-three-vertical"
          style={{marginLeft: 'auto'}}
        /> */}
      </View>
      <View style={{flex: 1, marginTop: 20}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  slide: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  images: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image2: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  image3: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: '#293170',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default AttendedEvent;
