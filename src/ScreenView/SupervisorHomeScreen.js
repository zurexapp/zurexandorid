import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import {useTranslation} from '../Text/TextStrings';
import {borderColor, c0color, maincolor, redcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';

const SupervisorHomeScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const RedBgBtn = ({title, imglink, onPressBtn}) => {
    const [changeColor, setchangeColor] = useState(false);
    const changeBgFun = () => {
      setchangeColor(true);
      console.log('onPress BUtton ' + title);
      setTimeout(() => {
        setchangeColor(false);
        onPressBtn();
      }, 300);
    };

    return (
      <TouchableOpacity
        onPress={onPressBtn}
        style={{
          ...styles.btnConatiner,
          backgroundColor: changeColor ? maincolor : '#fbfbfb',
        }}>
        <Image
          tintColor={changeColor ? '#ffffff' : redcolor}
          source={imglink}
          style={styles.redbtnImage}
        />
        <Text
          style={{
            ...TextStyles.verifcationtime,
            color: changeColor ? '#ffffff' : 'black',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={' '}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
      />
      <View style={styles.otherContent}>
        <View style={styles.rebButnsContainerView}>
          <RedBgBtn
            imglink={require('../assets/redteam.png')}
            title={textStrings.teamsBtnTxtHead}
            onPressBtn={() => navigation.navigate('HomeTeamScreen')}
          />
          <View style={{marginTop: h('4%')}} />
          <RedBgBtn
            imglink={require('../assets/packageicon.png')}
            title={textStrings.orderTitle}
            onPressBtn={() => navigation.navigate('MyOrderNwDup')}
          />
        </View>
      </View>
      <Image
        source={require('../assets/twobtnbg.png')}
        style={styles.twoBtnBgImg}
      />
    </View>
  );
};

export default SupervisorHomeScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
    position: 'relative',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  rebButnsContainerView: {
    width: '100%',
    height: h('72%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 2,
  },
  btnConatiner: {
    width: w('40%'),
    height: h('22%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: '#fbfbfb',
    borderWidth: 0.2,
    borderColor: borderColor,
  },
  redbtnImage: {
    width: '100%',
    resizeMode: 'contain',
    height: h('12%'),
  },
  twoBtnBgImg: {
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -h('68%'),
    left: 0,
    zIndex: -1,
  },
});
