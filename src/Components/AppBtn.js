import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {h} from 'react-native-responsiveness';
import {maincolor, textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
const AppBtn = ({clickfun, title, isDisabled, outHeight}) => {
  return (
    <View
      style={{
        width: '100%',
        height: outHeight ? outHeight : h('15%'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
      }}>
      <TouchableOpacity
        onPress={() => {
          if (clickfun) {
            clickfun();
          } else {
            console.log('hy');
          }
        }}
        style={{
          width: '75%',
          height: h('7.5'),
          backgroundColor: isDisabled ? textcolor : maincolor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
        }}>
        <Text style={TextStyles.appbtntxt}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppBtn;
