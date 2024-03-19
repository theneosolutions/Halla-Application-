import React, {useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import images from '../../index';
import Languages from '../../Language/i18n';
import {useTranslation} from 'react-i18next';
import styles from './styles';
const ResetPassDone = ({navigation}) => {
  const {t, i18n} = useTranslation();
   return (
      <View style={styles.Container}>
         <View
        style={{
          flex: 0.7,
 
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
        <Image source={images.Doone} style={styles.imgstyle} />
        <Text
          style={styles.alldonestyle}>
          {t('Allsetwelldone')}
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
   
          width: '98%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
        <TouchableOpacity
          style={styles.touchablestyle}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.btntext}>{t('Continue')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassDone;
