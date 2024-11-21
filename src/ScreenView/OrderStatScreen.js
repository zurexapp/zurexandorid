import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from '../Text/TextStrings';
import {w, h} from 'react-native-responsiveness';
import {BarChart} from 'react-native-gifted-charts';
import {graphSecondColor, maincolor, textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import FourBtnContainerView from '../Components/FourBtnContainerView';
import CustomDropDownBtn from '../Components/CustomDropDownBtn';
import {useSelector} from 'react-redux';
const OrderStatScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const {myOrdersData} = useSelector(state => state.project);
  const [monthValue, setmonthValue] = useState(new Date().getMonth());

  const thisYearRevenue = () => {
    const result = myOrdersData?.filter(
      dat =>
        new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
        dat?.orderStatus === 'completed',
    );

    return result?.length;
  };
  const thisMonthRevenue = () => {
    const result = myOrdersData?.filter(
      dat =>
        new Date(dat?.updatedAt).getMonth() === new Date().getMonth() &&
        new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
        dat?.orderStatus === 'completed',
    );

    return result?.length;
  };
  const thisWeekRevenue = () => {
    const nowDay = new Date();
    const lastWeek = new Date(nowDay.getTime() - 7 * 24 * 60 * 60 * 1000);
    const result = myOrdersData?.filter(
      dat =>
        Date.parse(new Date(dat?.updatedAt).toDateString()) <=
          Date.parse(nowDay.toDateString()) &&
        Date.parse(new Date(dat?.updatedAt).toDateString()) >=
          Date.parse(lastWeek.toDateString()) &&
        dat?.orderStatus === 'completed',
    );

    return result?.length;
  };
  const todayRevenue = () => {
    let revenue = 0;
    const result = myOrdersData?.filter(
      dat =>
        Date.parse(new Date(dat?.updatedAt).toDateString()) ===
          Date.parse(new Date().toDateString()) &&
        dat?.orderStatus === 'completed',
    );

    return result?.length;
  };

  const CompleteOrderfilteredDataWithMonth = curentDay => {
    const result = myOrdersData?.filter(
      dat =>
        new Date(dat?.updatedAt).getMonth() === monthValue &&
        new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
        new Date(dat?.updatedAt).getDay() === curentDay &&
        dat?.orderStatus === 'completed',
    );

    return result?.length;
  };
  const UnCompletefilteredDataWithMonth = curentDay => {
    const result = myOrdersData?.filter(
      dat =>
        new Date(dat?.updatedAt).getMonth() === monthValue &&
        new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
        new Date(dat?.updatedAt).getDay() === curentDay &&
        dat?.orderStatus === 'canceled',
    );
    return result?.length;
  };
  const stackData = [
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(0), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(0),
          color: graphSecondColor,
        },
      ],
      label: 'Sun',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(1), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(1),
          color: graphSecondColor,
        },
      ],
      label: 'Mon',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(2), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(2),
          color: graphSecondColor,
        },
      ],
      label: 'Tue',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(3), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(3),
          color: graphSecondColor,
        },
      ],
      label: 'Wed',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(4), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(4),
          color: graphSecondColor,
        },
      ],
      label: 'Thu',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(5), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(5),
          color: graphSecondColor,
        },
      ],
      label: 'Fri',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(6), color: maincolor},
        {
          value: UnCompletefilteredDataWithMonth(6),
          color: graphSecondColor,
        },
      ],
      label: 'Sat',
    },
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.orderTitle}
        iconName1={'left'}
        firstbtnFun={() => navigation.goBack()}
      />
      <View style={styles.otherContent}>
        <View style={styles.monthContainerView}>
          <View style={{width: '47%'}}>
            <CustomDropDownBtn
              title={textStrings.monthPlaceTxt}
              value={monthValue}
              onCangeValue={text => setmonthValue(text)}
              listData={[
                {title: 'January', value: 0, id: 0},
                {title: 'Feburary', value: 1, id: 1},
                {title: 'March', value: 2, id: 2},
                {title: 'April', value: 3, id: 3},
                {title: 'May', value: 4, id: 4},
                {title: 'June', value: 5, id: 5},
                {title: 'July', value: 6, id: 6},
                {title: 'August', value: 7, id: 7},
                {title: 'September', value: 8, id: 8},
                {title: 'Octuber', value: 9, id: 9},
                {title: 'November', value: 10, id: 10},
                {title: 'December', value: 11, id: 11},
              ]}
              isDropDown={true}
              isSmallDesign={true}
            />
          </View>
        </View>
        <View style={styles.chartContainerDiv}>
          <BarChart
            width={w('82%')}
            height={h('28%')}
            stackData={stackData}
            barWidth={w('3%')}
            barBorderRadius={h('1%')}
            // rotateLabel={true}
            spacing={w('8.5%')}
            initialSpacing={w('8.5%')}
            backgroundColor={'transparent'}
            xAxisLabelTextStyle={{
              fontSize: h('1.59%'),
              color: textcolor,
            }}
            yAxisTextStyle={{color: textcolor}}
          />
        </View>
        <FourBtnContainerView
          imglink1={require('../assets/simplePackageicon.png')}
          title1={`${thisYearRevenue()}`}
          title2={`${thisMonthRevenue()}`}
          title3={`${thisWeekRevenue()}`}
          title4={`${todayRevenue()}`}
          subtitle1={textStrings.yearBtnTxt}
          subtitle2={textStrings.monthBtnTxt}
          subtitle3={textStrings.weekBtnTxt}
          subtitle4={textStrings.todayBtnTxt}
          chartValue1={'3%'}
          chartValue2={'3%'}
          chartValue3={'3%'}
          chartValue4={'3%'}
        />
      </View>
    </View>
  );
};

export default OrderStatScreen;

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
  chartContainerDiv: {
    width: '90%',
    height: h('35%'),
    marginBottom: h('2%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    paddingHorizontal: w('4%'),
  },
  monthContainerView: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: h('2%'),
  },
});
