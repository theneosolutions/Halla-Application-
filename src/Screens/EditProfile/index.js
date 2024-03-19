import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, TouchableOpacity, Image, Modal,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/AntDesign';
import IconG from 'react-native-vector-icons/Ionicons';
import {SH, SF, SW, Colors} from '../../utils';
import images from '../../index';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';
import styles from './styles';
import {getFromLocalStorage} from '../../Services/Api';
import {getProfileWithUserId} from '../../Services/ApiList';
const EditDetail = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [editUsernameModalVisible, setEditUsernameModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
        const response = await getProfileWithUserId(Gettingtoken.id);
        console.log('profilee:.....======', response.data.createdAt);
        setProfileData(response.data);
        console.log('setProfileData=====------',profileData.username)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchData(); 
  
  }, []);

  const handleEditUsername = () => {
    setEditUsernameModalVisible(true);
  };

  const handleSaveUsername = () => {
    setEditUsernameModalVisible(false);
    // You can add your logic here to update the username
  };
  const closeModal = () => {
    setEditUsernameModalVisible(false);}
   return (
    <View style={styles.BackgroundWhite}>
      <View style={styles.whilistminbody}>
        <View style={styles.ImagCenter}>
          <View>
            <Image
              style={styles.ImageStyles}
              resizeMode="cover"
              source={{uri:profileData?.profilePhoto}}
            />
            <Text style={styles.UserName}>{profileData?.firstName}{profileData?.lastName}</Text>
          </View>
        </View>
        <View style={styles.ProfileDetailesMinview}>
          {/* ///////////////////////williomjonson//////////////// */}
          <View style={styles.profiledetailboxview}>
            <Text style={styles.boxone}>{profileData?.username}</Text>
            <Text style={styles.boxtwo}></Text>
            <TouchableOpacity onPress={handleEditUsername}>
               <Icon
              size={SF(30)}
              name="pencil"
              style={styles.boxthree}
            />
            </TouchableOpacity>
           
          </View>
          {/* //////////////////Williomjanson/////////////////// */}
          <View style={styles.profiledetailboxview}>
            <Text style={styles.boxone}>+880 000 111 333</Text>
            <Text style={styles.boxtwo}></Text>
            <Icon
              size={SF(30)}
              name="pencil"
              style={styles.boxthree}
              />
          </View>
          {/* //////////////////Williomjanson/////////////////// */}
          <View style={styles.profiledetailboxview}>
            <Text style={styles.boxone}>email@website.com</Text>
            <Text style={styles.boxtwo}></Text>
            <Icon
              size={SF(30)}
              name="pencil"
             style={styles.boxthree}
            />
          </View>

          {/* //////////////////Williomjanson/////////////////// */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={styles.profiledetailboxview}>
              <Text style={styles.boxone}>
                email@website.com{'\n'}Fusce Rd.Frederick Nebraska
              </Text>
              <Text style={styles.boxtwo}></Text>
              <Icon
                size={SF(30)}
                name="pencil"
                style={styles.boxthree}

              />
            </View>
          </TouchableOpacity>
          {/* /////////////////////////////// */}

          {/* <TouchableOpacity
            style={styles.savebtn}
            onPress={() => navigation.navigate('ChatScreen')}>
            <Text style={styles.savebtntext}>Save Now</Text>
          </TouchableOpacity> */}

           {/* Edit Username Modal */}
           <Modal
            animationType="slide"
            transparent={true}
            visible={editUsernameModalVisible}
            onRequestClose={() => setEditUsernameModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new username"
                  value={username}
                  onChangeText={setUsername}
                />
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.modalButton} onPress={handleSaveUsername}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                </View>
              
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};
export default EditDetail;


