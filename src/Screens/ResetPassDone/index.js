import React, {useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

import images from '../../index';
import Languages from '../../Language/i18n';
import {useTranslation} from 'react-i18next';
//import ResetPass from '../ResetPass/index';
import {
  SH,
  SF,
  SW,
  MessageBox,
  OurService,
  HiNewsViewdata,
  Colors,
} from '../../utils';
import SplashStyl from '../../styles/CommonStyle/SplashStyl';

const ResetPassDone = ({navigation}) => {
  const {t, i18n} = useTranslation();
  //   useEffect(() => {
  //     setTimeout(() => {
  //       //navigation.navigate('RegistrationScreen');
  //     }, 1000);
  //   }, [navigation]);

  return (
    <View style={SplashStyl.Container}>
      <View
        style={{
          flex: 0.7,
          //backgroundColor: 'green',
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
        <Image source={images.Doone} style={SplashStyl.imgstyle} />
        <Text
          style={{
            color: '#293170',
            fontWeight: '500',
            alignItem: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: SF(25),
            marginTop: SH(40),
          }}>
          {t('Allsetwelldone')}
        </Text>
      </View>

      {/* <Text>Event Management made easy</Text> */}
      <View
        style={{
          flex: 0.3,
          // backgroundColor: 'red',
          width: '98%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
        <TouchableOpacity
          style={SplashStyl.touchablestyle}
          onPress={() => navigation.navigate('GoogleLogin')}>
          <Text style={SplashStyl.btntext}>{t('Continue')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassDone;
