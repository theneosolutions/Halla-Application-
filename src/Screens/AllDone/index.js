import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import image from '../../images/index';
import {
  SH,
  SW,
  SF,
  MessageBox,
  OurService,
  HiNewsViewdata,
  Colors,
} from '../../utils';
const AllDone = ({navigation, route}) => {
  const {eventData} = route;
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          height: '70%',
          backgroundColor: 'white',
          alignItem: 'center',
          justifyContents: 'center',
          margin: 40,
          backgroundColor: 'white',
        }}>
        <Image
          source={image.success}
          style={{
            height: 200,
            width: 200,

            marginTop: 60,
            margin: 50,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 26,
            color: 'black',
            margin: 30,
          }}>
          All Done
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Invitationreport', {eventData})}
          // onPress={() => {
          //   console.log('0000000000000000');
          //   navigation.navigate('Home');
          // }}
          // onPress={shareEvent}
          style={{
            height: '8%',
            width: SW(160),
            backgroundColor: '#293170',
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            alignItem: 'center',
            marginLeft: 75,
          }}>
          <Text
            style={{
              alignItems: 'center',
              color: 'white',
              justifyContent: 'center',
              textAlign: 'center',
              paddingVertical: 10,
              fontWeight: '700',
            }}>
            Done
          </Text>
        </TouchableOpacity>
        <Image
          source={image.backimg}
          style={{height: '30', width: 200, position: 'absolute'}}
        />
      </View>
    </View>
  );
};

export default AllDone;
