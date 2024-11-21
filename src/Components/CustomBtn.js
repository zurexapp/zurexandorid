import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {h, w} from 'react-native-responsiveness';
import {maincolor} from '../assets/Colors';
import Icon2 from 'react-native-vector-icons/AntDesign';
import TextStyles from '../Text/TextStyles';

const CustomBtn = ({
  clickfun,
  title,
  iconName,
  secColor,
  bgColor,
  children,
  borderColor,
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: h('9%'),
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
          width: '90%',
          height: h('7.5'),
          backgroundColor: bgColor ? bgColor : '#FAFCFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          borderWidth: 0.5,
          borderColor: borderColor ? borderColor : '#13488B',
          position: 'relative',
        }}>
        {iconName && !children ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: w('10%'),
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            {iconName && (
              <Icon2 name={`${iconName}`} size={h('3.8%')} color={maincolor} />
            )}
          </View>
        ) : null}
        {!iconName && children ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: w('20%'),
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            {children}
          </View>
        ) : null}
        <Text
          style={{
            ...TextStyles.custombtntitletxt,
            color: secColor ? secColor : maincolor,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({});
