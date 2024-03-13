import React, {useMemo} from 'react';
import {TouchableOpacity, StyleSheet, Text, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {Fonts, SF, SH, SW, Colors} from '../../utils';
import {useTheme} from '@react-navigation/native';
// import {useSelector} from 'react-redux';

function Button(props) {
  const {
    title,
    onPress,
    buttonStyle,
    disable,
    buttonTextStyle,
    imagesource,
    spacedImages,
  } = props;

  const {colors} = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        buttonStyle: {
          backgroundColor: 'black',
          // backgroundColor: Colors.theme_background_han_Purple,
          alignItems: 'center',
          borderRadius: 7,
          justifyContent: 'center',
          width: '94%',
          height: SH(65),
          justifyContent: 'center',
          paddingRight: SH(20),
          marginLeft: SH(12),
          shadowColor: Colors.black_text_color,
          shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 2 : 25,
          },
          shadowOpacity: 0.58,
          shadowRadius: Platform.OS === 'ios' ? 2 : 25,
          elevation: Platform.OS === 'ios' ? 1 : 3,
        },
        buttonTextStyle: {
          color: Colors.white_text_color,
          fontFamily: Fonts.Poppins_Medium,
          fontSize: SF(19),
          fontWeight: '600',
          lineHeight: SH(20),
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonViewStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: spacedImages ? 'space-around' : 'center',
          width: '100%',
        },
        LeftImageViewStyle: {
          marginVertical: SW(5),
        },
      }),
    [disable, spacedImages, colors],
  );
  return (
    <TouchableOpacity
      disabled={disable}
      style={[styles.buttonStyle, {...buttonStyle}]}
      onPress={() => onPress()}>
      <View style={styles.buttonViewStyle}>
        {imagesource && (
          <Image
            source={imagesource}
            style={styles.LeftImageViewStyle}
            resizeMode="cover"
          />
        )}
        <Text style={[styles.buttonTextStyle, {...buttonTextStyle}]}>
          {title}
        </Text>
        {imagesource && <View />}
      </View>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  title: '',
  onPress: () => {},
  buttonStyle: {},
  disable: false,
  imagesource: null,
  buttonTextStyle: {},
  spacedImages: false,
};

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  buttonStyle: PropTypes.shape({}),
  disable: PropTypes.bool,
  imagesource: PropTypes.any,
  buttonTextStyle: PropTypes.shape({}),
  spacedImages: PropTypes.bool,
};

export default Button;
