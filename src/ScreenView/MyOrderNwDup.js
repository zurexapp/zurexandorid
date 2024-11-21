import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import {borderColor, c0color, maincolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import Entypo from 'react-native-vector-icons/Entypo';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import AppBtn from '../Components/AppBtn';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import SupervisorOrderBtn from '../Components/SupervisorOrderBtn';
// import {setAllTeamsData} from '../store/projectSlice';
// import {getDataWholeCollection} from '../DataBase/databaseFunction';
import LoadingModal from '../Components/LoadingModal';
const MyOrderNwDup = ({navigation}) => {
  const {textStrings} = useTranslation();

  const {
    myOrdersData,
    // allSupervisorsData,
    // allTeamsData,
    // cityArr,
    // neighborArr,
    employsData,
  } = useSelector(state => state.project);
  // const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [btnSelectedValue, setbtnSelectedValue] = useState('new');
  const [openFilterModal, setopenFilterModal] = useState(false);
  const [selectItemFilter, setselectItemFilter] = useState('');
  const [searchOrderId, setsearchOrderId] = useState('');
  const [fromDateValue, setfromDateValue] = useState(
    new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  );
  const [teamsDataFiltered, setteamsDataFiltered] = useState([]);
  const [toDateValue, settoDateValue] = useState(new Date());
  const [isFilteredModalApp, setIsFilteredModalApp] = useState(false);
  const closeModal = () => {
    setopenFilterModal(!openFilterModal);
  };
  const switchFilterModalApp = () => {
    setIsFilteredModalApp(!isFilteredModalApp);
  };

  console.log(employsData);

  const btnArray = [
    {
      id: 0,
      title: textStrings.newStatusTxt,
      value: 'new',
      onClickFun: () => setbtnSelectedValue('new'),
    },
    {
      id: 1,
      title: textStrings.currnetStatusTxt,
      value: 'current',
      onClickFun: () => setbtnSelectedValue('current'),
    },
    {
      id: 2,
      title: textStrings.completedStatusTxt,
      value: 'completed',
      onClickFun: () => setbtnSelectedValue('completed'),
    },
    // {
    //   id: 3,
    //   title: textStrings.deferredStatusTxt,
    //   value: 'deferred',
    //   onClickFun: () => setbtnSelectedValue('deferred'),
    // },
    {
      id: 4,
      title: textStrings.cancelStatusTxt,
      value: 'cancel',
      onClickFun: () => setbtnSelectedValue('cancel'),
    },
  ];

  useEffect(() => {
    const getAllDataTeams = async () => {
      setisLoading(true);
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
            dat?.serviceProviderRating !== 0 &&
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
        let check = sum / count;
        return {...dac, title: dac?.id, value: `(${check})`};
      });
      setteamsDataFiltered(formatedTeamResult);
      setisLoading(false);
    };
    if (teamsDataFiltered?.length <= 0) {
      getAllDataTeams();
    }
  }, [employsData, myOrdersData, teamsDataFiltered?.length]);
  const filteredUserOrders =
    searchOrderId && fromDateValue === toDateValue
      ? myOrdersData?.filter(dat =>
          `${dat?.id}`.toLowerCase().includes(`${searchOrderId}`.toLowerCase()),
        )
      : searchOrderId || selectItemFilter || fromDateValue !== toDateValue
      ? myOrdersData?.filter(
          dat =>
            `${dat?.id}`
              .toLowerCase()
              .includes(`${searchOrderId}`.toLowerCase()) &&
            Date.parse(new Date(dat?.createdAt).toDateString()) >=
              Date.parse(new Date(fromDateValue).toDateString()) &&
            Date.parse(new Date(dat?.createdAt).toDateString()) <=
              Date.parse(new Date(toDateValue).toDateString()),
        )
      : myOrdersData;

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.orderTitle}
          iconName1={'left'}
          firstbtnFun={() => navigation.goBack()}
        />
        <View style={styles.otherContent}>
          <View style={styles.topBtncontainers}>
            <View style={styles.iconConatinerStyle}>
              <Entypo
                name="magnifying-glass"
                size={h('4%')}
                color={borderColor}
              />
            </View>
            <TextInput
              placeholder={textStrings.orderIdTitle}
              style={styles.textinputStyle}
              value={searchOrderId}
              onChangeText={text => setsearchOrderId(text)}
            />
            <TouchableOpacity
              onPress={closeModal}
              style={styles.btnContainerStyle}>
              <Entypo name="sound-mix" size={h('4%')} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={{...styles.otherContent, marginTop: h('1.5%')}}>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: h('6%'),
                marginBottom: h('1.5%'),
              }}>
              <FlatList
                data={btnArray}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={item.onClickFun}
                    style={{
                      ...styles.smallBtnDiv,
                      backgroundColor:
                        btnSelectedValue === item?.value
                          ? maincolor
                          : borderColor,
                    }}>
                    <Text
                      style={{
                        ...TextStyles.choiceinputbtntxt,
                        color:
                          btnSelectedValue === item?.value
                            ? 'white'
                            : maincolor,
                      }}>
                      {item?.title}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <FlatList
              keyExtractor={item => item.id}
              data={
                btnSelectedValue === 'current'
                  ? filteredUserOrders
                      ?.filter(
                        dat =>
                          dat.orderStatus === 'approved' ||
                          dat.orderStatus === 'assigned',
                      )
                      ?.sort((a, b) => b?.createdAt - a?.createdAt)
                  : btnSelectedValue === 'new'
                  ? filteredUserOrders
                      ?.filter(dat => dat.orderStatus === 'pending')
                      ?.sort((a, b) => b?.createdAt - a?.createdAt)
                  : btnSelectedValue === 'completed'
                  ? filteredUserOrders
                      ?.filter(dat => dat.orderStatus === 'completed')
                      ?.sort((a, b) => b?.createdAt - a?.createdAt)
                  : btnSelectedValue === 'cancel'
                  ? filteredUserOrders
                      ?.filter(dat => dat.orderStatus === 'canceled')
                      ?.sort((a, b) => b?.createdAt - a?.createdAt)
                  : []
              }
              ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
              ListFooterComponent={
                <View
                  style={{
                    width: '95%',
                    height: h('5%'),
                    alignSelf: 'center',
                    marginTop: h('1%'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              }
              renderItem={({item}) => (
                <SupervisorOrderBtn
                  orderId={item?.id}
                  dateProcess={item?.createdAt}
                  location={item?.deliveryInfo?.cityName}
                  onClickFun={() =>
                    navigation.navigate('orderDetailScreen0', {
                      orderId: item?.id,
                    })
                  }
                  orderStatus={item?.orderStatus}
                  price={item?.totalPrice}
                  products={item?.products}
                />
              )}
            />
          </View>
        </View>
      </View>
      <Modal visible={openFilterModal} onRequestClose={closeModal}>
        <View style={styles.fillscreenbg}>
          <CurvedHeaderComp
            name={textStrings.filterTitleTxt}
            iconName1={'left'}
            firstbtnFun={() => {
              closeModal();
              if (isFilteredModalApp) {
                switchFilterModalApp();
              }
              setfromDateValue(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000));
              settoDateValue(new Date());
              setselectItemFilter('');
            }}
          />
          <View style={{...styles.otherContent, marginTop: h('2%')}}>
            <Text
              style={{
                ...TextStyles.choiceinputinputxthead,
                textAlign: 'left',
                width: '90%',
                alignSelf: 'center',
                marginBottom: h('1%'),
              }}>
              {textStrings.selectDateHeadinTxt}
            </Text>
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
            <View
              style={{
                ...styles.otherContent,
                marginVertical: h('2%'),
              }}></View>
            <View style={styles.btnConterLower}>
              <AppBtn
                title={textStrings.applyBtnTxt}
                clickfun={() => {
                  closeModal();
                  switchFilterModalApp();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

export default MyOrderNwDup;

const styles = StyleSheet.create({
  listMainTxt: {
    ...TextStyles.Myorderbtntxt,
    lineHeight: h('7.5%'),
    flex: 1,
    fontSize: scale(14),
  },
  listBtnCircle: {
    height: h('4%'),
    width: h('4%'),
    borderRadius: h('10%'),
    overflow: 'hidden',
  },
  listFilterBtn: {
    width: w('90%'),
    height: h('7.5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: w('3%'),
    backgroundColor: '#FBFBFB',
    borderWidth: 0.7,
    borderColor: borderColor,
  },
  smallBtnDiv: {
    height: '100%',
    borderRadius: h('3%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: w('20%'),
    paddingHorizontal: w('4%'),
    marginRight: w('2%'),
  },
  topBtnContainersScrolled: {
    height: h('6%'),
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  btnContainerStyle: {
    width: '14%',
    height: '90%',
    backgroundColor: maincolor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: w('1%'),
  },
  iconConatinerStyle: {
    width: '11%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: w('1%'),
  },
  textinputStyle: {
    ...TextStyles.textinputfamilyclassAll,
    flex: 1,
    height: '100%',
    fontSize: scale(16),
    marginLeft: 10,
  },
  sideBtnstatys: {
    height: '100%',
    width: '37%',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityContainer: {
    width: '30%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  priceConatiner: {
    width: '28%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dateContainer: {
    width: '40%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  innerLowerCont: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  secondContainer: {
    width: '100%',
    height: h('2.5%'),
    marginVertical: h('1%'),
  },
  firstContainer: {
    width: '100%',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoContainerCont: {
    width: '94%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imageContainer: {
    height: h('10%'),
    width: h('10%'),
    borderRadius: h('1.5%'),
    overflow: 'hidden',
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  mainimage: {
    width: w('90%'),
    resizeMode: 'contain',
    height: h('30%'),
  },
  otherContent: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  maintxt: {
    fontSize: h('2.7%'),
    color: 'black',
    marginVertical: h('3%'),
  },
  subtext: {
    width: '70%',
    textAlign: 'center',
    fontSize: h('1.9%'),
    marginBottom: h('14%'),
  },
  btnConatiners: {
    width: w('90%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    width: '49%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBtncontainers: {
    width: w('90%'),
    height: h('6.5%'),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: c0color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: w('0.7%'),
  },
  btnTabComp: {
    width: '32%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  orderCradCont: {
    width: w('90%'),
    backgroundColor: '#FBFBFB',
    height: h('16%'),
    borderWidth: 0.8,
    borderColor: '#BFD0E5',
  },
  UperConat: {
    width: '100%',
    height: h('16%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lowerConat: {
    width: '100%',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  btnContainersItem: {
    width: w('15%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  iconContainerBtn: {
    width: h('5%'),
    height: h('5%'),
    borderRadius: h('5%'),
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  btnConterLower: {
    width: '100%',
    height: h('15%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
