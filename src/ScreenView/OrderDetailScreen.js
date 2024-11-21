import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Linking,
  TextInput,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import OrderCompleteSteps from '../Components/OrderCompleteSteps';
import OrderPriceCalculator from '../Components/OrderPriceCalculator';
import {maincolor, ratingColor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import Rating from 'react-native-rating-simple';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import EditOrderScreen from './ScreenAsModal/EditOrderScreen';
import CustomBtn from '../Components/CustomBtn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  UpdateOrderWithId,
  getUserById,
  getDataWithRef,
  updateOrderProductPrice,
  updateOrderStatus,
  getEmployDataWithJobrole,
} from '../DataBase/databaseFunction';
import {setMyOrdersData} from '../store/projectSlice';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import LoadingModal from '../Components/LoadingModal';
import {scale} from 'react-native-size-matters';
import CompleteOrderModal from './CompleteOrderModal';

const OrderDetailScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const resutl = route?.params;
  const {isAuth, isArabicLanguage} = useSelector(state => state.auth);
  const [editModalDone, seteditModalDone] = useState(false);
  const {myOrdersData} = useSelector(state => state.project);

  const {
    filtersData,
    oilCompaniesData,
    oilsData,
    tireCompaniesData,
    tireData,
    batteryData,
    batteryCompaniesData,
    cashBack,
    engineOilData,
    engineOilPetrolData,
  } = useSelector(state => state.project);
  const filterDataItem = myOrdersData?.find(dat => dat.id === resutl?.orderId);

  console.log('Order Details: ', filterDataItem);

  const [isLoading, setisLoading] = useState(false);
  const [isCompleteModalVisible, setIsCompleteModalVisible] = useState(false); // New state for modal visibility
  const [orderDetails, setOrderDetails] = useState(null);
  const [inputFields, setInputFields] = useState({
    customerName: '',
    branch: '',
    invoiceDate: '',
    invoiceNumber: '',
    phoneNumber: '',
    carModel: '',
    modelYear: '',
    carBrand: '',
    vin: '',
    teamName: '',
    teamNumber: '',
    kilometer: '',
  });

  const handleNext = async () => {
    setisLoading(true);
    try {
      // Update order status to 'completed'
      await updateOrderStatus(filterDataItem?.id, 'completed', isAuth?.userId);

      // Update the order status in Redux
      const newData = myOrdersData?.map(dat => {
        if (dat.id === resutl?.orderId) {
          return {...dat, orderStatus: 'completed'};
        } else {
          return {...dat};
        }
      });

      // Fetch supervisor data and extract their device tokens
      const employData = await getEmployDataWithJobrole('supervisor');
      const employdevicetokens = [];
      for (const key in employData) {
        if (employData[key].deviceToken) {
          employdevicetokens.push(...employData[key].deviceToken);
        }
      }

      // Combine user and supervisor device tokens, removing duplicates
      const allDeviceTokens = [
        ...new Set([...userData.deviceToken, ...employdevicetokens]),
      ];

      // Send a notification to both the user and supervisors
      await sendNotification(
        allDeviceTokens,
        'Order Completed',
        `Your order #${filterDataItem?.id} has been completed successfully.`,
      );

      // Dispatch the updated order data to the Redux store
      await dispatch(setMyOrdersData({myOrdersData: newData}));

      // Close the "Complete" modal
      setIsCompleteModalVisible(false);

      // Navigate back to the previous screen
      navigation.pop();
    } catch (error) {
      console.error('Error completing the order:', error);
    } finally {
      setisLoading(false);
    }
  };

  const handleInputChange = useCallback((field, value) => {
    setInputFields(prevState => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const resultParm = {
    hideList: resutl?.hideList ? resutl?.hideList : false,
    hideRatting: resutl?.hideRatting ? resutl?.hideRatting : false,
    hideReasonInput: resutl?.hideReasonInput ? resutl?.hideReasonInput : false,
    hideTwoSmallBtn: resutl?.hideTwoSmallBtn ? resutl?.hideTwoSmallBtn : false,
    hideSingleBtn: resutl?.hideSingleBtn ? resutl?.hideSingleBtn : false,
    btnName: resutl?.btnName ? resutl?.btnName : null,
  };
  let isShowList = filterDataItem?.orderStatus === 'pending' ? true : false;
  let deliveryStatus = filterDataItem?.deliveryStatus
    ? filterDataItem?.deliveryStatus
    : 'not started';
  let isShowRatting =
    filterDataItem?.serviceProviderRating &&
    filterDataItem?.serviceRating &&
    filterDataItem?.orderStatus === 'completed'
      ? true
      : false;
  let isShowReasonInput =
    filterDataItem?.orderStatus === 'canceled' ? true : false;
  let isShowSmallBtn = false;
  let showSignleEditBtn =
    filterDataItem?.orderStatus === 'approved' ? true : false;
  let showSignleRecivedBtn =
    filterDataItem?.orderStatus === 'assigned' ? true : false;
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
      return require('../assets/logo-short.png');
    }
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

  console.log('Product Details: ', fullProductData);

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

  useEffect(() => {
    if (editModalDone) {
      setTimeout(() => {
        seteditModalDone(!editModalDone);
      }, 2000);
    }
  }, [editModalDone]);

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
  console.log(1111111111111, filterDataItem?.OrderedByUserId);

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
      console.log('User Data: ', userData);
    };
    if (filterDataItem?.OrderedByUserId && userData?.name === '') {
      getUserData();
    }
  }, [filterDataItem, userData, userData?.name]);

  const map = useRef(null);
  const dispatch = useDispatch();

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

  const changeOrderStatusFun2 = async () => {
    setIsCompleteModalVisible(true); // Open the new modal on "Complete" button click
  };

  const changeOrderStatusFun = async () => {
    setisLoading(true);
    await updateOrderStatus(filterDataItem?.id, 'approved', isAuth?.userId)
      .then(async () => {
        const newData = myOrdersData?.map(dat => {
          if (dat.id === resutl?.orderId) {
            return {...dat, orderStatus: 'approved'};
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

  const changeDeliverStatus = async () => {
    setisLoading(true);
    await UpdateOrderWithId(resutl?.orderId, {
      deliveryStatus:
        deliveryStatus === 'not started'
          ? 'started'
          : deliveryStatus === 'started'
          ? 'completed'
          : '',
    });
    setisLoading(false);
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
    cashBack: cashBack ? cashBack : '',
  });

  useEffect(() => {
    console.log('Modal Edit Data: ', modalEditData);
  }, [modalEditData]);

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

      cashBack: cashBack ? cashBack : '',
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
                        filterDataItem?.orderStatus === 'pending' ||
                        filterDataItem?.orderStatus === 'approved' ||
                        filterDataItem?.orderStatus === 'completed'
                          ? true
                          : false
                      }
                      time={
                        filterDataItem?.orderStatus === 'pending' ||
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
                          style={{
                            color: 'black',
                            textTransform: 'capitalize',
                          }}>
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
                          style={{
                            color: 'black',
                            textTransform: 'capitalize',
                          }}>
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
                          {filterDataItem?.appointment?.date}{' '}
                          {filterDataItem?.appointment?.time}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.linComp}>
                      <Image
                        style={{
                          ...styles.lineCompImage,
                          width: 30,
                          height: 40,
                        }}
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
                        style={{
                          ...styles.lineCompImage,
                          width: 30,
                          height: 40,
                        }}
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
                        <View
                          style={{
                            ...styles.upperdomain,
                            height: item?.type ? h('16%') : h('12%'),
                          }}>
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
                              <View
                                style={{
                                  ...styles.filldivTxtcont,
                                }}>
                                <Text
                                  style={{
                                    ...TextStyles.orderdetaillocationHeadingtitle,
                                    marginLeft: w('1%'),
                                    width: 'auto',
                                  }}>
                                  {textStrings.quantityTxt} :{' '}
                                  <Text style={TextStyles.fwbold}>
                                    {item?.quantity ? item?.quantity : 1}
                                  </Text>
                                </Text>
                              </View>
                            </View>

                            {item?.type ? (
                              <View
                                style={{
                                  ...styles.locationHeading,
                                  marginBottom: 0,
                                }}>
                                <Image
                                  source={require('../assets/quantity.png')}
                                  style={{
                                    height: '100%',
                                    width: h('3%'),
                                    resizeMode: 'contain',
                                  }}
                                />
                                <View
                                  style={{
                                    ...styles.filldivTxtcont,
                                  }}>
                                  <Text
                                    style={{
                                      ...TextStyles.orderdetaillocationHeadingtitle,
                                      marginLeft: w('1%'),
                                      width: 'auto',
                                    }}>
                                    {textStrings.filterTypeTxt} :{' '}
                                    <Text style={TextStyles.fwbold}>
                                      {item?.type === 'commercial'
                                        ? textStrings.commercialTxtFilter
                                        : textStrings.orignalTxtFilter}
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                            ) : null}
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
                        {name: textStrings.taxCodeTxt, price: 0, id: 2},
                        // {name: textStrings.discountCodeTxt, price: 0, id: 3},
                        // {name: textStrings.cashBackTxt, price: 0, id: 4},
                      ]}
                      total={
                        filterDataItem?.orderPrice
                          ? filterDataItem?.orderPrice
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
                    />
                  ) : null}
                  {isShowSmallBtn ? (
                    <View style={styles.btnSmallContainersDiv}>
                      <View style={{width: '47%'}}>
                        <CustomBtn
                          title={textStrings.acceptBtnTxt}
                          bgColor={maincolor}
                          secColor={'white'}
                          clickfun={() => console.log('accept')}
                        />
                      </View>
                      <View style={{width: '47%'}}>
                        <CustomBtn
                          title={textStrings.editBtnTxt}
                          secColor={maincolor}
                          bgColor={'white'}
                          clickfun={() => setopenEditModal(!openEditModal)}
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
                    <View style={styles.btnSmallContainersDiv}>
                      <View style={{width: '47%'}}>
                        <CustomBtn
                          title={textStrings.completTxt}
                          bgColor={maincolor}
                          secColor={'white'}
                          clickfun={changeOrderStatusFun2}
                        />
                      </View>
                      <View style={{width: '47%'}}>
                        {deliveryStatus === 'not started' ? (
                          <CustomBtn
                            title={textStrings.startDelivery}
                            secColor={maincolor}
                            bgColor={'white'}
                            clickfun={changeDeliverStatus}
                          />
                        ) : deliveryStatus === 'started' ? (
                          <CustomBtn
                            title={textStrings.arrivedOnLocation}
                            secColor={maincolor}
                            bgColor={'white'}
                            clickfun={changeDeliverStatus}
                          />
                        ) : deliveryStatus === 'completed' ? (
                          <CustomBtn
                            title={textStrings.editBtnTxt}
                            secColor={maincolor}
                            bgColor={'white'}
                            clickfun={() => setopenEditModal(!openEditModal)}
                          />
                        ) : null}
                      </View>
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
              defaultModalValue();
            }}
            addBtnFunction={async (prod, pric, tax, balanceAmount) => {
              setisLoading(true);
              const newProducts = [...filterDataItem?.products, ...prod];
              const newPrice = filterDataItem?.orderPrice + pric;
              const newTax = parseInt(filterDataItem?.taxPrice) + parseInt(tax);
              const newTotal =
                parseInt(filterDataItem?.totalPrice) +
                parseInt(pric) +
                parseInt(tax);

              await updateOrderProductPrice(
                filterDataItem?.id,
                newProducts,
                newPrice,
                newTax,
                newTotal,
                balanceAmount,
              ).then(() => {
                setopenEditModal(!openEditModal);
                seteditModalDone(true);
                setmodalEditData({
                  battery: '',
                  tire: '',
                  supportService: '',
                  freeService: '',
                  filters: '',
                  otherOils: '',
                  engineOil: '',
                  cashBack: cashBack ? cashBack : '',
                });
              });
              // console.log('this is new price', newPrice, newTax, newTotal);
              setisLoading(false);
            }}
            oldTotalPriceValue={filterDataItem?.totalPrice}
          />
        </Modal>
        <Modal
          visible={editModalDone}
          onRequestClose={() => console.log('done')}
          transparent>
          <View style={styles.editContainer}>
            <View style={styles.editMainBtnContainer}>
              <Image
                style={styles.editImageDone}
                source={require('../assets/successicon.png')}
              />
              <Text style={TextStyles.orderstepsdesctxt}>
                {textStrings.editSccessTxtHead}
              </Text>
            </View>
          </View>
        </Modal>

        {/* New Modal for "Complete" button */}

        <CompleteOrderModal
          visible={isCompleteModalVisible}
          onClose={() => setIsCompleteModalVisible(false)}
          inputFields={inputFields}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          orderDetails={filterDataItem}
          userName={userData?.name}
        />

        {/* End of New Modal */}
      </View>
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  editImageDone: {
    height: h('10%'),
    resizeMode: 'contain',
    marginBottom: h('3%'),
  },
  editMainBtnContainer: {
    width: '90%',
    height: h('25%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  editContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
    height: h('16%'),
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: maincolor,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
