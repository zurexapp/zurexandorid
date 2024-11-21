import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from '../Text/TextStrings';
import {w, h} from 'react-native-responsiveness';
import {LineChart} from 'react-native-gifted-charts';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import FourBtnContainerView from '../Components/FourBtnContainerView';
import CustomDropDownBtn from '../Components/CustomDropDownBtn';
import {useSelector} from 'react-redux';
import {textcolor} from '../assets/Colors';
const RevenueStatScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const {myOrdersData} = useSelector(state => state.project);
  const [monthValue, setmonthValue] = useState(new Date().getMonth());

  const CompleteOrderfilteredDataWithMonth = curentDay => {
    let revenue = 0;
    const result = myOrdersData?.filter(
      dat =>
        new Date(dat?.updatedAt).getMonth() === monthValue &&
        new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
        new Date(dat?.updatedAt).getDay() === curentDay &&
        dat?.orderStatus === 'completed',
    );
    result?.map(dat => {
      revenue = revenue + dat?.orderPrice;
    });
    return revenue;
  };
  const thisYearRevenue = () => {
    let revenue = 0;
    const result = myOrdersData?.filter(
      dat =>
        new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
        dat?.orderStatus === 'completed',
    );
    result?.map(dat => {
      revenue = revenue + dat?.orderPrice;
    });
    return revenue;
  };
  const thisMonthRevenue = () => {
    let revenue = 0;
    const result = myOrdersData?.filter(
      dat =>
        new Date(dat?.updatedAt).getMonth() === new Date().getMonth() &&
        new Date(dat?.updatedAt).getFullYear() === new Date().getFullYear() &&
        dat?.orderStatus === 'completed',
    );
    result?.map(dat => {
      revenue = revenue + dat?.orderPrice;
    });
    return revenue;
  };
  const thisWeekRevenue = () => {
    const nowDay = new Date();
    const lastWeek = new Date(nowDay.getTime() - 7 * 24 * 60 * 60 * 1000);
    let revenue = 0;
    const result = myOrdersData?.filter(
      dat =>
        Date.parse(new Date(dat?.updatedAt).toDateString()) <=
          Date.parse(nowDay.toDateString()) &&
        Date.parse(new Date(dat?.updatedAt).toDateString()) >=
          Date.parse(lastWeek.toDateString()) &&
        dat?.orderStatus === 'completed',
    );
    result?.map(dat => {
      revenue = revenue + dat?.orderPrice;
    });
    return revenue;
  };
  const todayRevenue = () => {
    let revenue = 0;
    const result = myOrdersData?.filter(
      dat =>
        Date.parse(new Date(dat?.updatedAt).toDateString()) ===
          Date.parse(new Date().toDateString()) &&
        dat?.orderStatus === 'completed',
    );
    result?.map(dat => {
      revenue = revenue + dat?.orderPrice;
    });
    return revenue;
  };

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
        name={textStrings.revenueBtnTxtHed}
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
        <FourBtnContainerView
          imglink1={require('../assets/chartupicon.png')}
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

export default RevenueStatScreen;

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
