import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from '../Text/TextStrings';
import {w, h} from 'react-native-responsiveness';
import {BarChart} from 'react-native-gifted-charts';
import {
  graphSecondColor,
  maincolor,
  greencolor,
  redcolor,
  textcolor,
} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import FourBtnContainerView from '../Components/FourBtnContainerView';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import TextStyles from '../Text/TextStyles';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomBtn from '../Components/CustomBtn';
import {useDispatch, useSelector} from 'react-redux';
import LoadingModal from '../Components/LoadingModal';

const TeamNameScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const {teamId} = route?.params;
  const [memebersArr, setmemebersArr] = useState([]);
  const [fromDateValue, setfromDateValue] = useState(
    new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  );
  const [toDateValue, settoDateValue] = useState(new Date());
  const [teamLocationInfo, setteamLocationInfo] = useState({
    name: '',
    cityName: '',
    locationCoordinates: {latitude: 0, longitude: 0},
  });
  const {myOrdersData, employsData} = useSelector(state => state.project);
  const [CurentTeamOrderData, setCurentTeamOrderData] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFilteredData = () => {
      const result = myOrdersData?.filter(
        dat =>
          dat?.TeamId === teamId &&
          dat?.updatedAt >= Date.parse(fromDateValue) &&
          dat?.updatedAt <= Date.parse(toDateValue),
      );
      setCurentTeamOrderData(result);
    };
    getFilteredData();
  }, [fromDateValue, toDateValue, myOrdersData, teamId]);

  useEffect(() => {
    const getTeamData = async () => {
      setisLoading(true);
      const filteredTeam = employsData?.filter(dat => dat?.id === teamId);
      setteamLocationInfo({
        name: filteredTeam[0]?.teamInfo?.name,
        cityName: filteredTeam[0]?.teamInfo?.cityName,
        locationCoordinates: filteredTeam[0]?.teamInfo?.locationCoordinates,
      });
      console.log(filteredTeam[0]?.teamInfo);
      setmemebersArr(filteredTeam[0]?.teamInfo?.members);
      setisLoading(false);
    };
    getTeamData();
  }, [employsData, teamId]);
  const curentOrders = CurentTeamOrderData?.filter(
    dat => dat.orderStatus === 'approved',
  );
  const cancelOrders = CurentTeamOrderData?.filter(
    dat => dat.orderStatus === 'canceled',
  );
  const completedOrders = CurentTeamOrderData?.filter(
    dat => dat.orderStatus === 'completed',
  );
  const newOrders = myOrdersData?.filter(
    dat => dat?.orderStatus === 'assigned',
  );
  const CompleteOrderfilteredDataWithMonth2 = curentDay => {
    const result = CurentTeamOrderData?.filter(
      dat =>
        new Date(dat?.updatedAt).getDay() === curentDay &&
        dat?.orderStatus === 'completed',
    );
    return result?.length;
  };
  const UnCompletefilteredDataWithMonth = curentDay => {
    const result = CurentTeamOrderData?.filter(
      dat =>
        new Date(dat?.updatedAt).getDay() === curentDay &&
        dat?.orderStatus === 'canceled',
    );
    return result?.length;
  };
  const stackData = [
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth2(0), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(0),
          color: graphSecondColor,
        },
      ],
      label: 'Sun',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth2(1), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(1),
          color: graphSecondColor,
        },
      ],
      label: 'Mon',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth2(2), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(2),
          color: graphSecondColor,
        },
      ],
      label: 'Tue',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth2(3), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(3),
          color: graphSecondColor,
        },
      ],
      label: 'Wed',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth2(4), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(4),
          color: graphSecondColor,
        },
      ],
      label: 'Thu',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth2(5), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(5),
          color: graphSecondColor,
        },
      ],
      label: 'Fri',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth2(6), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(6),
          color: graphSecondColor,
        },
      ],
      label: 'Sat',
    },
  ];
  const subtext = '30%';
  console.log(memebersArr);
  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={teamLocationInfo.name}
          iconName1={'left'}
          firstbtnFun={() => navigation.goBack()}
        />
        <View style={styles.otherContent}>
          <Text
            style={{
              ...TextStyles.newcurvedscreenname,
              fontWeight: 'bold',
              textAlign: 'center',
              color: maincolor,
              marginBottom: h('2%'),
            }}>
            {textStrings.oilAndBatryChangeTeam}
          </Text>
          <View style={styles.monthContainerView}>
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
          <FlatList
            data={memebersArr}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <View style={styles.otherContent}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyOrderNwDup')}
                  style={styles.pointContainer}>
                  <View style={styles.iconContainerView}>
                    <Octicons
                      name={'package'}
                      color={redcolor}
                      size={h('3%')}
                    />
                  </View>
                  <View style={{...styles.firstTxtCont, flex: 1}}>
                    <Text style={TextStyles.balancemainTxt}>
                      {textStrings.numberOfOrdersTxt}
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                      }}>
                      <MaterialIcons
                        name="show-chart"
                        size={h('3%')}
                        color={subtext?.includes('-') ? redcolor : greencolor}
                        style={
                          subtext?.includes('-')
                            ? {transform: [{rotateY: '180deg'}]}
                            : {}
                        }
                      />
                      <Text
                        style={{
                          ...TextStyles.balancesubtxt,
                          marginLeft: w('1%'),
                        }}>
                        ({subtext})
                      </Text>
                    </View>
                  </View>
                  <View style={styles.firstTxtCont}>
                    <Text
                      style={{...TextStyles.balancevaluetxt, color: maincolor}}>
                      {CurentTeamOrderData?.length
                        ? CurentTeamOrderData?.length
                        : 0}
                    </Text>
                  </View>
                </TouchableOpacity>
                <FourBtnContainerView
                  bgColor={'#FAFAFA'}
                  imglink1={require('../assets/packageicon.png')}
                  isLargeImg={true}
                  title1={`${curentOrders?.length ? curentOrders?.length : 0}`}
                  title2={`${newOrders?.length ? newOrders?.length : 0}`}
                  title3={`${
                    completedOrders?.length ? completedOrders?.length : 0
                  }`}
                  title4={`${cancelOrders?.length ? cancelOrders?.length : 0}`}
                  subtitle1={
                    textStrings.currnetStatusTxt + ' ' + textStrings.orderTitle
                  }
                  subtitle2={
                    textStrings.newStatusTxt + ' ' + textStrings.orderTitle
                  }
                  subtitle3={
                    textStrings.completedStatusTxt +
                    ' ' +
                    textStrings.orderTitle
                  }
                  subtitle4={
                    textStrings.cancedOrderTxtHead +
                    ' ' +
                    textStrings.orderTitle
                  }
                  chartValue1={'(+30%)'}
                  chartValue2={'(+30%)'}
                  chartValue3={'(+30%)'}
                  chartValue4={'(-30%)'}
                  pointerValue={true}
                  titleColor={maincolor}
                />
                <View style={styles.chartContainerDiv}>
                  <BarChart
                    width={w('82%')}
                    height={h('28%')}
                    stackData={stackData}
                    barWidth={w('3%')}
                    barBorderRadius={h('1%')}
                    spacing={w('8.5%')}
                    initialSpacing={w('8.5%')}
                    backgroundColor={'transparent'}
                    xAxisLabelTextStyle={{
                      fontSize: h('1.8%'),
                      color: textcolor,
                    }}
                    yAxisTextStyle={{color: textcolor}}
                  />
                  <View style={styles.heroMainContainer}>
                    <View style={styles.heroConatiner}>
                      <View
                        style={{...styles.heroCirle, borderColor: maincolor}}
                      />
                      <Text style={TextStyles.myorderscreendattxt}>
                        {textStrings.completedOrderLabelTxt}
                      </Text>
                    </View>
                    <View style={styles.heroConatiner}>
                      <View
                        style={{
                          ...styles.heroCirle,
                          borderColor: graphSecondColor,
                        }}
                      />
                      <Text style={TextStyles.myorderscreendattxt}>
                        {textStrings.unCompletedOrderLabelTxt}
                      </Text>
                    </View>
                  </View>
                  {memebersArr?.length > 0 ? (
                    <Text
                      style={{
                        ...TextStyles.custombtntileNew,
                        width: w('90%'),
                        textAlign: 'left',
                        color: 'black',
                        alignSelf: 'center',
                      }}>
                      {textStrings.teamMembersTxtHead}
                    </Text>
                  ) : null}
                </View>
              </View>
            }
            renderItem={({item}) => (
              <View style={styles.listUserProfileContainer}>
                <View style={styles.MainInfoViewContainer}>
                  <Image
                    source={
                      item?.userImage !== ''
                        ? {uri: item?.userImage}
                        : require('../assets/USERIMG.png')
                    }
                    style={{
                      height: h('8%'),
                      width: h('8%'),
                      resizeMode: 'contain',
                      backgroundColor: maincolor,
                      borderRadius: h('10%'),
                    }}
                  />
                  <Text
                    style={{
                      ...TextStyles.myorderbtnTxtNew,
                      color: 'black',
                      flex: 1,
                      marginLeft: w('2.5%'),
                    }}>
                    {item?.phone}
                  </Text>
                </View>
                <View style={styles.btnContainerView}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`sms:${item?.phone}`)}
                    style={styles.subBtnShare}>
                    <Image
                      source={require('../assets/whatsappNew.png')}
                      style={{height: h('6%'), resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        Platform.OS === 'android'
                          ? `tel:${item?.phone}`
                          : Platform.OS === 'ios'
                          ? `telprompt:${item?.phone}`
                          : Alert.alert('Not available'),
                      )
                    }
                    style={styles.subBtnShare}>
                    <Image
                      source={require('../assets/mobileNew.png')}
                      style={{height: h('6%'), resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ItemSeparatorComponent={<View style={styles.itemSepratorDiv} />}
            ListFooterComponent={
              <View
                style={{
                  width: '90%',
                  height: h('15%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignSelf: 'center',
                  marginBottom: h('3%'),
                }}>
                <CustomBtn
                  title={textStrings.teamSiteBtnNow}
                  bgColor={'white'}
                  secColor={maincolor}
                  children={
                    <Image
                      source={require('../assets/teamlocate.png')}
                      style={{
                        width: '40%',
                        height: '90%',
                        alignSelf: 'center',
                        resizeMode: 'contain',
                      }}
                    />
                  }
                  clickfun={() =>
                    navigation.navigate('TrackingOrderScreen', {
                      latitude: teamLocationInfo.locationCoordinates.latitude,
                      longitude: teamLocationInfo.locationCoordinates.longitude,
                    })
                  }
                />
              </View>
            }
          />
        </View>
      </View>
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

export default TeamNameScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  monthContainerView: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: h('2%'),
  },
  otherContent: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  pointContainer: {
    width: w('90%'),
    height: h('12%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: w('2%'),
    backgroundColor: '#FAFAFA',
    borderRadius: h('1%'),
  },
  iconContainerView: {
    width: h('7%'),
    height: h('7%'),
    borderRadius: h('7%'),
    backgroundColor: 'rgba(159,32,59,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: w('2.5%'),
  },
  firstTxtCont: {
    width: 'auto',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  chartContainerDiv: {
    marginVertical: h('4%'),
  },
  heroMainContainer: {
    width: '90%',
    height: h('3%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: h('2%'),
    marginBottom: h('5%'),
    alignSelf: 'center',
  },
  heroCirle: {
    width: h('3%'),
    height: h('3%'),
    borderWidth: h('1%'),
    borderRadius: h('3%'),
    marginRight: w('2%'),
  },
  heroConatiner: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  listUserProfileContainer: {
    width: w('90%'),
    height: h('12%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  itemSepratorDiv: {
    width: '80%',
    alignSelf: 'flex-end',
    marginRight: w('1%'),
    height: 1,
    borderBottomColor: textcolor,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    marginTop: h('0.5%'),
    marginBottom: h('2%'),
  },
  MainInfoViewContainer: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnContainerView: {
    height: '100%',
    width: w('30%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subBtnShare: {
    width: '45%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
