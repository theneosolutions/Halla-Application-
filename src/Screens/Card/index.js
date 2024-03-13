import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,Button
} from 'react-native';
import axios from 'axios';
import {getFromLocalStorage} from '../../Services/Api';
import { createEventInfo,GetCardInfo } from '../../Services/ApiList';
import Entypo from 'react-native-vector-icons/Entypo';
import {SH, SF, SW, Colors} from '../../utils';
import { useNavigation } from '@react-navigation/native';
const Card = props => {
  const navigation = useNavigation();
  //  const {eventData} =props.route; 
   const {eventData} = props.route.params;
   console.log('eventData',eventData)
   // Extracting eventData from props.route.params
  const [cardsData, setCardsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
// console.log('eventData====',eventData)
useEffect(() => {
  GetCardDataInfo();
}, []);

const GetCardDataInfo = async () => {
  const response = await GetCardInfo();
  setCardsData(response.data.data);
};

const handleImageClick = async item => {
  setSelectedCard(item);
  setShowModal(true);
};

const handleConfirm = async () => {
  try {
    const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
    const data = {...eventData, cardId: selectedCard.id};
    const response = await createEventInfo(data);
    if (response) {
      navigation.navigate('AllDone');
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

const renderCardItem = ({item}) => (
  <TouchableOpacity
    onPress={() => handleImageClick(item)}
    style={styles.card}>
    <Image source={{uri: item.image}} style={styles.image} />
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
    <FlatList
      data={cardsData}
      renderItem={renderCardItem}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
    />
    <Modal visible={showModal} animationType="slide">

    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
      <TouchableOpacity   onPress={() => setShowModal(false)}  style={{
       position: 'absolute',
       top: 2, // Adjust this value as needed to position the icon
       right: 1, // Adjust this value as needed to position the icon
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
                  style={{marginLeft:'auto'}}
                  color={'black'}
                />
            {/* <Text style={{color:'black',fontSize:12,fontWeight:'700',selfAlign:'center',paddingHorizontal:18,paddingVertical:5}}>Cancel</Text>*/}
            </TouchableOpacity> 
       
      
        <Image source={{uri: selectedCard?.image}} style={styles.modalImage} />
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity onPress={handleConfirm} style={{height:35,width:230,backgroundColor:'white',borderTopLeftRadius:8,borderBottomRightRadius:8,margin:5}}>
            <Text style={{color:'black',fontSize:16,fontWeight:'600',selfAlign:'center',textAlign:'center',paddingVertical:5}}>Confirm</Text></TouchableOpacity>
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
    backgroundColor:'white'
  },
  card: {
     flex: 1,
     margin: 10,
    selfAlign:'center',
   
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
    height:450,
    width:'75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#293170',
     marginTop:150,
    margin:80,
    borderRadius:20

  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  modalImage: {
    width: '80%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default Card;
