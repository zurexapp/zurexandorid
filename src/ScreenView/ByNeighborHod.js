import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {useTranslation} from '../Text/TextStrings';
import {w, h} from 'react-native-responsiveness';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import {borderColor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useSelector} from 'react-redux';
import {getDataWholeCollection} from '../DataBase/databaseFunction';
import LoadingModal from '../Components/LoadingModal';
const ByNeighborHod = ({navigation}) => {
  const {textStrings} = useTranslation();
  const [fromDateValue, setfromDateValue] = useState(
    new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  );
  const [toDateValue, settoDateValue] = useState(new Date());
  const [isLoading, setisLoading] = useState(false);
  const [dataArray, setdataArray] = useState([]);
  const {myOrdersData, cityArr, neighborArr} = useSelector(
    state => state.project,
  );
  const findPercent = (amount, total) => {
    return Math.floor((amount / total) * 100).toFixed(2);
  };

  useEffect(() => {
    const findAllPercentData = suport => {
      const filtered = myOrdersData?.filter(
        dat =>
          Date.parse(new Date(dat?.updatedAt).toDateString()) >=
            Date.parse(fromDateValue) &&
          Date.parse(new Date(dat?.updatedAt).toDateString()) <=
            Date.parse(toDateValue),
      );
      const filteredArryCity = neighborArr?.map(dat => {
        let filteredByCity = filtered?.filter(
          dac =>
            `${dac?.deliveryInfo.cityName}`.toLowerCase() ===
            `${dat?.productNameEng}`.toLowerCase,
        );
        return {
          name: dat?.productNameEng,
          value: findPercent(
            filteredByCity?.length,
            myOrdersData?.length + suport,
          ),
          products: filteredByCity,
        };
      });
      setdataArray(filteredArryCity);
    };
    const getAllData = async () => {
      setisLoading(true);
      const result = await getDataWholeCollection('supportOrders');
      findAllPercentData(result?.length);
      setisLoading(false);
    };
    getAllData();
  }, [fromDateValue, toDateValue, myOrdersData, neighborArr]);

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.byNeighborHoodBtnTxt}
          iconName1={'left'}
          firstbtnFun={() => navigation.goBack()}
        />
        <View style={styles.otherContent}>
          <View style={styles.dateSelctorView}>
            <View style={{width: '47%'}}>
              <DateSelectorModelInput
                placeHolder={textStrings.fromBtnTxt}
                value={fromDateValue}
                setValue={text => setfromDateValue(text)}
                isSelectedValue={
                  Date.parse(fromDateValue) !==
                  Date.parse(new Date().toDateString())
                }
              />
            </View>
            <View style={{width: '47%'}}>
              <DateSelectorModelInput
                placeHolder={textStrings.toBtnTxt}
                value={toDateValue}
                setValue={text => settoDateValue(text)}
                isSelectedValue={
                  Date.parse(toDateValue) !==
                  Date.parse(new Date().toDateString())
                }
              />
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
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

export default ByNeighborHod;

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
