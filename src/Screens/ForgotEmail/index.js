import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,ScrollView
} from 'react-native';

import images from '../../index';
import IconF from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontC from 'react-native-vector-icons/MaterialCommunityIcons';
import {SH, SF, SW, Colors} from '../../utils';
import {confirmemail} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';
import {useTranslation} from 'react-i18next';
import styles from './styles';
const Forgotemail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const {t, i18n} = useTranslation();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getFromLocalStorage('@UserToken');
        console.log('getItem=======', storedToken);
        setToken(storedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  const forgotpass = async () => {
    const data = {
      email: email,
      token: token,
    };
    console.log('data=======', data);
    const response = await confirmemail(data);

    console.log('confirmemail==========', response);
     navigation.navigate('OTPVerify', {email});
  };

  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View style={styles.Container}>
              <View   style={styles.firstHalfView}>
          <Text  style={styles.forgotstyle}>  Forgot Password</Text>
          <Text style={styles.textStyle}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sintvelit officia consequat duis enim velit mollit.</Text>
          <View style={styles.imageview}>
              <Image source={images.halalogo} style={styles.imgstyle} />
          </View>
        
        </View>

   
      
          <Text
            style={{
          
      marginRight:'auto',
        color:'black',
        paddingLeft:50,
        fontWeight:'500',
              fontSize: SF(15),
            }}>
            {t('Email')}
          </Text>
      
          <TouchableOpacity
            style={styles.touchablestyleW}
            onPress={() => navigation.navigate('Forgotemail')}>
            <View style={{flexDirection: 'row'}}>
              <FontC
                size={SF(25)}
                name="email-outline"
                style={styles.Iconstyle}
                color={'black'}
              />
              <TextInput
                style={styles.input}
                placeholder={t('Email')}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'black'}
              />
            </View>
          </TouchableOpacity>
        
        <View
          style={{
            height:100,
            // flex: 0.2,
           
            width: '100%',
            justifyContent: 'center',
            alignItem: 'center',
          }}>
          <TouchableOpacity
            style={styles.touchablestyle}
            onPress={() => forgotpass()}

     
          >
            <Text style={styles.btntext}>{t('Continue')}</Text>
          </TouchableOpacity>
        </View>
  
      </View>
  
    </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default Forgotemail;
