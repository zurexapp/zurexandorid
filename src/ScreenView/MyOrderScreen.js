import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {c0color, greencolor, maincolor, redcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {scale} from 'react-native-size-matters';
import {useIsFocused} from '@react-navigation/native';
import {cancelOrderFun, getAllOrders} from '../DataBase/databaseFunction';
import {setMyOrdersData} from '../store/projectSlice';
import {useDispatch, useSelector} from 'react-redux';
import OrderSmallCompTeam from '../Components/OrderSmallCompTeam';
import LoadingModal from '../Components/LoadingModal';
import TeamOrderItemModal from '../Components/TeamOrderItemModal';
const MyOrderScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const [reasonTxt, setreasonTxt] = useState('');
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [cancelModal, setcancelModal] = useState(false);
  const isFocuesed = useIsFocused();
  const resultParm = route.params;
  let hideList = resultParm?.hideList;
  const {myOrdersData} = useSelector(state => state.project);
  const {isAuth} = useSelector(state => state.auth);
  let defaultRouteTab = resultParm?.tabStatus
    ? resultParm?.tabStatus
    : 'Current';
  // console.log('routeparmsssssssssssss', defaultRouteTab);
  const [btnSelectedValue, setbtnSelectedValue] = useState(
    `${defaultRouteTab}`,
  );
  useLayoutEffect(() => {
    const getAllMyOrders = async () => {
      setisLoading(true);
      const getMyOrdersResult = await getAllOrders();
      dispatch(setMyOrdersData({myOrdersData: getMyOrdersResult}));
      setisLoading(false);
    };
    if (myOrdersData?.length <= 0) {
      getAllMyOrders();
    }
    setbtnSelectedValue(resultParm?.tabStatus);
  }, [isFocuesed, dispatch, myOrdersData?.length, resultParm?.tabStatus]);

  const filteredData = () => {
    return myOrdersData?.filter(dat => dat?.TeamId === isAuth?.userId);
  };

  let listData =
    btnSelectedValue === 'Current'
      ? filteredData()?.filter(dat => dat.orderStatus === 'assigned')
      : btnSelectedValue === 'Coming'
      ? filteredData()?.filter(dat => dat.orderStatus === 'approved')
      : btnSelectedValue === 'Previous'
      ? filteredData()?.filter(dat => dat.orderStatus === 'completed')
      : [];
  const cancelOrder = async id => {
    if (reasonTxt) {
      setisLoading(true);
      await cancelOrderFun(id, 'canceled', isAuth?.userId, reasonTxt)
        .then(async () => {
          const newData = myOrdersData?.map(dat => {
            if (dat.id === id) {
              return {...dat, orderStatus: 'canceled'};
            } else {
              return {...dat};
            }
          });
          await dispatch(setMyOrdersData({myOrdersData: newData}));
        })
        .catch(e => console.log(e));
      setisLoading(false);
    } else {
      Alert.alert(textStrings.normalEror, textStrings.enterReasonToCancel);
    }
  };
  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.orderTitle}
          iconName1={'list'}
          firstbtnFun={() => navigation.toggleDrawer()}
        />
        <View style={styles.otherContent}>
          <View style={styles.topBtncontainers}>
            <TouchableOpacity
              onPress={() => setbtnSelectedValue('Current')}
              style={{
                ...styles.btnTabComp,
                backgroundColor:
                  btnSelectedValue === 'Current' ? maincolor : 'transparent',
              }}>
              <Text
                style={{
                  ...TextStyles.myorderbtnTxtNew,
                  color: btnSelectedValue === 'Current' ? 'white' : c0color,
                }}>
                {textStrings.currentTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setbtnSelectedValue('Coming')}
              style={{
                ...styles.btnTabComp,
                marginVertical: w('2%'),
                backgroundColor:
                  btnSelectedValue === 'Coming' ? maincolor : 'transparent',
              }}>
              <Text
                style={{
                  ...TextStyles.myorderbtnTxtNew,
                  color: btnSelectedValue === 'Coming' ? 'white' : c0color,
                }}>
                {textStrings.comingTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setbtnSelectedValue('Previous')}
              style={{
                ...styles.btnTabComp,
                backgroundColor:
                  btnSelectedValue === 'Previous' ? maincolor : 'transparent',
              }}>
              <Text
                style={{
                  ...TextStyles.myorderbtnTxtNew,
                  color: btnSelectedValue === 'Previous' ? 'white' : c0color,
                }}>
                {textStrings.completedStatusTxt}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{...styles.otherContent, marginTop: h('3%')}}>
            <FlatList
              keyExtractor={item => item.id}
              data={listData}
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
                <>
                  <TeamOrderItemModal
                    resonTxt={reasonTxt}
                    onChangeTxt={text => setreasonTxt(text)}
                    btnSelectedValue={btnSelectedValue}
                    crossFun={() => cancelOrder(item.id)}
                    item={item}
                    notCurentFun={() => {
                      navigation.navigate('orderDetailScreen', {
                        orderId: item?.id,
                      });
                    }}
                    tickFun={() =>
                      navigation.navigate('orderDetailScreen', {
                        orderId: item?.id,
                      })
                    }
                  />
                </>
              )}
            />
          </View>
        </View>
      </View>
      <Modal visible={cancelModal}></Modal>
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({
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
    height: h('8%'),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: c0color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    overflow: 'hidden',
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
});
