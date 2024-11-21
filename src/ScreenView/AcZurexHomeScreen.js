import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from '../Text/TextStrings';
import {maincolor, ratingColor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {MainBtnComp} from '../Components/FourBtnContainerView';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import TextStyles from '../Text/TextStyles';
import AcHomeBtn from '../Components/AcHomeBtn';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {getDataWholeCollection} from '../DataBase/databaseFunction';
import {setAllSupervisorsData, setAllTeamsData} from '../store/projectSlice';
import LoadingModal from '../Components/LoadingModal';
import {w, h} from 'react-native-responsiveness';
const AcZurexHomeScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const dispatch = useDispatch();
  const [AllTeamsDataState, setAllTeamsDataState] = useState([]);
  const [AllSuperviosrs, setAllSuperviosrs] = useState([]);
  const [fromDateValue, setfromDateValue] = useState(
    new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  );
  const [toDateValue, settoDateValue] = useState(new Date());
  const [isLoading, setisLoading] = useState(false);
  const [wholeDataYouWant, setWholeDataYouWant] = useState({
    oilPercent: 0,
    tyrePercent: 0,
    batteryPercent: 0,
    filterPercent: 0,
    oil: 0,
    tyre: 0,
    battery: 0,
    filter: 0,
  });
  const {myOrdersData, cityArr, neighborArr, employsData} = useSelector(
    state => state.project,
  );
  const [totalRevenue, settotalRevenue] = useState(0);
  const [totalOrders, settotalOrders] = useState(0);
  const [orderByCity, setorderByCity] = useState([]);
  const [neighborCityOrder, setneighborCityOrder] = useState([]);

  const calculateAvrageRating = async () => {
    const teamReslt = employsData?.filter(
      dat => dat?.role === 'SingleDTeam' || dat?.role === 'SingleTeam',
    );
    const formatedTeamResult = teamReslt?.map(dac => {
      let sumRating = 0;
      let count = 0;
      let sum = 0;
      const filteredData = myOrdersData?.filter(
        dat =>
          dat?.orderStatus === 'completed' &&
          dat?.serviceProviderRating >= 0 &&
          dat?.TeamId === dac?.id,
      );
      filteredData.map((datr, index) => {
        let rati = datr?.serviceProviderRating
          ? datr?.serviceProviderRating
          : 0;
        count += rati;
        sum += rati * (index + 1);
        sumRating = sumRating + rati;
      });
      let check = parseInt(sum) / parseInt(filteredData?.length);
      return {
        ...dac,
        title: dac?.id,
        value: sum > 0 && filteredData?.length > 0 ? check : 0,
      };
    });
    const sortedDtat = formatedTeamResult?.sort((a, b) => b.value - a.value);
    setAllTeamsDataState(sortedDtat);
    console.log('setAllTeamsDataState');
    dispatch(setAllTeamsData({allTeamsData: sortedDtat}));
  };
  const calculteAvrgSupervisor = async () => {
    const SupervisorReslt = await getDataWholeCollection('employ');
    const filterSuper = SupervisorReslt?.filter(
      dat => dat.role === 'supervisor',
    );
    const formatedSuperVisorResult = filterSuper?.map(dac => {
      let sumRating = 0;
      let count = 0;
      let sum = 0;
      const filteredData = myOrdersData?.filter(
        dat =>
          dat?.orderStatus === 'completed' &&
          dat?.serviceProviderRating >= 0 &&
          dat?.TeamId === dac?.teamId,
      );
      filteredData.map((datr, index) => {
        let rati = datr?.serviceProviderRating
          ? datr?.serviceProviderRating
          : 0;
        count += rati;
        sum += rati * (index + 1);
        sumRating = sumRating + rati;
      });
      let check = parseInt(sum) / parseInt(filteredData?.length);
      return {
        ...dac,
        title: dac?.jobId ? dac?.jobId : dac?.id,
        value: sum > 0 && filteredData?.length > 0 ? check : 0,
        teamId: dac?.teamId,
      };
    });
    const sortedDtat = formatedSuperVisorResult?.sort(
      (a, b) => b.value - a.value,
    );
    setAllSuperviosrs(sortedDtat);
    console.log('setAllSuperviosrs');

    dispatch(setAllSupervisorsData({allSupervisorsData: sortedDtat}));
  };
  const getAllData = async () => {
    setisLoading(true);
    calculateAvrageRating();
    calculteAvrgSupervisor();
    setisLoading(false);
  };

  const findAllPercentData = () => {
    let tempProducts = [];
    myOrdersData?.map(dat => {
      tempProducts.push(
        dat?.products?.map(dal => {
          return {...dal, updatedAt: dat?.updatedAt};
        }),
      );
    });
    const wholeProducts = tempProducts.filter(item => item !== undefined);

    const filtersProducts = wholeProducts?.filter(
      dat =>
        dat?.referance === 'Filters' &&
        dat?.updatedAt >= Date.parse(fromDateValue) &&
        dat?.updatedAt <= Date.parse(toDateValue),
    );
    const batteryProducts = wholeProducts?.filter(
      dat =>
        dat?.referance === 'btteries' &&
        dat?.updatedAt >= Date.parse(fromDateValue) &&
        dat?.updatedAt <= Date.parse(toDateValue),
    );
    const tyreProducts = wholeProducts?.filter(
      dat =>
        dat?.referance === 'Tyres' &&
        dat?.updatedAt >= Date.parse(fromDateValue) &&
        dat?.updatedAt <= Date.parse(toDateValue),
    );
    const oilProducts = wholeProducts?.filter(
      dat =>
        dat?.referance === 'Oils' &&
        dat?.updatedAt >= Date.parse(fromDateValue) &&
        dat?.updatedAt <= Date.parse(toDateValue),
    );
    setWholeDataYouWant({
      oilPercent: findPercent(oilProducts?.length, wholeProducts?.length),
      tyrePercent: findPercent(tyreProducts?.length, wholeProducts?.length),
      batteryPercent: findPercent(
        batteryProducts?.length,
        wholeProducts?.length,
      ),
      filterPercent: findPercent(
        filtersProducts?.length,
        wholeProducts?.length,
      ),
      oil: oilProducts?.length,
      tyre: tyreProducts?.length,
      battery: batteryProducts?.length,
      filter: filtersProducts?.length,
    });
  };

  const findPercent = (amount, total) => {
    return (amount / total) * 100;
  };

  useEffect(() => {
    if (AllTeamsDataState?.length <= 0 && AllSuperviosrs?.length <= 0) {
      getAllData();
      findAllPercentData();
    }
  });

  useEffect(() => {
    const calculateOrdersWithNegborCity = async () => {
      const formatedData = [];
      neighborArr?.map(dat => {
        const filteredByCity = myOrdersData?.filter(
          dat =>
            dat?.orderStatus === 'completed' &&
            `${dat?.deliveryInfo.cityName}`.toLowerCase() ===
              `${dat?.productNameEng}`.toLowerCase &&
            dat?.updatedAt >= Date.parse(fromDateValue) &&
            dat?.updatedAt <= Date.parse(toDateValue),
        );
        formatedData.push({
          title: dat?.productNameEng,
          value: filteredByCity?.length,
          products: filteredByCity,
        });
      });
      setneighborCityOrder(formatedData);
    };
    const calculateOrdersWithCity = async () => {
      const formatedData = [];
      cityArr?.map(dat => {
        const filteredByCity = myOrdersData?.filter(
          dat =>
            dat?.orderStatus === 'completed' &&
            `${dat?.deliveryInfo.cityName}`.toLowerCase() ===
              `${dat?.productNameEng}`.toLowerCase &&
            dat?.updatedAt >= Date.parse(fromDateValue) &&
            dat?.updatedAt <= Date.parse(toDateValue),
        );
        formatedData.push({
          title: dat?.productNameEng,
          value: filteredByCity?.length,
          products: filteredByCity,
        });
      });
      setorderByCity(formatedData);
    };
    const getTotalRevOrder = () => {
      let totalRevenueT = 0;
      myOrdersData?.map(dat => {
        if (
          dat?.orderStatus === 'completed' &&
          dat?.updatedAt >= Date.parse(fromDateValue) &&
          dat?.updatedAt <= Date.parse(toDateValue)
        ) {
          totalRevenueT = totalRevenueT + dat?.orderPrice;
        } else {
          totalRevenueT = totalRevenueT + 0;
        }
      });
      settotalRevenue(totalRevenueT);

      const filterd = myOrdersData?.filter(
        dat =>
          dat?.updatedAt >= Date.parse(fromDateValue) &&
          dat?.updatedAt <= Date.parse(toDateValue),
      );
      settotalOrders(filterd?.length);
    };
    const findAllPercentData = () => {
      let tempProducts = [];
      myOrdersData?.map(dat => {
        tempProducts.push(
          dat?.products?.map(dal => {
            return {...dal, updatedAt: dat?.updatedAt};
          }),
        );
      });
      const wholeProducts = tempProducts.filter(item => item !== undefined);

      const filtersProducts = wholeProducts?.filter(
        dat =>
          dat?.referance === 'Filters' &&
          dat?.updatedAt >= Date.parse(fromDateValue) &&
          dat?.updatedAt <= Date.parse(toDateValue),
      );
      const batteryProducts = wholeProducts?.filter(
        dat =>
          dat?.referance === 'btteries' &&
          dat?.updatedAt >= Date.parse(fromDateValue) &&
          dat?.updatedAt <= Date.parse(toDateValue),
      );
      const tyreProducts = wholeProducts?.filter(
        dat =>
          dat?.referance === 'Tyres' &&
          dat?.updatedAt >= Date.parse(fromDateValue) &&
          dat?.updatedAt <= Date.parse(toDateValue),
      );
      const oilProducts = wholeProducts?.filter(
        dat =>
          dat?.referance === 'Oils' &&
          dat?.updatedAt >= Date.parse(fromDateValue) &&
          dat?.updatedAt <= Date.parse(toDateValue),
      );
      setWholeDataYouWant({
        oilPercent: findPercent(oilProducts?.length, wholeProducts?.length),
        tyrePercent: findPercent(tyreProducts?.length, wholeProducts?.length),
        batteryPercent: findPercent(
          batteryProducts?.length,
          wholeProducts?.length,
        ),
        filterPercent: findPercent(
          filtersProducts?.length,
          wholeProducts?.length,
        ),
        oil: oilProducts?.length,
        tyre: tyreProducts?.length,
        battery: batteryProducts?.length,
        filter: filtersProducts?.length,
      });
    };
    calculateOrdersWithNegborCity();
    calculateOrdersWithCity();
    getTotalRevOrder();
    findAllPercentData();
  }, [fromDateValue, toDateValue, cityArr, myOrdersData, neighborArr]);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={' '}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
      />
      <Image
        source={require('../assets/logo.png')}
        style={styles.screenHomeLogo}
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
        <View style={styles.dateAndTimeView}>
          <Text style={TextStyles.confirmcardatatitletxtcard}>
            {days[new Date().getDay()]}
          </Text>
          <Text style={TextStyles.verifCodeScreentxt}>
            {new Date().toLocaleDateString('en-GB')}
          </Text>
        </View>
        <ScrollView contentContainerStyle={{width: w('100%')}}>
          <View
            style={{
              ...styles.otherContent,
            }}>
            <View style={styles.btnRedConatinersView}>
              <MainBtnComp
                imglink={require('../assets/chartupicon.png')}
                chartValue={'3%'}
                subtitle={textStrings.revenueTxt}
                title={`${totalRevenue}`}
                clickfun={() => navigation.navigate('RevenueStatScreen')}
              />
              <MainBtnComp
                imglink={require('../assets/simplePackageicon.png')}
                chartValue={'3%'}
                subtitle={textStrings.numOrdersBtnTxt}
                title={`${totalOrders}`}
                clickfun={() => navigation.navigate('OrderStatScreen')}
              />
            </View>
            <View style={styles.mainButtonContainerVCiew}>
              <AcHomeBtn
                imglink={require('../assets/starIcon.png')}
                title={textStrings.highRatedTeam}
                secTxtColor={ratingColor}
                listArr={AllTeamsDataState}
                isSmallWidth={true}
                ClickFun={() => navigation.navigate('RattinTeamScreen')}
              />
              <AcHomeBtn
                imglink={require('../assets/starIcon.png')}
                title={textStrings.highRatedSupervisor}
                secTxtColor={ratingColor}
                listArr={AllSuperviosrs}
                isSmallWidth={true}
                ClickFun={() => navigation.navigate('RattinSupervisorScreen')}
              />
            </View>
            <AcHomeBtn
              imglink={require('../assets/settingiconNew.png')}
              title={textStrings.mostREqServTxt}
              secTxtColor={maincolor}
              listArr={[
                {
                  title: textStrings.freeServiceTitle1,
                  value: `${wholeDataYouWant.oil}`,
                },
                {
                  title: textStrings.freeServiceTitle3,
                  value: `${wholeDataYouWant.filter}`,
                },
                {
                  title: textStrings.freeServiceTitle5,
                  value: `${wholeDataYouWant.battery}`,
                },
              ]}
              ClickFun={() => navigation.navigate('ServicesScreen')}
            />
            <View style={styles.mainButtonContainerVCiew}>
              <AcHomeBtn
                imglink={require('../assets/starIcon.png')}
                title={textStrings.orderTitle + ' ' + textStrings.byCityBtnTxt}
                secTxtColor={maincolor}
                listArr={orderByCity}
                isSmallWidth={true}
                ClickFun={() => navigation.navigate('ByCityScreen')}
              />
              <AcHomeBtn
                imglink={require('../assets/starIcon.png')}
                title={
                  textStrings.orderTitle +
                  ' ' +
                  textStrings.byNeighborHoodBtnTxt
                }
                secTxtColor={maincolor}
                listArr={neighborCityOrder}
                isSmallWidth={true}
                ClickFun={() => navigation.navigate('ByNeighborHod')}
              />
            </View>
            <View style={{height: h('5%')}} />
          </View>
        </ScrollView>
      </View>
      <LoadingModal visibleModal={isLoading} />
    </View>
  );
};

export default AcZurexHomeScreen;

const styles = StyleSheet.create({
  screenHomeLogo: {
    height: scale(54),
    width: w('50%'),
    resizeMode: 'contain',
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
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
  btnRedConatinersView: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: h('15%'),
  },
  mainButtonContainerVCiew: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: h('1.2%'),
  },
  dateAndTimeView: {
    width: '90%',
    height: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: h('2%'),
    paddingHorizontal: w('2%'),
  },
});
