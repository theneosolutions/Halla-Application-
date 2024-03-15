import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW, Colors} from '../../utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      slide: {
        //flex: 1,
    marginLeft:15,
        height: '70%',
        //alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#f2f2f4',
    // backgroundColor:'transparent',
        borderBottomRightRadius: 20,
      },
      title: {
        fontSize: 15,
        fontWeight: '600',
        color:'black',
        paddingHorizontal:16
        //marginBottom: 20,
      },
      images: {
        height: SH(200),
        width: SW(320),
        //borderRadius: 23,
     
        
       
        borderTopLeftRadius: 40,
                        borderBottomRightRadius: 40,
        //borderBottomLeftradius: 20,
        marginTop:55,
        marginBottom: 1,
      },
      text: {
        marginRight: 'auto',
        fontWeight: '700',
        color: 'black',
        marginTop:5,
        //textAlign: 'center',
        fontSize: 10,
        marginLeft: 15,
    
        // marginHorizontal: 30,
      },
      text2: {
        marginLeft: 'auto',
        fontWeight: '700',
        color: 'black',
        //textAlign: 'center',
        fontSize: 12,
        marginLeft: 14,
        
        // marginHorizontal: 30,
      },
});
export default styles;
