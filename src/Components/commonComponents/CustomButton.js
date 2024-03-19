import React from 'react';
import {TouchableOpacity, View, Text,StyleSheet} from 'react-native';
import IconF from 'react-native-vector-icons/Feather'; // Assuming you are using Feather icons
import {SF} from '../../utils'; // Assuming you have a utility for scaling font sizes

const CustomButton = ({onPress, text, iconName, iconColor, buttonStyle}) => {
  return (
    <TouchableOpacity style={[styles.container, buttonStyle]} onPress={onPress}>
      <View style={styles.content}>
        <IconF name={iconName} size={SF(20)} color={iconColor} style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontSize: SF(14),
    fontWeight: '700',
    color: 'white',
  },
});

export default CustomButton;
