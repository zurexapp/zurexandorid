// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   Platform,
//   SafeAreaView,
//   StatusBar,
//   Text,
//   View,
//   useColorScheme,
// } from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import MyStackNavigation from './src/Navigation/MyStackNavigation';
// import {NavigationContainer} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   setBatteryCompaniesData,
//   setBatteryData,
//   setCashBack,
//   setFiltersDta,
//   setFreeServices,
//   setMyOrdersData,
//   setOilCompaniesData,
//   setOilsData,
//   setEngineOilPetrolData,
//   setSupportServicesData,
//   setTireCompaniesData,
//   setTireData,
//   setCityArr,
//   setNeighborArr,
//   setEmploysData,
//   setEngineOilData,
// } from './src/store/projectSlice';
// import {
//   database,
//   getAllOrders,
//   getCashBackData,
//   getDataWholeCollection,
//   updateCurrentLocation,
// } from './src/DataBase/databaseFunction';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {setIsArabicLanguage} from './src/store/authSlice';
// import GetLocation from 'react-native-get-location';
// import TextStyles from './src/Text/TextStyles';
// import {useTranslation} from './src/Text/TextStrings';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// function App(): JSX.Element {
//   const {textStrings} = useTranslation();
//   const [location, setLocation] = useState<any>(null);
//   const [error, setError] = useState<any>(null);
//   const isDarkMode = useColorScheme() === 'dark';
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : '#ffffff',
//   };

//   const dispatch = useDispatch();
//   const {isAuth} = useSelector((state: any) => state.auth);

//   useEffect(() => {
//     checkLocationPermission();
//     getAllOtherData();
//     database()
//       .ref('/orders')
//       .on('value', async onSnapshot => {
//         const value = await onSnapshot.val();
//         let returnArr: any = [];
//         Object.entries(value).forEach((dat: any) => {
//           returnArr.push({id: dat[0], ...dat[1]});
//         });
//         dispatch(setMyOrdersData({myOrdersData: returnArr}));
//       });
//   }, []);

//   useEffect(() => {
//     if (isAuth?.userId) {
//       getAllMyOrders();
//       const intervalId = setInterval(() => {
//         uploadCurrentLocation();
//       }, 1800000); // 30 minutes interval

//       return () => clearInterval(intervalId);
//     }
//   }, [isAuth]);

//   const checkLocationPermission = async () => {
//     try {
//       const result = await check(
//         Platform.OS === 'ios'
//           ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//           : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       );

//       console.log('Permission check result:', result);

//       if (result === RESULTS.GRANTED) {
//         // Location permission is granted, check GPS status
//         checkGpsStatus();
//       } else if (result === RESULTS.DENIED) {
//         // Permission is denied but requestable
//         requestLocationPermission();
//       } else {
//         // Permission is permanently denied or restricted
//         setError(textStrings.locationPermissionDenied);
//       }
//     } catch (err) {
//       console.error('Error checking location permission:', err);
//     }
//   };

//   const requestLocationPermission = async () => {
//     try {
//       const result = await request(
//         Platform.OS === 'ios'
//           ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//           : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       );

//       console.log('Permission request result:', result);

//       if (result === RESULTS.GRANTED) {
//         // Location permission granted, check GPS status
//         checkGpsStatus();
//       } else {
//         setError(textStrings.locationPermissionDenied);
//       }
//     } catch (err) {
//       console.error('Error requesting location permission:', err);
//     }
//   };

//   const checkGpsStatus = () => {
//     GetLocation.getCurrentPosition({
//       enableHighAccuracy: true,
//       timeout: 15000,
//     })
//       .then(location => {
//         console.log('Location retrieved:', location);
//         setLocation(location);
//       })
//       .catch(error => {
//         console.error('Error getting location:', error);
//         setError(error.message);
//         promptToEnableGps();
//       });
//   };

//   const promptToEnableGps = () => {
//     if (Platform.OS === 'android') {
//       setError(textStrings.gpsDisabled);
//     }
//   };

//   const getAllMyOrders = async () => {
//     const getMyOrdersResult = await getAllOrders();
//     dispatch(setMyOrdersData({myOrdersData: getMyOrdersResult}));
//   };

//   const getAllOtherData = async () => {
//     const langReslt = await AsyncStorage.getItem('ac-zuex-client-language');
//     dispatch(
//       setIsArabicLanguage({
//         isArabicLanguage: langReslt
//           ? langReslt === 'arabic'
//             ? true
//             : false
//           : false,
//       }),
//     );
//     const BatteryCompanies = await getDataWholeCollection('BatteryCompanies');
//     dispatch(setBatteryCompaniesData({batteryCompaniesData: BatteryCompanies}));
//     const filters = await getDataWholeCollection('Filters');
//     dispatch(setFiltersDta({filtersData: filters}));
//     const OilCompanies = await getDataWholeCollection('OilCompanies');
//     dispatch(setOilCompaniesData({oilCompaniesData: OilCompanies}));
//     const Oils = await getDataWholeCollection('Oils');
//     dispatch(setOilsData({oilsData: Oils}));
//     const TireCompanies = await getDataWholeCollection('TireCompanies');
//     dispatch(setTireCompaniesData({tireCompaniesData: TireCompanies}));
//     const Tyres = await getDataWholeCollection('Tyres');
//     dispatch(setTireData({tireData: Tyres}));
//     const btteries = await getDataWholeCollection('btteries');
//     dispatch(setBatteryData({batteryData: btteries}));
//     const engineOilDataRaw = await getDataWholeCollection('engineOil');
//     dispatch(setEngineOilData({engineOilData: engineOilDataRaw}));

//     const engineOilPetrol = await getDataWholeCollection('engineOilPetrol');
//     dispatch(setEngineOilPetrolData({engineOilPetrolData: engineOilPetrol}));

//     const support = await getDataWholeCollection('SupportServices');
//     dispatch(setSupportServicesData({supportServicesData: support}));
//     const fsupport = await getDataWholeCollection('FreeServices');
//     dispatch(setFreeServices({freeServices: fsupport}));
//     const ctyArr = await getDataWholeCollection('OrderCity');
//     dispatch(setCityArr({cityArr: ctyArr}));
//     const neigborArr = await getDataWholeCollection('NeighborHodCity');
//     dispatch(setNeighborArr({neighborArr: neigborArr}));
//     const cashback = await getCashBackData();
//     dispatch(setCashBack({cashBack: cashback.val()}));
//     const newTeamsDara = await getDataWholeCollection('employ');
//     dispatch(setEmploysData({employsData: newTeamsDara}));
//   };

//   const uploadCurrentLocation = async () => {
//     if (location?.latitude && location?.longitude && isAuth?.userId) {
//       console.log('Uploading location:', location);
//       await updateCurrentLocation(
//         isAuth?.userId,
//         location?.latitude,
//         location?.longitude,
//       );
//     }
//   };

//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <NavigationContainer>
//         <SafeAreaView style={{...backgroundStyle, flex: 1}}>
//           <StatusBar
//             barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//             backgroundColor={'transparent'}
//           />
//           {location ? (
//             <MyStackNavigation />
//           ) : (
//             <View
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexDirection: 'column',
//                 position: 'relative',
//               }}>
//               <Image
//                 source={require('./src/assets/logo.png')}
//                 style={{
//                   resizeMode: 'contain',
//                   position: 'absolute',
//                   top: 40,
//                   alignSelf: 'center',
//                   width: 200,
//                   height: 100,
//                 }}
//               />
//               {error ? (
//                 <Text
//                   style={{
//                     ...TextStyles.ordercompletemaintxt,
//                     textAlign: 'center',
//                     width: '75%',
//                     alignSelf: 'center',
//                   }}>
//                   {error}
//                 </Text>
//               ) : (
//                 <Text
//                   style={{
//                     ...TextStyles.ordercompletemaintxt,
//                     textAlign: 'center',
//                     width: '75%',
//                     alignSelf: 'center',
//                   }}>
//                   {/* {textStrings.locationLoading} */}
//                 </Text>
//               )}
//             </View>
//           )}
//         </SafeAreaView>
//       </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// }

// export default App;

import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MyStackNavigation from './src/Navigation/MyStackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBatteryCompaniesData,
  setBatteryData,
  setCashBack,
  setFiltersDta,
  setFreeServices,
  setMyOrdersData,
  setOilCompaniesData,
  setOilsData,
  setEngineOilPetrolData,
  setSupportServicesData,
  setTireCompaniesData,
  setTireData,
  setCityArr,
  setNeighborArr,
  setEmploysData,
  setEngineOilData,
} from './src/store/projectSlice';
import {
  database,
  getAllOrders,
  getCashBackData,
  getDataWholeCollection,
  updateCurrentLocation,
} from './src/DataBase/databaseFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsArabicLanguage} from './src/store/authSlice';
import GetLocation from 'react-native-get-location';
import TextStyles from './src/Text/TextStyles';
import {useTranslation} from './src/Text/TextStrings';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

function App(): JSX.Element {
  const {textStrings} = useTranslation();
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#ffffff',
  };

  const dispatch = useDispatch();
  const {isAuth} = useSelector((state: any) => state.auth);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        console.log('Permission request result:', result);

        if (result === RESULTS.GRANTED) {
          // Location permission granted, check GPS status
          checkGpsStatus();
        } else {
          setError(textStrings.locationPermissionDenied);
        }
      } catch (err) {
        console.error('Error requesting location permission:', err);
      }
    };

    const promptToEnableGps = () => {
      if (Platform.OS === 'android') {
        setError(textStrings.gpsDisabled);
      }
    };

    const checkGpsStatus = () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          console.log('Location retrieved:', location);
          setLocation(location);
        })
        .catch(error => {
          console.error('Error getting location:', error);
          setError(error.message);
          promptToEnableGps();
        });
    };

    const checkLocationPermission = async () => {
      try {
        const result = await check(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        console.log('Permission check result:', result);

        if (result === RESULTS.GRANTED) {
          // Location permission is granted, check GPS status
          checkGpsStatus();
        } else if (result === RESULTS.DENIED) {
          // Permission is denied but requestable
          requestLocationPermission();
        } else {
          // Permission is permanently denied or restricted
          setError(textStrings.locationPermissionDenied);
        }
      } catch (err) {
        console.error('Error checking location permission:', err);
      }
    };

    const getAllOtherData = async () => {
      const langReslt = await AsyncStorage.getItem('ac-zuex-client-language');
      dispatch(
        setIsArabicLanguage({
          isArabicLanguage: langReslt
            ? langReslt === 'arabic'
              ? true
              : false
            : false,
        }),
      );
      const BatteryCompanies = await getDataWholeCollection('BatteryCompanies');
      dispatch(
        setBatteryCompaniesData({batteryCompaniesData: BatteryCompanies}),
      );
      const filters = await getDataWholeCollection('Filters');
      dispatch(setFiltersDta({filtersData: filters}));
      const OilCompanies = await getDataWholeCollection('OilCompanies');
      dispatch(setOilCompaniesData({oilCompaniesData: OilCompanies}));
      const Oils = await getDataWholeCollection('Oils');
      dispatch(setOilsData({oilsData: Oils}));
      const TireCompanies = await getDataWholeCollection('TireCompanies');
      dispatch(setTireCompaniesData({tireCompaniesData: TireCompanies}));
      const Tyres = await getDataWholeCollection('Tyres');
      dispatch(setTireData({tireData: Tyres}));
      const btteries = await getDataWholeCollection('btteries');
      dispatch(setBatteryData({batteryData: btteries}));
      const engineOilDataRaw = await getDataWholeCollection('engineOil');
      dispatch(setEngineOilData({engineOilData: engineOilDataRaw}));

      const engineOilPetrol = await getDataWholeCollection('engineOilPetrol');
      dispatch(setEngineOilPetrolData({engineOilPetrolData: engineOilPetrol}));

      const support = await getDataWholeCollection('SupportServices');
      dispatch(setSupportServicesData({supportServicesData: support}));
      const fsupport = await getDataWholeCollection('FreeServices');
      dispatch(setFreeServices({freeServices: fsupport}));
      const ctyArr = await getDataWholeCollection('OrderCity');
      dispatch(setCityArr({cityArr: ctyArr}));
      const neigborArr = await getDataWholeCollection('NeighborHodCity');
      dispatch(setNeighborArr({neighborArr: neigborArr}));
      const cashback = await getCashBackData();
      dispatch(setCashBack({cashBack: cashback.val()}));
      const newTeamsDara = await getDataWholeCollection('employ');
      dispatch(setEmploysData({employsData: newTeamsDara}));
    };

    checkLocationPermission();
    getAllOtherData();
    database()
      .ref('/orders')
      .on('value', async onSnapshot => {
        const value = await onSnapshot.val();
        let returnArr: any = [];
        Object.entries(value).forEach((dat: any) => {
          returnArr.push({id: dat[0], ...dat[1]});
        });
        dispatch(setMyOrdersData({myOrdersData: returnArr}));
      });
  }, [dispatch, textStrings.locationPermissionDenied, textStrings.gpsDisabled]);

  useEffect(() => {
    if (isAuth?.userId) {
      const uploadCurrentLocation = async () => {
        if (location?.latitude && location?.longitude && isAuth?.userId) {
          console.log('Uploading location:', location);
          await updateCurrentLocation(
            isAuth?.userId,
            location?.latitude,
            location?.longitude,
          );
        }
      };
      const getAllMyOrders = async () => {
        const getMyOrdersResult = await getAllOrders();
        dispatch(setMyOrdersData({myOrdersData: getMyOrdersResult}));
      };

      getAllMyOrders();
      const intervalId = setInterval(() => {
        uploadCurrentLocation();
      }, 1800000); // 30 minutes interval

      return () => clearInterval(intervalId);
    }
  }, [isAuth, dispatch, location]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <SafeAreaView style={{...backgroundStyle, flex: 1}}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={'transparent'}
          />
          {location ? (
            <MyStackNavigation />
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                position: 'relative',
              }}>
              <Image
                source={require('./src/assets/logo.png')}
                style={{
                  resizeMode: 'contain',
                  position: 'absolute',
                  top: 40,
                  alignSelf: 'center',
                  width: 200,
                  height: 100,
                }}
              />
              {error ? (
                <Text
                  style={{
                    ...TextStyles.ordercompletemaintxt,
                    textAlign: 'center',
                    width: '75%',
                    alignSelf: 'center',
                  }}>
                  {error}
                </Text>
              ) : (
                <Text
                  style={{
                    ...TextStyles.ordercompletemaintxt,
                    textAlign: 'center',
                    width: '75%',
                    alignSelf: 'center',
                  }}>
                  {/* {textStrings.locationLoading} */}
                </Text>
              )}
            </View>
          )}
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
