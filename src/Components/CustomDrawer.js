// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from '@react-navigation/drawer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {useNavigation} from '@react-navigation/native';
// import AwesomeAlert from 'react-native-awesome-alerts';
// import {postEmployDataWithJobId,getEmployDataWithJobId} from '../DataBase/databaseFunction';
// import {w, h} from 'react-native-responsiveness';
// import {textcolor, redcolor} from '../assets/Colors';
// import TextStyles from '../Text/TextStyles';
// import {useTranslation} from '../Text/TextStrings';
// import {useDispatch} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {setAuth} from '../store/authSlice';

// const CustomDrawer = ({pathName, username, ...otherProps}) => {
//   const {textStrings} = useTranslation();
//   const navigation = otherProps.navigation;
//   const [showAlert, setshowAlert] = useState(false);
//   const dispatch = useDispatch();
//   console.log(otherProps);

//   const logoutFun = async () => {
//     try {
//       const employId = await AsyncStorage.getItem('acZurexBussinessLoginUserId');
//       const dtoken = await AsyncStorage.getItem('deviceFCMToken');
//       console.log('employId:', employId);
//       console.log('dtoken:', dtoken);

//       if (employId && dtoken) {
//         const employData = await getEmployDataWithJobId(employId);
//         if (!employData) {
//           console.log('No employData found for employId:', employId);
//           return;
//         }

//         const employDataObj = Object.values(employData)[0];
//         console.log('Extracted employDataObj:', employDataObj);

//         let employdeviceTokens = employDataObj.deviceToken || [];

//         if (!Array.isArray(employdeviceTokens)) {
//           console.log('deviceToken is not an array:', employdeviceTokens);
//           employdeviceTokens = [];
//         }

//         if (employdeviceTokens.includes(dtoken)) {
//           employdeviceTokens = employdeviceTokens.filter(token => token !== dtoken);
//           await postEmployDataWithJobId(employId, {
//             deviceToken: employdeviceTokens,
//           });
//         } else {
//           console.log('dtoken not found in employdeviceTokens:', dtoken);
//         }
//       } else {
//         console.log('employId or dtoken is missing');
//       }

//       dispatch(setAuth({isAuth: {}}));
//       await AsyncStorage.removeItem('acZurexBussinessLoginUserId');
//       navigation.replace('Login');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };
//   return (
//     <View style={{flex: 1}}>
//       <DrawerContentScrollView {...otherProps}>
//         <TouchableOpacity
//           onPress={() => {
//             if (pathName) {
//               navigation.navigate(pathName);
//             } else {
//               console.log('hy');
//             }
//           }}
//           style={{
//             width: w('71.5%'),
//             height: h('15%'),
//             position: 'relative',
//           }}>
//           <Image
//             source={require('../assets/Header.png')}
//             style={{
//               width: '100%',
//               height: h('18%'),
//               resizeMode: 'contain',
//               position: 'absolute',
//               top: -h('3%'),
//             }}
//           />
//           <View
//             style={{
//               width: '100%',
//               height: h('9%'),
//               display: 'flex',
//               justifyContent: 'space-around',
//               alignItems: 'center',
//               flexDirection: 'row',
//             }}>
//             <View
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 flexDirection: 'row',
//                 paddingLeft: w('2%'),
//               }}>
//               <View
//                 style={{
//                   flex: 1,
//                   marginRight: 10,
//                   marginLeft: h('2%'),
//                   overflow: 'hidden',
//                 }}>
//                 <Text style={TextStyles.profilenamedrawertxt}>{username}</Text>
//               </View>
//               <View
//                 style={{
//                   width: '20%',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 {pathName ? (
//                   <AntDesign name="right" size={h('3%')} color="#c0c0c0" />
//                 ) : null}
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
//           <DrawerItemList {...otherProps} />
//         </View>
//       </DrawerContentScrollView>
//       <View
//         style={{
//           height: h('12%'),
//         }}>
//         <TouchableOpacity
//           style={{
//             width: '87%',
//             height: h('5%'),
//             alignSelf: 'center',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'row',
//           }}
//           onPress={() => {
//             logoutFun()
//             // setshowAlert(!showAlert);
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               width: '100%',
//             }}>
//             <View
//               style={{
//                 height: h('4%'),
//                 width: h('4%'),
//                 borderRadius: h('5%'),
//                 backgroundColor: redcolor,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginRight: w('1.5%'),
//               }}>
//               <Ionicons name="power" size={h('2.3%')} color="white" />
//             </View>
//             <Text style={TextStyles.drwerlogouttxt}>
//               {textStrings.logoutBtnTxt}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//       <AwesomeAlert
//         show={showAlert}
//         showProgress={false}
//         title={textStrings.logoutAlertMsg}
//         closeOnTouchOutside={true}
//         closeOnHardwareBackPress={false}
//         showCancelButton={true}
//         showConfirmButton={true}
//         cancelText={textStrings.logoutYesTxt}
//         confirmText={textStrings.logoutNoTxt}
//         confirmButtonColor="transparent"
//         onCancelPressed={logoutFun}
//         onConfirmPressed={() => {
//           setshowAlert(false);
//         }}
//         confirmButtonTextStyle={{color: textcolor, fontSize: h('2.3%')}}
//         cancelButtonColor="transparent"
//         cancelButtonTextStyle={{color: redcolor, fontSize: h('2.3%')}}
//         cancelButtonStyle={{marginRight: h('10%')}}
//       />
//     </View>
//   );
// };

// export default CustomDrawer;

import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  postEmployDataWithJobId,
  getEmployDataWithJobId,
} from '../DataBase/databaseFunction';
import {w, h} from 'react-native-responsiveness';
import {textcolor, redcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuth} from '../store/authSlice';

const CustomDrawer = ({pathName, username, ...otherProps}) => {
  const {textStrings} = useTranslation();
  const navigation = otherProps.navigation;
  const [showAlert, setshowAlert] = useState(false);
  const dispatch = useDispatch();

  const logoutFun = async () => {
    try {
      const employId = await AsyncStorage.getItem(
        'acZurexBussinessLoginUserId',
      );
      const dtoken = await AsyncStorage.getItem('deviceFCMToken');
      console.log('employId:', employId);
      console.log('dtoken:', dtoken);

      if (employId && dtoken) {
        const employData = await getEmployDataWithJobId(employId);
        if (!employData) {
          console.log('No employData found for employId:', employId);
          return;
        }

        const employDataObj = Object.values(employData)[0];
        console.log('Extracted employDataObj:', employDataObj);

        let employdeviceTokens = employDataObj.deviceToken || [];

        if (!Array.isArray(employdeviceTokens)) {
          console.log('deviceToken is not an array:', employdeviceTokens);
          employdeviceTokens = [];
        }

        if (employdeviceTokens.includes(dtoken)) {
          employdeviceTokens = employdeviceTokens.filter(
            token => token !== dtoken,
          );
          await postEmployDataWithJobId(employId, {
            deviceToken: employdeviceTokens,
          });
        } else {
          console.log('dtoken not found in employdeviceTokens:', dtoken);
        }
      } else {
        console.log('employId or dtoken is missing');
      }

      dispatch(setAuth({isAuth: {}}));

      // Clear all AsyncStorage data
      await AsyncStorage.clear();
      console.log('Cleared all AsyncStorage data');

      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...otherProps}>
        <TouchableOpacity
          onPress={() => {
            if (pathName) {
              navigation.navigate(pathName);
            }
          }}
          style={{
            width: w('71.5%'),
            height: h('15%'),
            position: 'relative',
          }}>
          <Image
            source={require('../assets/Header.png')}
            style={{
              width: '100%',
              height: h('18%'),
              resizeMode: 'contain',
              position: 'absolute',
              top: -h('3%'),
            }}
          />
          <View
            style={{
              width: '100%',
              height: h('9%'),
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: w('2%'),
              }}>
              <Text style={TextStyles.profilenamedrawertxt}>{username}</Text>
              {pathName && (
                <AntDesign name="right" size={h('3%')} color="#c0c0c0" />
              )}
            </View>
          </View>
        </TouchableOpacity>

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...otherProps} />
        </View>
      </DrawerContentScrollView>
      <View style={{height: h('12%')}}>
        <TouchableOpacity
          style={{
            width: '87%',
            height: h('5%'),
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
          onPress={logoutFun}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <View
              style={{
                height: h('4%'),
                width: h('4%'),
                borderRadius: h('5%'),
                backgroundColor: redcolor,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: w('1.5%'),
              }}>
              <Ionicons name="power" size={h('2.3%')} color="white" />
            </View>
            <Text style={TextStyles.drwerlogouttxt}>
              {textStrings.logoutBtnTxt}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={textStrings.logoutAlertMsg}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={textStrings.logoutYesTxt}
        confirmText={textStrings.logoutNoTxt}
        confirmButtonColor="transparent"
        onCancelPressed={logoutFun}
        onConfirmPressed={() => setshowAlert(false)}
        confirmButtonTextStyle={{color: textcolor, fontSize: h('2.3%')}}
        cancelButtonColor="transparent"
        cancelButtonTextStyle={{color: redcolor, fontSize: h('2.3%')}}
        cancelButtonStyle={{marginRight: h('10%')}}
      />
    </View>
  );
};

export default CustomDrawer;
