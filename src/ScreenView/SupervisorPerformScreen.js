import {
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {useTranslation} from '../Text/TextStrings';
import CustomDropDownBtn from '../Components/CustomDropDownBtn';
import {w, h} from 'react-native-responsiveness';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import {MainBtnComp} from '../Components/FourBtnContainerView';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {maincolor, graphSecondColor, textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import CustomBtn from '../Components/CustomBtn';
import {useDispatch, useSelector} from 'react-redux';

const SupervisorPerformScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const {teamId} = route?.params;
  const {myOrdersData, allSupervisorsData, allTeamsData} = useSelector(
    state => state.project,
  );
  const [filteredOrders, setfilteredOrders] = useState([]);
  const [fromDateValue, setfromDateValue] = useState(
    new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  );
  const [toDateValue, settoDateValue] = useState(new Date());
  const [totalRevenue, settotalRevenue] = useState(0);
  const [totalOrders, settotalOrders] = useState(0);

  useEffect(() => {
    const getTotalRevOrder = () => {
      const filterd = myOrdersData?.filter(
        dat =>
          Date.parse(new Date(dat?.updatedAt).toDateString()) >=
            Date.parse(fromDateValue) &&
          Date.parse(new Date(dat?.updatedAt).toDateString()) <=
            Date.parse(toDateValue) &&
          dat?.TeamId === teamId,
      );
      setfilteredOrders(filterd);
      settotalOrders(filterd?.length);
      let totalRevenueT = 0;
      filterd?.map(dat => {
        if (dat?.orderStatus === 'completed') {
          totalRevenueT = totalRevenueT + dat?.orderPrice;
        } else {
          totalRevenueT = totalRevenueT + 0;
        }
      });
      settotalRevenue(totalRevenueT);
    };
    getTotalRevOrder();
  }, [fromDateValue, toDateValue, myOrdersData, teamId]);

  const dispatch = useDispatch();
  const wholeRenue = () => {
    let revenue = 0;
    myOrdersData.map(dat => {
      revenue = revenue + dat?.orderPrice;
    });
    return revenue;
  };
  const wholeOrders = () => {
    const result = myOrdersData;
    return result?.length;
  };
  const CompleteOrderfilteredDataWithMonth = curentDay => {
    let revenue = 0;
    const result = filteredOrders?.filter(
      dat =>
        new Date(dat?.updatedAt).getDay() === curentDay &&
        dat?.orderStatus === 'completed',
    );
    result?.map(dat => {
      revenue = revenue + dat?.orderPrice;
    });
    return revenue;
  };

  const CompleteOrderfilteredDataWithMonth2 = curentDay => {
    const result = filteredOrders?.filter(
      dat =>
        new Date(dat?.updatedAt).getDay() === curentDay &&
        dat?.orderStatus === 'completed',
    );

    return result?.length;
  };
  const UnCompletefilteredDataWithMonth = curentDay => {
    const result = filteredOrders?.filter(
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

  const data = [
    {value: 0},
    {value: CompleteOrderfilteredDataWithMonth(0), label: 'Sun'},
    {value: CompleteOrderfilteredDataWithMonth(1), label: 'Mon'},
    {value: CompleteOrderfilteredDataWithMonth(2), label: 'Tue'},
    {value: CompleteOrderfilteredDataWithMonth(3), label: 'Wed'},
    {value: CompleteOrderfilteredDataWithMonth(4), label: 'Thu'},
    {value: CompleteOrderfilteredDataWithMonth(5), label: 'Fri'},
    {value: CompleteOrderfilteredDataWithMonth(6), label: 'Sat'},
  ];

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.superPerfomTxt}
        iconName1={'left'}
        firstbtnFun={() => navigation.goBack()}
      />
      <View style={styles.otherContent}>
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
          data={[]}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={{width: w('100%')}}>
              <View
                style={{
                  ...styles.otherContent,
                }}>
                <View style={styles.btnRedConatinersView}>
                  <MainBtnComp
                    imglink={require('../assets/chartupicon.png')}
                    chartValue={'3%'}
                    subtitle={textStrings.orderRevBtnTxt}
                    title={`${totalRevenue}`}
                  />
                  <MainBtnComp
                    imglink={require('../assets/simplePackageicon.png')}
                    chartValue={'3%'}
                    subtitle={textStrings.numOrdersBtnTxt}
                    title={`${totalOrders}`}
                  />
                </View>
                <View
                  style={{
                    ...styles.btnRedConatinersView,
                    justifyContent: 'center',
                    marginVertical: h('2%'),
                  }}>
                  <MainBtnComp
                    width={'55%'}
                    imglink={require('../assets/starIcon.png')}
                    subtitle={textStrings.supervisorEvolutionTxt}
                    title={`${allSupervisorsData[0]?.value}`}
                  />
                </View>
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
                  <Text
                    style={{
                      ...TextStyles.curvedHeaderscreenname,
                      width: '106%',
                      textAlign: 'left',
                      color: 'black',
                      marginBottom: h('3%'),
                    }}>
                    {textStrings.orderRevBtnTxt}
                  </Text>
                  <LineChart
                    width={w('82%')}
                    height={h('28%')}
                    areaChart
                    spacing={w('25%')}
                    initialSpacing={0}
                    data={data}
                    curved={true}
                    startFillColor="#9F2734"
                    color1="#9F2734"
                    hideDataPoints
                    endFillColor="white"
                    startOpacity={0.8}
                    endOpacity={0.3}
                    endSpacing={w('25%')}
                    xAxisLabelTextStyle={{
                      color: textcolor,
                      fontSize: h('1.8%'),
                    }}
                    yAxisTextStyle={{color: textcolor}}
                  />
                </View>
              </View>
            </View>
          }
          ItemSeparatorComponent={<View style={styles.itemSepratorDiv} />}
          ListFooterComponent={
            <View
              style={{
                width: '90%',
                height: h('8%'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                alignSelf: 'center',
              }}
            />
          }
        />
      </View>
    </View>
  );
};

export default SupervisorPerformScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
  btnRedConatinersView: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: h('15%'),
  },
  chartContainerDiv: {
    width: '90%',
    height: h('83%'),
    // marginBottom: h('2%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    overflow: 'hidden',
    paddingHorizontal: w('4%'),
    marginBottom: h('4%'),
  },
  heroMainContainer: {
    width: '100%',
    height: h('3%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: h('2%'),
    marginBottom: h('5%'),
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
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnContainerView: {
    height: '100%',
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
