import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {getFromLocalStorage} from '../../Services/Api';
import {createEventInfo, getCardInfo, imageLink} from '../../Services/ApiList';
import Entypo from 'react-native-vector-icons/Entypo';
import {SH, SF, SW, Colors} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const Card = props => {
  const navigation = useNavigation();
  const {eventData} = props.route.params;
  console.log('eventData---------', eventData);
  const [cardsData, setCardsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  useEffect(() => {
    GetCardDataInfo();
  }, []);
  const GetCardDataInfo = async () => {
    const response = await getCardInfo();
    console.log('response++++++', response?.data?.data);
    if (!response) {
      // Alert.alert('Event is not created');
    } else {
      setCardsData(response?.data?.data);
      // Alert.alert('Event is successfully created');
    }

    // Stop loading after data is fetched or in case of error
  };
  const handleImageClick = async item => {
    setSelectedCard(item);
    setShowModal(true);
  };

  const handleImageUpload = async () => {
    if (!eventData?.image) {
      console.log('No image selected');
      return;
    }
    const data = new FormData();
    data.append('file', {
      uri: eventData?.image?.path,
      type: 'image/jpeg', // You may need to adjust the type based on the image format
      name: 'image.jpg', // You can change the name as needed
    });
    try {
      const response = await imageLink(data);
      if (response.data) {
        console.log('🚀 ~ handleImageUpload ~ response.data:', response.data);
        const data = {
          ...eventData,
          cardId: selectedCard.id,
          image: response.data.link,
        };
        const eventResponse = await createEventInfo(data);
        console.log('🚀 ~ handleImageUpload ~ eventResponse:', eventResponse);
        if (eventResponse.data) {
          setLoading(false);
          navigation.navigate('AllDone');
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('Error uploading image:', error);
      // Handle error
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await handleImageUpload();
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
    }
  };
  const renderCardItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleImageClick(item)}
      style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      {showIcon && (
        <Entypo
          name="check"
          size={SF(25)}
          style={styles.icon}
          color={'black'}
        />
      )}
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {loading ? ( // Render loader if loading state is true
        <ActivityIndicator size="large" color={'#293170'} />
      ) : (
        <FlatList
          data={cardsData}
          renderItem={renderCardItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      )}
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 10, // Adjust this value as needed to position the icon
                right: 12, // Adjust this value as needed to position the icon
                zIndex: 1, // Ensure the icon is on top of other content
                backgroundColor: 'white',
                borderRadius: 18,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Entypo
                size={SF(18)}
                name="cross"
                style={{marginLeft: 'auto'}}
                color={'black'}
              />
              {/* <Text style={{color:'black',fontSize:12,fontWeight:'700',selfAlign:'center',paddingHorizontal:18,paddingVertical:5}}>Cancel</Text>*/}
            </TouchableOpacity>
            <Image
              source={{uri: selectedCard?.image}}
              style={styles.modalImage}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={handleConfirm}
                style={{
                  height: 35,
                  width: 230,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  margin: 5,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '600',
                    selfAlign: 'center',
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
              {/* <Button title="Confirm" onPress={handleConfirm} /> */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    margin: 10,
    selfAlign: 'center',
    shadowOffset: {
      width: '100%',
      height: 2,
    },
    // elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  notes: {
    fontSize: 14,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: 450,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#293170',
    marginTop: 150,
    margin: 80,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  modalImage: {
    width: '85%',
    height: 320,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 30,
  },
});
export default Card;
