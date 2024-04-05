import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SH, Colors, SW, SF} from '../../utils';
import IconF from 'react-native-vector-icons/AntDesign';
import {getEventWithUserId} from '../../Services/ApiList';
import {getFromLocalStorage} from '../../Services/Api';
import {useNavigation} from '@react-navigation/native';
import Egypto from 'react-native-vector-icons/Entypo';
import moment from 'moment';
const ScanList = () => {
  const navigation = useNavigation();
  const [scanData, setScanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleGetByUserId = async () => {
    try {
      const Gettingtoken = JSON.parse(await getFromLocalStorage('@UserInfo'));
      const response = await getEventWithUserId(Gettingtoken.id);
      console.log('Events:.....======', response.data?.data);
      setScanData(response.data.data);

      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetByUserId();
  }, []);
  console.log('ppppppppp', scanData);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <IconF size={SF(20)} name="left" style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan</Text>
        <TouchableOpacity>
          <Egypto
            size={SF(20)}
            name="dots-three-vertical"
            style={styles.headerIconRight}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            width: '100%',
            paddingBottom: 100,
          }}>
          <FlatList
            data={scanData}
            renderItem={({item}) => (
              <View style={styles.flatListView}>
                <Text style={styles.lightTextStyle}>
                  {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: SW(300),
                  }}>
                  <Text style={styles.lightTextStyle}>
                    {item.user.firstName}
                  </Text>
                  <Text style={styles.lightTextStyle}>
                    {item.user.lastName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    height: 30,
                  }}>
                  <Text style={styles.boldText}>{item.name}</Text>

                  <Text style={styles.lightTextStyle}>{item.address}</Text>
                </View>
                <View
                  style={{
                    height: SH(0.5),
                    width: SW(300),
                    borderBottomWidth: 0.5,
                    borderColor: 'black',
                    marginTop: 30,
                  }}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Scan')}
                  style={styles.scanstyle}>
                  <Text style={styles.scanText}>Scan</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },

  headerContainer: {
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
    elevation: 10,
  },
  HeaderText: {
    alignItems: 'center',
    alignContent: 'center',
    fontWeight: '700',
    fontSize: SF(20),
    color: 'black',
  },
  IconStyle: {
    marginLeft: 10,
    marginRight: 20,
    color: 'black',
    fontWeight: '800',
    marginTop: 120,
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
  lightTextStyle: {
    color: 'gray',
    fontWeight: '500',

    fontSize: 12,
  },
  boldText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 12,
  },
  scanstyle: {
    height: 40,
    width: SW(300),
    backgroundColor: '#293170',
    marginLeft: 'auto',
    marginRight: 5,
    marginTop: 5,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  scanText: {
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: '700',
  },
  flatListView: {
    padding: 10,

    height: SH(180),
    backgroundColor: '#f8f9fc',
    width: '98%',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    // elevation: 5,

    marginTop: 10,
    elevation: 5,
  },
});

export default ScanList;
