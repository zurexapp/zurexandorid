import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {useTranslation} from '../Text/TextStrings';
import {w, h} from 'react-native-responsiveness';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import {borderColor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
const ByCarScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const dataArray = [
    {id: 0, name: 'Car Name', value: '48%'},
    {id: 1, name: 'Car Name', value: '78%'},
    {id: 2, name: 'Car Name', value: '88%'},
    {id: 3, name: 'Car Name', value: '98%'},
    {id: 4, name: 'Car Name', value: '28%'},
    {id: 5, name: 'Car Name', value: '18%'},
    {id: 6, name: 'Car Name', value: '58%'},
    {id: 7, name: 'Car Name', value: '38%'},
    {id: 8, name: 'Car Name', value: '98%'},
    {id: 9, name: 'Car Name', value: '18%'},
    {id: 10, name: 'Car Name', value: '8%'},
    {id: 11, name: 'Car Name', value: '18%'},
    {id: 12, name: 'Car Name', value: '45%'},
    {id: 13, name: 'Car Name', value: '32%'},
    {id: 14, name: 'Car Name', value: '33%'},
    {id: 15, name: 'Car Name', value: '54%'},
    {id: 16, name: 'Car Name', value: '41%'},
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.byCarBtnTxt}
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

export default ByCarScreen;

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
