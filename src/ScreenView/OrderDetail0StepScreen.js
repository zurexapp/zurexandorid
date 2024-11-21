import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import OrderCompleteSteps from '../Components/OrderCompleteSteps';
import OrderPriceCalculator from '../Components/OrderPriceCalculator';
import {borderColor, maincolor, ratingColor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AwesomeAlert from 'react-native-awesome-alerts';
import Rating from 'react-native-rating-simple';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import EditOrderScreen from './ScreenAsModal/EditOrderScreen';

import CustomBtn from '../Components/CustomBtn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';

import {
  cancelOrderFun,
  getUserById,
  updateOrderData,
  updateOrderProductPrice,
  updateOrderStatus,
} from '../DataBase/databaseFunction';
import {setMyOrdersData} from '../store/projectSlice';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import LoadingModal from '../Components/LoadingModal';
import {scale} from 'react-native-size-matters';
import CancelOrderModel from '../Components/CancelOrderModel';

import axios from 'axios';

const sendNotification = async (registrationToken, title, body) => {
  // Ensure registrationToken is an array
  const tokens = Array.isArray(registrationToken)
    ? registrationToken
    : [registrationToken];

  for (const token of tokens) {
    try {
      // Send the notification data to the backend for each token
      const response = await axios.post(
        'https://app-xaop4bxqda-uc.a.run.app/sendNotification',
        {
          token, // Send as `token`, matching backend's expectations
          title,
          body,
        },
      );
      console.log(`Notification sent successfully to token: ${token}`);
    } catch (error) {
      console.error(
        `Error sending notification to token: ${token}`,
        error.message,
      );
    }
  }
};

const OrderDetail0StepScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const resutl = route?.params;
  const {isAuth, isArabicLanguage} = useSelector(state => state.auth);
  const {myOrdersData} = useSelector(state => state.project);
  const [editModalDone, seteditModalDone] = useState(false);
  const {
    filtersData,
    oilCompaniesData,
    oilsData,
    tireCompaniesData,
    tireData,
    batteryData,
    batteryCompaniesData,
    allTeamsData,
    employsData,
    engineOilData,
    engineOilPetrolData,
  } = useSelector(state => state.project);
  const filterDataItem = myOrdersData?.find(dat => dat.id === resutl?.orderId);

  // orderStatus = "pending","approved","completed"
  const [isLoading, setisLoading] = useState(false);
  const [acceptModal, setacceptModal] = useState(false);
  const [selectItemFilter, setselectItemFilter] = useState('');
  const [teamsDataState, setteamsDataState] = useState([]);
  const [SelectedTeamMembersOrder, setSelectedTeamMembersOrder] = useState([]);
  useEffect(() => {
    setSelectedTeamMembersOrder([]);
  }, [selectItemFilter]);

  const resultParm = {
    hideList: resutl?.hideList ? resutl?.hideList : false,
    hideRatting: resutl?.hideRatting ? resutl?.hideRatting : false,
    hideReasonInput: resutl?.hideReasonInput ? resutl?.hideReasonInput : false,
    hideTwoSmallBtn: resutl?.hideTwoSmallBtn ? resutl?.hideTwoSmallBtn : false,
    hideSingleBtn: resutl?.hideSingleBtn ? resutl?.hideSingleBtn : false,
    btnName: resutl?.btnName ? resutl?.btnName : null,
  };

  useEffect(() => {
    const getAllTeamsData = async () => {
      setisLoading(true);
      const filteredTeams = employsData?.filter(
        dat => dat?.role === 'SingleDTeam' || dat?.role === 'SingleTeam',
      );
      setteamsDataState(filteredTeams);
      setisLoading(false);
    };

    if (teamsDataState?.length <= 0) {
      getAllTeamsData();
    }
  }, [employsData, teamsDataState?.length]);

  let isShowList = filterDataItem?.orderStatus === 'pending' ? true : false;
  let isShowRatting =
    filterDataItem?.serviceProviderRating &&
    filterDataItem?.serviceRating &&
    filterDataItem?.orderStatus === 'completed'
      ? true
      : false;
  let isShowReasonInput =
    filterDataItem?.orderStatus === 'canceled' &&
    filterDataItem?.cancelReasonTxt?.length > 0
      ? true
      : false;
  let isShowSmallBtn = filterDataItem?.orderStatus === 'pending' ? true : false;
  let showSignleEditBtn =
    filterDataItem?.orderStatus === 'approved' ? true : false;
  let showSignleRecivedBtn = false;
  const getImageLink = referance => {
    if (
      referance === 'Filters' ||
      referance === 'Oils' ||
      referance === 'engineOil' ||
      referance === 'engineOilPetrol'
    ) {
      return require('../assets/oilimg.png');
    } else if (referance === 'Tyres') {
      return require('../assets/tyresimg.png');
    } else if (referance === 'btteries') {
      return require('../assets/scrensheader.png');
    } else {
      return require('../assets/logo.png');
    }
  };

  const displayPaymentMethodName = () => {
    let displayName = filterDataItem?.paymentMethodName;
    if (displayName.includes('Installment Companies Al-rajhi')) {
      displayName = 'Electronic Payment';
    } else if (displayName.includes('Installment Companies Tabby')) {
      displayName = 'Tabby';
    } else if (displayName.includes('Installment Companies Tamara')) {
      displayName = 'Tamara';
    }
    return displayName;
  };

  const findTitle = (referance, id) => {
    const data =
      referance === 'Filters'
        ? filtersData.find(dat => dat.id === id)
        : referance === 'Oils'
        ? oilsData.find(dat => dat.id === id)
        : referance === 'Tyres'
        ? tireData.find(dat => dat.id === id)
        : referance === 'btteries'
        ? batteryData.find(dat => dat.id === id)
        : referance === 'engineOil'
        ? engineOilData.find(dat => dat.id === id)
        : referance === 'engineOilPetrol'
        ? engineOilPetrolData.find(dat => dat.id === id)
        : {};
    const productTitle = isArabicLanguage
      ? data?.productNameArab
      : data?.productNameEng;
    return productTitle ? productTitle : textStrings.productHasBeenDeleted;
  };
  const fullProductData = filterDataItem?.products?.map(dat => {
    if (dat?.referance === 'Filters') {
      return {
        ...filtersData.find(dat => dat.id === filterDataItem?.products[0].id),
        referance: dat?.referance,
      };
    } else if (dat?.referance === 'Oils') {
      return {
        ...oilsData.find(dat => dat.id === filterDataItem?.products[0].id),
        referance: dat?.referance,
      };
    } else if (dat?.referance === 'Tyres') {
      return {
        ...tireData.find(dat => dat.id === filterDataItem?.products[0].id),
        referance: dat?.referance,
      };
    } else if (dat?.referance === 'btteries') {
      return {
        ...batteryData.find(dat => dat.id === filterDataItem?.products[0].id),
        referance: dat?.referance,
      };
    }
  });
  const findFreeServices = () => {
    const pushServices = [];
    filterDataItem?.preferdCompany?.map(dat => {
      if (dat?.referance === 'TireCompanies') {
        pushServices.push(tireCompaniesData.find(dal => dal?.id === dat?.id));
      } else if (dat?.referance === 'OilCompanies') {
        pushServices.push(oilCompaniesData.find(dac => dac?.id === dat?.id));
      } else if (dat?.referance === 'BatteryCompanies') {
        pushServices.push(
          batteryCompaniesData.find(dac => dac?.id === dat?.id),
        );
      }
    });
    const data = pushServices?.find(
      dac => dac?.offerEnglish !== 'Offer not included',
    );
    const dataBack = pushServices?.find(
      dac => dac?.offerEnglish === 'Offer not included',
    );
    const checkData = data ? data : dataBack;

    return isArabicLanguage ? checkData?.offerArab : checkData?.offerEnglish;
  };
  const [userData, setuserData] = useState({
    name: '',
    userEmail: '',
    phoneNumber: '',
    deviceToken: [],
  });
  const [openEditModal, setopenEditModal] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      setisLoading(true);
      await getUserById(filterDataItem?.OrderedByUserId).then(async dat => {
        await setuserData({
          name: dat?.name,
          userEmail: dat?.userEmail,
          phoneNumber: dat?.phoneNumber,
          deviceToken: dat?.deviceToken,
        });
      });
      setisLoading(false);
    };
    if (filterDataItem?.OrderedByUserId && userData?.name === '') {
      getUserData();
    }
  }, [filterDataItem, userData?.name]);

  const map = useRef(null);
  const dispatch = useDispatch();

  const changeOrderStatusFun2 = async () => {
    setisLoading(true);
    await updateOrderStatus(filterDataItem?.id, 'completed', isAuth?.userId)
      .then(async () => {
        const newData = myOrdersData?.map(dat => {
          if (dat.id === resutl?.orderId) {
            return {...dat, orderStatus: 'completed'};
          } else {
            return {...dat};
          }
        });
        await dispatch(setMyOrdersData({myOrdersData: newData}));
        navigation.pop();
      })
      .catch(e => console.log(e));
    setisLoading(false);
  };
  const changeOrderStatusAssignedFun = async status => {
    setisLoading(true);
    await updateOrderData(
      filterDataItem?.id,
      status,
      selectItemFilter,
      SelectedTeamMembersOrder,
    )
      .then(async () => {
        const newData = myOrdersData?.map(dat => {
          if (dat.id === resutl?.orderId) {
            return {...dat, orderStatus: status ? status : 'approved'};
          } else {
            return {...dat};
          }
        });
        await dispatch(setMyOrdersData({myOrdersData: newData}));
        navigation.pop();
      })
      .catch(e => console.log(e));
    setisLoading(false);
  };
  const changeOrderStatusFun = async status => {
    setisLoading(true);
    await updateOrderStatus(
      filterDataItem?.id,
      status ? status : 'approved',
      isAuth?.userId,
    )
      .then(async () => {
        const newData = myOrdersData?.map(dat => {
          if (dat.id === resutl?.orderId) {
            return {...dat, orderStatus: status ? status : 'approved'};
          } else {
            return {...dat};
          }
        });
        await dispatch(setMyOrdersData({myOrdersData: newData}));
        navigation.pop();
      })
      .catch(e => console.log(e));
    setisLoading(false);
  };
  const [reasonTxt, setReasonTxt] = useState('');
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const cancelOrder = async () => {
    if (reasonTxt) {
      setisLoading(true);
      try {
        await cancelOrderFun(
          filterDataItem?.id,
          'canceled',
          isAuth?.userId,
          reasonTxt,
        )
          .then(async () => {
            const newData = myOrdersData?.map(dat => {
              if (dat.id === filterDataItem?.id) {
                return {...dat, orderStatus: 'canceled'};
              } else {
                return {...dat};
              }
            });

            const notificationData = {
              title: `Order ${filterDataItem?.id} cancelled`,
              body: `Order cancelled due to: ${reasonTxt}`,
            };

            if (userData.deviceToken && userData.deviceToken.length > 0) {
              // Send notification
              for (let token of userData.deviceToken) {
                await sendNotification(
                  token,
                  notificationData.title,
                  notificationData.body,
                );
              }
            } else {
              console.warn('No device tokens available to send notification.');
            }
            await dispatch(setMyOrdersData({myOrdersData: newData}));
            navigation.pop();
          })
          .catch(e => {
            console.error('Error in cancelOrderFun:', e);
            Alert.alert(
              textStrings.normalEror,
              textStrings.enterReasonToCancel,
            );
          });
      } catch (error) {
        console.error('Error during order cancellation:', error);
        Alert.alert(textStrings.normalEror, textStrings.enterReasonToCancel);
      }
      setisLoading(false);
    } else {
      Alert.alert(textStrings.normalEror, textStrings.enterReasonToCancel);
    }
  };

  const [modalEditData, setmodalEditData] = useState({
    battery: '',
    tire: '',
    supportService: '',
    freeService: '',
    filters: '',
    otherOils: '',
    engineOil: '',
    engineOilPetrol: '',
  });

  const defaultModalValue = () => {
    setmodalEditData({
      battery: '',
      tire: '',
      supportService: '',
      freeService: '',
      filters: '',
      otherOils: '',
      engineOil: '',
      engineOilPetrol: '',
    });
  };

  const openMapsWithDirections = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => {
      console.error('Failed to open Google Maps:', err);
      Alert.alert(
        'Error',
        'Google Maps is not responding. Please try again later.',
      );
    });
  };

  const AssignOrderFun = async () => {
    if (selectItemFilter !== '') {
      if (SelectedTeamMembersOrder?.length > 0) {
        await changeOrderStatusAssignedFun('assigned');
        const memberId = SelectedTeamMembersOrder[0].id;
        const foundTeam = teamsDataState.find(
          team =>
            team.teamInfo.members &&
            team.teamInfo.members.some(member => member.id === memberId),
        );
        if (foundTeam) {
          const teamTokens = foundTeam.deviceToken;
          if (teamTokens && teamTokens.length > 0) {
            await sendNotification(
              teamTokens,
              'Order Recieved',
              `Order ${filterDataItem.id} Assigned to ${SelectedTeamMembersOrder[0].name}`,
            );
          }
        } else {
          console.log('Member not found in any team');
        }
      } else {
        Alert.alert(
          textStrings.normalEror,
          textStrings.teamMemberSelctionError,
        );
      }
    } else {
      Alert.alert(textStrings.normalEror, textStrings.teamSelctionError);
    }
  };

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={filterDataItem?.id ? filterDataItem?.id : '#1234'}
          iconName1={'left'}
          firstbtnFun={() => navigation.goBack()}
          secbtnFun={() => console.log('next')}
          reddot={false}
        />
        <View style={styles.otherContent}>
          <KeyboardAwareScrollView>
            <FlatList
              data={[]}
              ListHeaderComponent={
                <View style={{width: '100%', marginBottom: h('10%')}}>
                  <View style={styles.borderdivcont}>
                    <OrderCompleteSteps
                      isSeprator={true}
                      isCompleted={
                        filterDataItem?.orderStatus === 'approved' ||
                        filterDataItem?.orderStatus === 'completed'
                          ? true
                          : false
                      }
                      time={
                        filterDataItem?.orderStatus === 'approved' ||
                        filterDataItem?.orderStatus === 'completed'
                          ? '08:00'
                          : '00:00'
                      }
                      iconName={'cube-outline'}
                      text={textStrings.recivedOrderTxt}
                    />
                    <OrderCompleteSteps
                      isSeprator={true}
                      isCompleted={
                        filterDataItem?.orderStatus === 'approved' ||
                        filterDataItem?.orderStatus === 'completed'
                          ? true
                          : false
                      }
                      time={
                        filterDataItem?.orderStatus === 'approved' ||
                        filterDataItem?.orderStatus === 'completed'
                          ? '08:00'
                          : '00:00'
                      }
                      iconName={'delivery-dining'}
                      text={textStrings.techArrivedTxt}
                    />
                    <OrderCompleteSteps
                      isSeprator={false}
                      isCompleted={
                        filterDataItem?.orderStatus === 'completed'
                          ? true
                          : false
                      }
                      time={
                        filterDataItem?.orderStatus === 'completed'
                          ? '08:00'
                          : '00:00'
                      }
                      iconName={'cube-outline'}
                      text={textStrings.orderCompletedTxt}
                    />
                  </View>
                  <View style={styles.borderdivcont}>
                    <View style={styles.linComp}>
                      <Image
                        style={styles.lineCompImage}
                        source={require('../assets/personIcon.png')}
                      />
                      <Text
                        style={{
                          ...TextStyles.balancesubtxt,
                          lineHeight: h('3.5%'),
                          width: '90%',
                          textAlign: 'left',
                        }}>
                        {textStrings.clientNameTxt} :{' '}
                        <Text
                          style={{color: 'black', textTransform: 'capitalize'}}>
                          {userData?.name ? userData?.name : 'Name'}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.linComp}>
                      <Image
                        style={styles.lineCompImage}
                        source={require('../assets/phoneIcon.png')}
                      />
                      <Text
                        style={{
                          ...TextStyles.balancesubtxt,
                          lineHeight: h('3.5%'),
                          width: '90%',
                          textAlign: 'left',
                        }}>
                        {textStrings.phoneNumTxt} :{' '}
                        <Text style={{color: 'black'}}>
                          {userData?.phoneNumber
                            ? userData?.phoneNumber
                            : 'phone Number'}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.linComp}>
                      <Image
                        style={styles.lineCompImage}
                        source={require('../assets/phoneIcon.png')}
                      />
                      <Text
                        style={{
                          ...TextStyles.balancesubtxt,
                          lineHeight: h('3.5%'),
                          width: '90%',
                          textAlign: 'left',
                        }}>
                        {textStrings.plateNumberTxt} :{' '}
                        <Text
                          style={{color: 'black', textTransform: 'capitalize'}}>
                          {filterDataItem?.selectedCar?.numberPlate
                            ? filterDataItem?.selectedCar.numberPlate
                            : '333000'}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.linComp}>
                      <Image
                        style={styles.lineCompImage}
                        source={require('../assets/calenderIconNew.png')}
                      />
                      <Text
                        style={{
                          ...TextStyles.balancesubtxt,
                          lineHeight: h('3.5%'),
                          width: '90%',
                          textAlign: 'left',
                        }}>
                        {textStrings.orderTimeTxt} :{' '}
                        <Text style={{color: 'black'}}>
                          {dayjs(filterDataItem.createdAt).format(
                            'DD/MM/YYYY hh:mm A',
                          )}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.linComp}>
                      <Image
                        style={styles.lineCompImage}
                        source={require('../assets/calenderIconNew.png')}
                      />
                      <Text
                        style={{
                          ...TextStyles.balancesubtxt,
                          lineHeight: h('3.5%'),
                          width: '90%',
                          textAlign: 'left',
                        }}>
                        {textStrings.appointmentTxtOrder} :{' '}
                        <Text style={{color: 'black'}}>
                          {filterDataItem?.appointment?.date}{' '}
                          {filterDataItem?.appointment?.time}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.linComp}>
                      <Image
                        style={{...styles.lineCompImage, width: 30, height: 40}}
                        source={require('../assets/mode.png')}
                      />
                      <Text
                        style={{
                          ...TextStyles.balancesubtxt,
                          lineHeight: h('3.5%'),
                          width: '90%',
                          textAlign: 'left',
                        }}>
                        {textStrings.paymentmode} :{' '}
                        <Text style={{color: 'black'}}>
                          {displayPaymentMethodName()}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.linComp}>
                      <Image
                        style={{...styles.lineCompImage, width: 30, height: 40}}
                        source={require('../assets/paid.png')}
                      />
                      <Text
                        style={{
                          ...TextStyles.balancesubtxt,
                          lineHeight: h('3.5%'),
                          width: '90%',
                          textAlign: 'left',
                        }}>
                        {textStrings.TotalPrice} :{' '}
                        <Text style={{color: 'black'}}>
                          {filterDataItem?.totalPrice}
                        </Text>
                        <Text> SAR</Text>
                      </Text>
                    </View>
                    {filterDataItem?.paymentMethodName === 'Cash Payment' ||
                    filterDataItem?.paymentMethodName ===
                      'الدفع عند الاستلام' ? (
                      <View style={styles.linComp}>
                        <Image
                          style={styles.lineCompImage}
                          source={require('../assets/paid.png')}
                        />
                        <Text
                          style={{
                            ...TextStyles.balancesubtxt,
                            lineHeight: h('3.5%'),
                            width: '90%',
                            textAlign: 'left',
                          }}>
                          {textStrings.balanceAmount} :{' '}
                          <Text style={{color: 'red'}}>
                            {filterDataItem?.totalPrice} SAR
                          </Text>
                        </Text>
                      </View>
                    ) : (
                      filterDataItem?.balanceAmount && (
                        <View style={styles.linComp}>
                          <Image
                            style={styles.lineCompImage}
                            source={require('../assets/paid.png')}
                          />
                          <Text
                            style={{
                              ...TextStyles.balancesubtxt,
                              lineHeight: h('3.5%'),
                              width: '90%',
                              textAlign: 'left',
                            }}>
                            {textStrings.balanceAmount} :{' '}
                            <Text style={{color: 'red'}}>
                              {filterDataItem?.balanceAmount} SAR
                            </Text>
                          </Text>
                        </View>
                      )
                    )}
                    {filterDataItem?.fuelType ? (
                      <View style={styles.linComp}>
                        <Image
                          style={{
                            ...styles.lineCompImage,
                            width: 30,
                            height: 40,
                          }}
                          source={require('../assets/fuel.png')}
                        />
                        <Text
                          style={{
                            ...TextStyles.balancesubtxt,
                            lineHeight: h('3.5%'),
                            width: '90%',
                            textAlign: 'left',
                          }}>
                          {textStrings.fuelType} :{' '}
                          <Text style={{color: 'black'}}>
                            {filterDataItem?.fuelType}
                          </Text>
                        </Text>
                      </View>
                    ) : null}
                    <FlatList
                      data={filterDataItem?.products}
                      ItemSeparatorComponent={() => (
                        <View style={{height: h('1%')}} />
                      )}
                      keyExtractor={(item, index) => `${item?.id}${index}`}
                      renderItem={({item}) => (
                        <View style={styles.upperdomain}>
                          <Image
                            source={getImageLink(item.referance)}
                            style={{
                              resizeMode: 'cover',
                              width: h('12%'),
                              height: '100%',
                              borderRadius: 10,
                              overflow: 'hidden',
                              backgroundColor: maincolor,
                            }}
                          />

                          <View style={styles.textinfoprod}>
                            <Text
                              style={{
                                ...TextStyles.ordercalctaxname,
                                marginBottom: h('1.5%'),
                              }}>
                              {findTitle(item.referance, item.id)}
                            </Text>
                            <View style={styles.locationHeading}>
                              <Image
                                source={require('../assets/quantity.png')}
                                style={{
                                  height: '100%',
                                  width: h('4%'),
                                  resizeMode: 'contain',
                                }}
                              />
                              <View style={styles.filldivTxtcont}>
                                <Text
                                  style={{
                                    ...TextStyles.orderdetaillocationHeadingtitle,
                                    marginLeft: w('1%'),
                                  }}>
                                  {textStrings.quantityTxt} :{' '}
                                  <Text style={TextStyles.fwbold}>
                                    {item?.quantity ? item?.quantity : 1}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      openMapsWithDirections(
                        filterDataItem?.deliveryInfo?.locationCoordinates
                          .latitude,
                        filterDataItem?.deliveryInfo?.locationCoordinates
                          .longitude,
                      )
                    }
                    style={{...styles.borderdivcont, paddingBottom: 0}}>
                    <View style={styles.locationHeading}>
                      <Icon
                        name="location-sharp"
                        size={h('3.5%')}
                        color={textcolor}
                      />
                      <Text
                        style={{
                          ...TextStyles.orderdetaillocationHeadingtitle,
                          textAlign: 'left',
                        }}>
                        {textStrings.recipiantAddressTxt}
                      </Text>
                    </View>
                    <Text style={TextStyles.orderdetaillocationtitle}>
                      {filterDataItem?.deliveryInfo?.locationName}
                    </Text>
                    {filterDataItem?.deliveryInfo?.locationCoordinates
                      .latitude !== 0 &&
                    filterDataItem?.deliveryInfo?.locationCoordinates
                      .longitude !== 0 ? (
                      <MapView
                        ref={map}
                        provider={PROVIDER_GOOGLE}
                        style={styles.mapbtn}
                        initialRegion={{
                          latitude:
                            filterDataItem?.deliveryInfo?.locationCoordinates
                              .latitude,
                          longitude:
                            filterDataItem?.deliveryInfo?.locationCoordinates
                              .longitude,
                          latitudeDelta: 0.0622,
                          longitudeDelta: 0.0421,
                        }}>
                        <Marker
                          coordinate={{
                            latitude:
                              filterDataItem?.deliveryInfo?.locationCoordinates
                                .latitude,
                            longitude:
                              filterDataItem?.deliveryInfo?.locationCoordinates
                                .longitude,
                          }}
                          pinColor={maincolor}
                          title={textStrings.recipiantAddressTxt}
                        />
                      </MapView>
                    ) : (
                      <View style={styles.mapbtn}>
                        <Image
                          source={require('../assets/map.png')}
                          style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                          }}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                  {findFreeServices()?.length > 0 ? (
                    <View style={styles.borderdivcont}>
                      <View style={styles.locationHeading}>
                        <Icon
                          name="location-sharp"
                          size={h('3.5%')}
                          color={textcolor}
                        />
                        <Text
                          style={{
                            ...TextStyles.orderdetaillocationHeadingtitle,
                            textAlign: 'left',
                          }}>
                          {textStrings.freeServicesTxt}
                        </Text>
                      </View>
                      <Text
                        style={{
                          ...TextStyles.choiceinputinputxthead,
                          textAlign: 'left',
                          width: '95%',
                          alignSelf: 'center',
                        }}>
                        {findFreeServices()}
                      </Text>
                    </View>
                  ) : null}
                  {isShowList ? (
                    <OrderPriceCalculator
                      taxesdat={[
                        {
                          name: textStrings.priceCodeTxt,
                          price: filterDataItem.orderPrice
                            ? filterDataItem.orderPrice
                            : 0,
                          id: 0,
                        },
                        {name: textStrings.wagesCodeTxt, price: 0, id: 1},
                        {
                          name: textStrings.taxCodeTxt,
                          price: filterDataItem.taxPrice
                            ? filterDataItem.taxPrice
                            : 0,
                          id: 2,
                        },
                        // {name: textStrings.discountCodeTxt, price: 0, id: 3},
                        // {name: textStrings.cashBackTxt, price: 0, id: 4},
                      ]}
                      total={
                        filterDataItem?.totalPrice
                          ? filterDataItem?.totalPrice
                          : 0
                      }
                    />
                  ) : null}
                  {isShowRatting ? (
                    <View style={styles.borderdivcont}>
                      <Text
                        style={{
                          ...TextStyles.choiceinputbtntxt,
                          color: 'black',
                          textAlign: 'center',
                        }}>
                        {textStrings.rateServiceClientTxt}
                      </Text>
                      <View style={styles.starContainer}>
                        <Rating
                          rating={filterDataItem?.serviceRating}
                          halfStar={
                            <FontAwesome
                              name="star-half-empty"
                              color="#F28119"
                              size={h('4.5%')}
                            />
                          }
                          fullStar={
                            <FontAwesome
                              name="star"
                              color="#F28119"
                              size={h('4.5%')}
                            />
                          }
                          emptyStar={
                            <FontAwesome
                              name="star-o"
                              color="#F28119"
                              size={h('4.5%')}
                            />
                          }
                          starSize={h('4.5%')}
                          viewOnly={true}
                        />
                      </View>
                      <Text
                        style={{
                          ...TextStyles.choiceinputbtntxt,
                          color: 'black',
                          textAlign: 'center',
                        }}>
                        {textStrings.rateServiceProviderTxt}
                      </Text>
                      <View style={styles.starContainer}>
                        <Rating
                          rating={filterDataItem?.serviceProviderRating}
                          halfStar={
                            <FontAwesome
                              name="star-half-empty"
                              color="#F28119"
                              size={h('4.5%')}
                            />
                          }
                          fullStar={
                            <FontAwesome
                              name="star"
                              color="#F28119"
                              size={h('4.5%')}
                            />
                          }
                          emptyStar={
                            <FontAwesome
                              name="star-o"
                              color="#F28119"
                              size={h('4.5%')}
                            />
                          }
                          starSize={h('4.5%')}
                          viewOnly={true}
                        />
                      </View>
                    </View>
                  ) : null}
                  {isShowReasonInput ? (
                    <TextInput
                      placeholder={textStrings.canecelReasonTxt}
                      style={styles.textInputStyle}
                      multiline={true}
                      value={filterDataItem?.cancelReasonTxt}
                      editable={false}
                    />
                  ) : null}

                  {isShowSmallBtn ? (
                    <View style={styles.btnSmallContainersDiv}>
                      <View style={{width: '47%'}}>
                        <CustomBtn
                          title={textStrings.acceptBtnTxt}
                          bgColor={maincolor}
                          secColor={'white'}
                          clickfun={() => setacceptModal(!acceptModal)}
                        />
                      </View>
                      <View style={{width: '47%'}}>
                        <CustomBtn
                          title={textStrings.cancelStatusTxt}
                          secColor={maincolor}
                          bgColor={'white'}
                          clickfun={() => setCancelOrderModal(true)}
                        />
                      </View>
                    </View>
                  ) : null}
                  {showSignleRecivedBtn ? (
                    <AppBtn
                      title={
                        resultParm?.btnName
                          ? resultParm?.btnName
                          : textStrings.recivedOrderTxtBtn
                      }
                      clickfun={changeOrderStatusFun}
                    />
                  ) : null}
                  {showSignleEditBtn ? (
                    <View style={{width: '85%', alignSelf: 'center'}}>
                      <CustomBtn
                        title={textStrings.editBtnTxt}
                        clickfun={() => setopenEditModal(!openEditModal)}
                      />
                    </View>
                  ) : null}
                </View>
              }
            />
          </KeyboardAwareScrollView>
        </View>
        <Modal
          visible={openEditModal}
          onRequestClose={() => setopenEditModal(!openEditModal)}>
          <EditOrderScreen
            allProducts={fullProductData}
            valueObject={modalEditData}
            changeValueFun={text => setmodalEditData(text)}
            closeModalFun={() => {
              setopenEditModal(!openEditModal);
              defaultModalValue(); // Reset modal values to default
            }}
            addBtnFunction={async (prod, pric, tax) => {
              setisLoading(true); // Set loading state
              const newProducts = [...filterDataItem?.products, ...prod]; // Update products
              const newPrice = filterDataItem?.orderPrice + pric; // Update price
              const newTax = parseInt(filterDataItem?.taxPrice) + parseInt(tax); // Update tax
              const newTotal =
                parseInt(filterDataItem?.totalPrice) +
                parseInt(pric) +
                parseInt(tax); // Update total
              const remainingbalance = parseInt(pric) + parseInt(tax);

              await updateOrderProductPrice(
                filterDataItem?.id,
                newProducts,
                newPrice,
                newTax,
                newTotal,
                remainingbalance,
              ).then(() => {
                setopenEditModal(!openEditModal); // Close modal
                seteditModalDone(true); // Set edit done state
                setmodalEditData({
                  battery: '',
                  tire: '',
                  supportService: '',
                  freeService: '',
                  filters: '',
                  otherOils: '',
                  engineOil: '',
                }); // Reset modal data
              });
              setisLoading(false); // Unset loading state
            }}
            oldTotalPriceValue={filterDataItem?.totalPrice}
          />
        </Modal>

        <Modal
          visible={acceptModal}
          onRequestClose={() => setacceptModal(!acceptModal)}>
          <View style={styles.fillscreenbg}>
            <CurvedHeaderComp
              name={textStrings.teamsBtnTxtHead}
              iconName1={'left'}
              firstbtnFun={() => setacceptModal(!acceptModal)}
            />
            <View style={{...styles.otherContent, marginTop: h('2%')}}>
              <View
                style={{
                  ...styles.otherContent,
                  marginVertical: h('2%'),
                }}>
                <Text
                  style={{
                    ...TextStyles.choiceinputinputxthead,
                    textAlign: 'left',
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: h('3%'),
                  }}>
                  {textStrings.dectTeamBtnTxt} = (DT) , {textStrings.teamBtnTxt}{' '}
                  = (T)
                </Text>
                <FlatList
                  data={teamsDataState}
                  ItemSeparatorComponent={
                    <View style={{width: '100%', marginBottom: h('2%')}} />
                  }
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <>
                      <TouchableOpacity
                        onPress={() => setselectItemFilter(item?.id)}
                        style={styles.listFilterBtn}>
                        <Text style={styles.listMainTxt}>
                          {item?.teamInfo.name} (
                          {item?.role === 'SingleTeam'
                            ? 'T'
                            : item?.role === 'SingleDTeam'
                            ? 'DT'
                            : ''}
                          )
                        </Text>
                        <View
                          style={{
                            ...styles.listBtnCircle,
                            borderWidth:
                              selectItemFilter === item?.id ? h('1.2%') : 1,
                            borderColor:
                              selectItemFilter !== item?.id
                                ? borderColor
                                : maincolor,
                          }}
                        />
                      </TouchableOpacity>
                      {selectItemFilter === item?.id ? (
                        <FlatList
                          data={item?.teamInfo?.members}
                          ListHeaderComponent={
                            <View
                              style={{width: '100%', marginBottom: h('2%')}}
                            />
                          }
                          ItemSeparatorComponent={() => (
                            <View style={styles.memberSeprator} />
                          )}
                          renderItem={props => (
                            <TouchableOpacity
                              onPress={() => {
                                const check = SelectedTeamMembersOrder?.filter(
                                  dat => dat?.phone === props?.item?.phone,
                                );
                                if (check?.length <= 0) {
                                  setSelectedTeamMembersOrder([
                                    ...SelectedTeamMembersOrder,
                                    {...props.item},
                                  ]);
                                } else {
                                  const filterData =
                                    SelectedTeamMembersOrder?.filter(
                                      dat => dat?.phone !== props?.item?.phone,
                                    );
                                  setSelectedTeamMembersOrder(filterData);
                                }
                              }}
                              style={styles.listFilterBtn2}
                              key={props.index}>
                              <View style={styles.listUserNameView}>
                                <Text style={TextStyles.Myorderbtntxt}>
                                  {props?.item?.name}
                                </Text>
                                <Text style={TextStyles.Myorderbtntxt}>
                                  {props?.item?.phone}
                                </Text>
                              </View>
                              <View style={styles.listBtnCheckBox}>
                                {SelectedTeamMembersOrder?.filter(
                                  dat => dat?.phone === props?.item?.phone,
                                )?.length > 0 ? (
                                  <AntDesign
                                    name="check"
                                    size={h('3%')}
                                    color={maincolor}
                                  />
                                ) : null}
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                      ) : null}
                    </>
                  )}
                />
              </View>
              <View style={styles.btnConterLower}>
                <AppBtn
                  title={textStrings.assignBtnTxt}
                  clickfun={AssignOrderFun}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <LoadingModal visibleModal={isLoading} />
      <CancelOrderModel
        crossFun={cancelOrder}
        isCancelModal={cancelOrderModal}
        onChangeTxt={text => setReasonTxt(text)}
        resonTxt={reasonTxt}
        switchCancelModal={() => setCancelOrderModal(!cancelOrderModal)}
      />
    </>
  );
};

export default OrderDetail0StepScreen;

const styles = StyleSheet.create({
  listUserNameView: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
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
  listBtnCheckBox: {
    height: h('4%'),
    width: h('4%'),
    borderRadius: h('0.2%'),
    overflow: 'hidden',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: borderColor,
  },
  listFilterBtn2: {
    width: w('90%'),
    height: h('7.5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: w('3%'),
    alignSelf: 'center',
  },
  memberSeprator: {
    borderWidth: 0.6,
    borderStyle: 'dashed',
    borderColor: maincolor,
    width: w('86%'),
    alignSelf: 'center',
    marginVertical: h('0.5%'),
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
    alignSelf: 'center',
  },
  textInputStyle: {
    ...TextStyles.myorderscreentitle,
    width: '90%',
    height: h('18%'),
    alignSelf: 'center',
    marginVertical: h('3%'),
    borderWidth: 1,
    borderColor: '#f0f0f0',
    textAlign: 'left',
    textAlignVertical: 'top',
    paddingVertical: h('2%'),
    paddingHorizontal: w('2%'),
    textTransform: 'capitalize',
  },
  btnSmallContainersDiv: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: h('3%'),
  },
  starContainer: {
    width: '100%',
    height: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fillscreenbg: {
    height: '100%',
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  mapbtn: {
    width: w('90%'),
    height: h('20%'),
    alignSelf: 'center',
    marginTop: h('2%'),
  },
  borderdivcont: {
    backgroundColor: 'white',
    marginBottom: h('3%'),
    paddingVertical: h('2%'),
    width: w('90%'),
    alignSelf: 'center',
    borderRadius: scale(7),
    borderColor: '#f0f0f0f0',
    borderWidth: 1,
    overflow: 'hidden',
  },
  locationHeading: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: h('1.5%'),
    height: h('4%'),
  },

  productInfodiv: {
    width: '100%',
    height: h('13%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  filldivTxtcont: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  upperdomain: {
    width: '100%',
    height: h('12%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  imagCXontainer: {
    width: h('13%'),
    height: '100%',
    backgroundColor: 'grey',
    borderRadius: 6,
    overflow: 'hidden',
  },
  textinfoprod: {
    width: w('60%'),
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  prodnamtxt: {
    marginBottom: h('1.5%'),
    fontSize: h('2.4%'),
    color: 'black',
  },
  modalConatiner: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    width: '95%',
    height: h('45%'),
    backgroundColor: 'white',
    borderRadius: h('1%'),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  closebtnmodal: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: h('9%'),
    height: h('9%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linComp: {
    width: '100%',
    height: h('3.5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: h('1%'),
  },
  lineCompImage: {
    resizeMode: 'contain',
    height: '100%',
    width: h('2.5%'),
    marginLeft: h('1.2%'),
  },
});
