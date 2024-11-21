import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {useTranslation} from '../Text/TextStrings';
import {w, h} from 'react-native-responsiveness';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import {borderColor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
const ByOrderRevenueScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const dataArray = [
    {id: 0, name: '11/05/2023', value: '1150'},
    {id: 1, name: '12/05/2023', value: '1160'},
    {id: 2, name: '13/05/2023', value: '1270'},
    {id: 3, name: '14/05/2023', value: '2141'},
    {id: 4, name: '15/05/2023', value: '3434'},
    {id: 5, name: '16/05/2023', value: '2423'},
    {id: 6, name: '17/05/2023', value: '4477'},
    {id: 7, name: '18/05/2023', value: '21'},
    {id: 8, name: '19/05/2023', value: '4577'},
    {id: 9, name: '20/05/2023', value: '8558'},
    {id: 10, name: '21/05/2023', value: '5612'},
    {id: 11, name: '22/05/2023', value: '6134'},
    {id: 12, name: '23/05/2023', value: '8456'},
    {id: 13, name: '24/05/2023', value: '8786'},
    {id: 14, name: '25/05/2023', value: '4123'},
    {id: 15, name: '26/05/2023', value: '6456'},
    {id: 16, name: '27/05/2023', value: '7432'},
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.byOrderRevBtnTxt}
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
        <View style={styles.listContainerView}>
          <FlatList
            keyExtractor={item => item.id}
            data={dataArray}
            ItemSeparatorComponent={
              <View
                style={{
                  marginBottom: h('0.2%'),
                  borderColor: borderColor,
                  borderWidth: 0.5,
                  width: '90%',
                  alignSelf: 'center',
                }}
              />
            }
            renderItem={({item}) => (
              <View style={styles.listItemView}>
                <Text
                  style={{
                    ...TextStyles.orderstepstimetxt,
                    textAlign: 'left',
                    width: '35%',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    ...TextStyles.orderstepstimetxt,
                    textAlign: 'right',
                    width: '35%',
                    color: 'black',
                  }}>
                  {item.value}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};
export default ByOrderRevenueScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
    paddingVertical: h('4%'),
  },
  dateSelctorView: {
    width: '90%',
    height: h('6%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  listContainerView: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
    marginTop: h('3%'),
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: borderColor,
  },
  listItemView: {
    width: '90%',
    alignSelf: 'center',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: h('1%'),
  },
});
