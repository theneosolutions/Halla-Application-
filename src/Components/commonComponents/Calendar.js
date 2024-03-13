import React, {useState} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = day => {
    setSelectedDate(day.dateString);
  };

  return (
    <View>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'blue',
            selectedTextColor: 'white',
          },
        }}
      />
    </View>
  );
};

export default MyCalendar;
