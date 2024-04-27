import {View, Text, FlatList, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getEventDetailInfo} from '../../Services/ApiList';
import BirthdayCard from '../../Components/commonComponents/BirthdayCard';
import images from '../../index';
import moment from 'moment';
const InvitesDetail = ({route}) => {
  const {invitesCurrentStatus, eventId} = route.params;
  const [intvitesDetail, setInvitesDetail] = useState([]);

  useEffect(() => {
    handleDetailInvitesInfo();
  }, []);

  const handleDetailInvitesInfo = async listValue => {
    try {
      const response = await getEventDetailInfo(
        listValue ? listValue : invitesCurrentStatus,
        eventId,
      );

      setInvitesDetail(response?.data?.data);
      console.log('response?.data?.data', intvitesDetail);
    } catch (error) {
      console.log('Error sending invites:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderView}>
        <Text style={styles.textStyle}>{item.name}</Text>
        <Text
          style={{
            marginLeft: 'auto',
            marginBottom: 2,
            color: 'black',
            fontWeight: '500',
            fontSize: 12,
          }}>
          {item.status}
        </Text>
        <Text style={styles.textStyle}>
          {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 160}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cardRow}>
            <BirthdayCard
              title="Invited"
              imageUrl={images.blueiconone}
              onPress={() => handleDetailInvitesInfo('invited')}
            />

            <BirthdayCard
              title="Confirmed"
              imageUrl={images.confirmed}
              onPress={() => handleDetailInvitesInfo('confirmed')}
            />
            {/* <BirthdayCard
              title="Scanned"
              imageUrl={images.scanned}
              onPress={() => handleDetailInvitesInfo('Scanned')}
            /> */}
            <BirthdayCard
              title="pending"
              imageUrl={images.waitng}
              onPress={() => handleDetailInvitesInfo('pending')}
            />
            <BirthdayCard
              title="Rejected"
              imageUrl={images.rejected}
              onPress={() => handleDetailInvitesInfo('rejected')}
            />
            <BirthdayCard
              title="NotInvited"
              imageUrl={images.notinivted}
              onPress={() => handleDetailInvitesInfo('NotInvited')}
            />
            <BirthdayCard
              title="failed"
              imageUrl={images.Failedicon}
              onPress={() => handleDetailInvitesInfo('failed')}
            />
          </View>
        </ScrollView>
      </View>
      {intvitesDetail?.length === 0 ? (
        <Text style={styles.noDataText}>No data found</Text>
      ) : (
        <FlatList
          data={intvitesDetail}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  renderView: {
    flex: 1,
    backgroundColor: '#f8f9fc',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 5,
    flexDirection: 'column',
  },
  cardRow: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    marginBottom: 0,
  },
  textStyle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 12,
  },
  noDataText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 80,
  },
});
export default InvitesDetail;
