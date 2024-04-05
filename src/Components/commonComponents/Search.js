import React, {useState, useMemo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';
import {Spacing, Input} from '../commonComponents';
import {SH, Colors, SF, SW} from '../../utils';
import images from '../../index';
import {useTheme} from '@react-navigation/native';

const Search = () => {
  const {t} = useTranslation();
  const [search, Setsearch] = useState('');
  const {Colors} = useTheme();
  //const HomeTabStyle = useMemo(() => HomeTabStyles(Colors), [Colors]);

  return (
    <View style={styles.BgColorView}>
      <View style={styles.FlexrowSearchView}>
        <View style={styles.IconViewStyles}>
          <Icon
            name="search1"
            size={16}
            color={'black'}
            style={styles.iconstyle}
          />
        </View>
        <View style={HomeTabStyle.InputSpaceView}>
          <Input
            placeholder={'Find Events'}
            onChangeText={value => Setsearch(value)}
            value={search}
            color={'black'}
            placeholderTextColor={'black'}
            inputStyle={styles.BgColorTransparent}
            placeholderStyle={styles.PlaceHolderStyles}
          />
        </View>
      </View>
      <Spacing space={SH(10)} />
    </View>

    // <View style={HomeTabStyle.BgColorView}>
    //   {/* <View style={{flexDirection: 'row'}}> */}
    //   {/* <Image
    //       source={require('../../images/Statusbar.png')}
    //       style={HomeTabStyle.statusstyle}
    //     /> */}
    //   <View style={HomeTabStyle.FlexrowSearchView}>
    //     <View style={HomeTabStyle.InputSpaceView}>
    //       <Input
    //         placeholder={t('Search_Inbox')}
    //         onChangeText={value => Setsearch(value)}
    //         value={search}
    //         // placeholderTextColor={Colors.gray_text_color}
    //         inputStyle={HomeTabStyle.BgColorTransparent}
    //         placeholderStyle={HomeTabStyle.PlaceHolderStyles}
    //       />
    //     </View>
    //     <View style={HomeTabStyle.IconViewStyles}>
    //       <Icon name="search1" size={23} />
    //     </View>
    //   </View>
    //   {/* </View> */}

    //   <Spacing space={SH(100)} />
    // </View>
  );
};
const styles = StyleSheet.create({
  BgColorView: {
    padding: SH(12),

    justifyContent: 'center',
    // borderBottomRightRadius: SF(40),
    // borderBottomLeftRadius: SF(40),
    backgroundColor: Colors.darkBlue,
  },
  FlexrowSearchView: {
    backgroundColor: Colors.white_text_color,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SW(20),
    marginTop: SH(5),
    borderRadius: 10,
    // borderTopLeftRadius: SH(20),
    // borderBottomRightRadius: SH(20),
    width: '90%',
  },
  IconViewStyles: {
    marginLeft: 15,
    marginVertical: 15,
  },
  BgColorTransparent: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: SF(15),
    marginBottom: 5,
    // color: 'black',
    // paddingTop: SH(7),
    // borderTopLeftRadius: 20,
    // height: SH(50),
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 0 : 0,
    },
    PlaceHolderStyles: {
      color: Colors.black_text_color,
      fontSize: SF(10),
    },
    iconstyle: {
      fontWeight: '800',
    },
  },
});
export default Search;
