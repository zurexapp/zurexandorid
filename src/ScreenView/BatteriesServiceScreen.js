import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import {useTranslation} from '../Text/TextStrings';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import CustomDropDownBtn from '../Components/CustomDropDownBtn';
import {borderColor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';

const BatteriesServiceScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const [selectedValue, setselectedValue] = useState('');
  const RedBgBtn = ({title, imglink, onPressBtn}) => {
    return (
      <TouchableOpacity onPress={onPressBtn} style={styles.btnConatiner}>
        <Image source={imglink} style={styles.redbtnImage} />
        <Text style={{...TextStyles.verifcationtime, color: 'black'}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.batteriesTxt}
        iconName1={'left'}
        firstbtnFun={() => navigation.goBack()}
      />
      <View style={styles.otherContent}>
        <View style={styles.dateSelctorView}>
          <View style={{width: '47%'}}>
            <DateSelectorModelInput placeHolder={textStrings.fromBtnTxt} />
          </View>
          <View style={{width: '47%'}}>
            <DateSelectorModelInput placeHolder={textStrings.toBtnTxt} />
          </View>
        </View>
        <CustomDropDownBtn
          title={textStrings.choseBatteryType}
          value={selectedValue}
          onCangeValue={text => setselectedValue(text)}
          listData={[
            {id: 0, title: 'All', value: 'all'},
            {id: 1, title: 'Ac zurex', value: 'aczurex'},
            {id: 2, title: 'Camel', value: 'camel'},
          ]}
          isDropDown={true}
          isSmallDesign={true}
        />
        <View
          style={{
            ...styles.otherContent,
            justifyContent: 'center',
            marginBottom: h('7%'),
          }}>
          <View style={styles.btnContainerRed}>
            <RedBgBtn
              imglink={require('../assets/cityicon.png')}
              title={textStrings.byCityBtnTxt}
              onPressBtn={() => navigation.navigate('ByCityScreen')}
            />
            <RedBgBtn
              imglink={require('../assets/caricon.png')}
              title={textStrings.byCarBtnTxt}
              onPressBtn={() => navigation.navigate('ByCarScreen')}
            />
          </View>
          <View style={{...styles.btnContainerRed, marginTop: h('2%')}}>
            <RedBgBtn
              imglink={require('../assets/packageicon.png')}
              title={textStrings.numOrdersBtnTxt}
              onPressBtn={() => navigation.navigate('ByOrderScreen')}
            />
            <RedBgBtn
              imglink={require('../assets/charticon.png')}
              title={textStrings.orderRevBtnTxt}
              onPressBtn={() => navigation.navigate('ByOrderRevenueScreen')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BatteriesServiceScreen;

const styles = StyleSheet.create({
  btnContainerRed: {
    width: '90%',
    height: h('23%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  dateSelctorView: {
    width: '90%',
    height: h('6%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: h('2%'),
  },
  btnConatiner: {
    width: w('40%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: borderColor,
  },
  redbtnImage: {
    width: '100%',
    resizeMode: 'contain',
    height: h('12%'),
  },
});
