import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SH, Colors, SW, SF} from '../../utils';
import IconF from 'react-native-vector-icons/AntDesign';

import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import Egypto from 'react-native-vector-icons/Entypo';
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

const Upcommingevents = ({navigation, route}) => {
  const {upcoming} = route.params;
  console.log('upcoming---', upcoming);
  const renderItem = ({item}) => (
    <View style={styles.slide}>
      {/* Wrap the image inside TouchableOpacity */}
      <TouchableOpacity onPress={() => navigation.navigate('Invitationreport')}>
        <Image source={{uri: item.image}} style={styles.images} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.name}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>{item.eventDate}</Text>
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <IconF size={SF(20)} name="left" style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Upcomming Events</Text>
        <TouchableOpacity>
          <Egypto
            size={SF(20)}
            name="dots-three-vertical"
            style={styles.headerIconRight}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginTop: 20}}>
        <FlatList
          data={upcoming}
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
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ffff',
    padding: SW(10),
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: SF(20),
    color: 'black',
  },
  headerIcon: {
    height: SH(50),
    marginLeft: 10,
    marginRight: 20,
    marginTop: 30,
    color: '#000',
  },
  headerIconRight: {
    marginRight: 10,
    color: '#000',
  },
  headerView: {
    width: '99%',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#f8f9fc',
    padding: SW(10),
  },
  HeaderText: {
    alignItems: 'center',
    alignContent: 'center',
    fontWeight: '700',
    fontSize: SF(20),
    color: 'black',
  },
  IconStyle: {
    height: SH(30),
    marginLeft: 10,
    marginRight: 20,
    color: 'black',
    fontWeight: '900',
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

export default Upcommingevents;
