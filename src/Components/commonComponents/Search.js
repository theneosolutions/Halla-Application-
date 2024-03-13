import React, {useState, useMemo} from 'react';
import {View, Image} from 'react-native';
import HomeTabStyle from '../../styles/CommonStyle/HomeTab';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';
import {Spacing, Input} from '../commonComponents';
import {SH, Colors} from '../../utils';
import images from '../../index';
import {useTheme} from '@react-navigation/native';

const Search = () => {
  const {t} = useTranslation();
  const [search, Setsearch] = useState('');
  const {Colors} = useTheme();
  //const HomeTabStyle = useMemo(() => HomeTabStyles(Colors), [Colors]);

  return (
    <View style={HomeTabStyle.BgColorView}>
      <View style={HomeTabStyle.FlexrowSearchView}>
        <View style={HomeTabStyle.InputSpaceView}>
          <Input
            placeholder={t('Search_Inbox')}
            onChangeText={value => Setsearch(value)}
            value={search}
            inputStyle={HomeTabStyle.BgColorTransparent}
            placeholderStyle={HomeTabStyle.PlaceHolderStyles}
          />
        </View>
        <View style={HomeTabStyle.IconViewStyles}>
          <Icon name="search1" size={23} />
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
export default Search;
