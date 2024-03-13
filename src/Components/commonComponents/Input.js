import React, {useMemo} from 'react';
import propTypes from 'prop-types';
import {View, TextInput, StyleSheet} from 'react-native';
import {SF, SH, SW, Fonts, Colors} from '../../utils/index';
import {useTheme} from '@react-navigation/native';
function Input({
  title,
  placeholder,
  titleStyle,
  inputStyle,
  onChangeText,
  value,
  autoCorrect,
  enablesReturnKeyAutomatically,
  maxLength,
  placeholderStyle,
  numberOfLines,
  inputprops,
  onBlur,
  onFocus,
  inputType,
  autoFocus,
  Descriptioninput,
  SearchHomeTab,
  secureTextEntry,
}) {
  const {colors} = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {width: '95%'},
        title_style: {
          width: '90%',
          fontSize: SF(12),
          color: colors.tundora,
          fontWeight: '400',
          marginBottom: SH(6),
          padding: SH(5),
          justifyContent: 'center',
          ...titleStyle,
        },
        input_style: {
          paddingHorizontal: SH(15),
          width: '90%',
          paddingTop: SH(12),
          paddingBottom: SH(7),
          height: SH(55),
          color: Colors.gray_text_color,
          fontSize: SF(13),
          fontFamily: Fonts.Poppins_Medium,
          borderTopLeftRadius: SF(20),
          borderBottomRightRadius:SF(20),
          marginLeft: SF(10),

          backgroundColor: Colors.light_gray_text_color,
          shadowColor: Colors.light_gray_text_color,
          shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 2 : 25,
          },
          shadowOpacity: 0.58,
          shadowRadius: Platform.OS === 'ios' ? 2 : 25,
          elevation: Platform.OS === 'ios' ? 1 : 2,
          ...Descriptioninput,
          ...SearchHomeTab,
          ...inputStyle,
        },
      }),
    [title, titleStyle, inputStyle, colors],
  );
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={Colors.gray_text_color}
        style={styles.input_style}
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        value={value}
        enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
        autoCorrect={autoCorrect}
        placeholderStyle={placeholderStyle}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        keyboardType={!inputType ? 'default' : inputType}
        selectionColor={colors.red}
        secureTextEntry={secureTextEntry}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        autoFocus={autoFocus}
        {...inputprops}
      />
    </View>
  );
}

Input.defaultProps = {
  title: '',
  placeholder: '',
  titleStyle: {},
  inputStyle: {},
  onChangeText: () => {},
  onFocus: () => {},
  onBlur: () => {},
  value: '',
  textprops: {},
  inputprops: {},
  inputType: null,
};

Input.propTypes = {
  title: propTypes.string,
  placeholder: propTypes.string,
  titleStyle: propTypes.shape({}),
  inputStyle: propTypes.shape({}),
  onChangeText: propTypes.func,
  value: propTypes.string,
  textprops: propTypes.object,
  inputprops: propTypes.object,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  inputType: propTypes.any,
};

export default Input;
