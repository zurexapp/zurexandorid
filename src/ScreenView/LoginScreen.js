// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {w, h} from 'react-native-responsiveness';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {maincolor} from '../assets/Colors';
// import AppBtn from '../Components/AppBtn';
// import LoginUprHeader from '../Components/LoginUprHeader';
// import TextStyles from '../Text/TextStyles';
// import {useTranslation} from '../Text/TextStrings';
// import {scale} from 'react-native-size-matters';
// import {checkIsUserExist,postEmployDataWithJobId,getEmployDataWithJobId} from '../DataBase/databaseFunction';
// import LoadingModal from '../Components/LoadingModal';
// import {useDispatch} from 'react-redux';
// import {setAuth} from '../store/authSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const LoginScreen = ({navigation}) => {
//   const {textStrings} = useTranslation();
//   const dispatch = useDispatch();
//   const [emailValue, setEmailValue] = useState('');
//   const [passwordValue, setPasswordValue] = useState('');
//   const [isLoading, setisLoading] = useState(false);

//   const logAllAsyncStorage = async () => {
//     try {
//       const keys = await AsyncStorage.getAllKeys();
//       const values = await AsyncStorage.multiGet(keys);

//       // Log all key-value pairs
//       values.forEach(([key, value]) => {
//         console.log(`Key: ${key}, Value: ${value}`);
//       });
//     } catch (error) {
//       console.log('Error fetching AsyncStorage values:', error);
//     }
//   };

//   useEffect(() => {
//     const getToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('deviceFCMToken');
//         console.log('Retrieved FCM Token:', token);
//       } catch (error) {
//         console.log('Error retrieving FCM token:', error);
//       }
//     };

//     getToken();
//     logAllAsyncStorage();
//   }, []);

//   const loginFunction = async () => {
//     setisLoading(true);

//     if (emailValue !== '' && passwordValue !== '') {
//       try {
//         const result = await checkIsUserExist(`${emailValue}`);
//         setisLoading(false);
//         if (result) {
//           if (result?.password === passwordValue) {
//             dispatch(setAuth({isAuth: result}));
//             await AsyncStorage.setItem('acZurexBussinessLoginUserId', `${emailValue}`);
//             const employData = await getEmployDataWithJobId(emailValue);
//             console.log('Employ Data:', employData);
//             const employKey = Object.keys(employData)[0];
//             const employInfo = employData[employKey];
//             console.log('Employ Info:', employInfo);
//             let employdeviceTokens = employInfo.deviceToken || [];
//             console.log('Employ Device Tokens:', employdeviceTokens);
//             const token = await AsyncStorage.getItem('deviceFCMToken');
//             console.log('Retrieved Token:', token);
//             if (token && !employdeviceTokens.includes(token)) {
//               employdeviceTokens.push(token);
//               await postEmployDataWithJobId(emailValue, {
//                 deviceToken: employdeviceTokens,
//               });
//               console.log('Updated Device Tokens:', employdeviceTokens);
//             }
//             navigation.replace(
//               result?.role === 'SingleTeam' ? 'signleTeamSide' :
//               result?.role === 'SingleDTeam' ? 'dedicatedTeamSide' :
//               result?.role === 'supervisor' ? 'MySideNavSuperv' :
//               result?.role === 'admin' ? 'MySideNavAdmin' :
//               'home4btn'
//             );
//           } else {
//             Alert.alert(textStrings.authErrorTitle, textStrings.passwordError);
//           }
//         } else {
//           Alert.alert(textStrings.authErrorTitle, textStrings.userDontEror);
//         }
//       } catch (error) {
//         setisLoading(false);
//         console.error('Login Error:', error);
//         Alert.alert(textStrings.authErrorTitle, textStrings.generalError);
//       }
//     } else {
//       Alert.alert(textStrings.authErrorTitle, textStrings.formFillError);
//     }
//   };

//   return (
//     <>
//       <KeyboardAwareScrollView>
//         <View style={styles.screencont}>
//           <LoginUprHeader isLanguageSwich={true} />

//           <View
//             style={{
//               width: '100%',
//               height: h('55%'),
//             }}>
//             <View
//               style={{
//                 width: '100%',
//                 height: h('40%'),
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-evenly',
//                 flexDirection: 'column',
//               }}>
//               <View>
//                 <Text style={TextStyles.loginInputheading}>
//                   {textStrings.loginInputemail}
//                 </Text>
//                 <View
//                   style={{
//                     width: '90%',
//                     height: h('7%'),
//                     alignSelf: 'center',
//                     backgroundColor: '#FBFBFB',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flexDirection: 'row',
//                     borderWidth: 1,
//                     borderColor: '#BFD0E5',
//                     borderRadius: 6,
//                     paddingHorizontal: 10,
//                   }}>
//                   <TextInput
//                     value={emailValue}
//                     onChangeText={text => setEmailValue(text)}
//                     style={{
//                       ...TextStyles.textinputfamilyclassAll,
//                       flex: 1,
//                       height: '100%',
//                       fontSize: scale(16),
//                       marginLeft: 10,
//                     }}
//                   />
//                 </View>
//               </View>
//               <View>
//                 <Text style={TextStyles.loginInputheading}>
//                   {textStrings.loginInputPassword}
//                 </Text>
//                 <View
//                   style={{
//                     width: '90%',
//                     height: h('7%'),
//                     alignSelf: 'center',
//                     backgroundColor: '#FBFBFB',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flexDirection: 'row',
//                     borderWidth: 1,
//                     borderColor: '#BFD0E5',
//                     borderRadius: 6,
//                     paddingHorizontal: 10,
//                   }}>
//                   <TextInput
//                     secureTextEntry={true}
//                     value={passwordValue}
//                     onChangeText={text => setPasswordValue(text)}
//                     style={{
//                       ...TextStyles.textinputfamilyclassAll,
//                       flex: 1,
//                       height: '100%',
//                       fontSize: h('2.6%'),
//                       marginLeft: 10,
//                     }}
//                   />
//                   <Image
//                     source={require('../assets/padlock.png')}
//                     style={styles.iconImage}
//                   />
//                 </View>
//               </View>
//               <TouchableOpacity
//                 onPress={() => console.log('hy')}
//                 style={{
//                   width: '90%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'flex-end',
//                   flexDirection: 'row',
//                   opacity: 0,
//                 }}>
//                 <Text
//                   style={{
//                     ...TextStyles.loginbotonswitchnav,
//                     color: maincolor,
//                   }}>
//                   {textStrings.forgotPassword}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <AppBtn title={textStrings.loginbtnTxt} clickfun={loginFunction} />
//           </View>
//           <View
//             style={{
//               width: '100%',
//               height: h('10%'),
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-evenly',
//               flexDirection: 'column',
//             }}></View>
//         </View>
//       </KeyboardAwareScrollView>
//       <LoadingModal visibleModal={isLoading} />
//     </>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   hadershow: {
//     width: '100%',
//     height: h('25%'),
//     position: 'relative',
//     marginBottom: h('9%'),
//   },
//   logoimg: {
//     width: w('39%'),
//     height: w('39%'),
//     resizeMode: 'contain',
//     position: 'absolute',
//     bottom: -h('11%'),
//     alignSelf: 'center',
//   },
//   screencont: {
//     width: w('100%'),
//     height: h('100%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     flexDirection: 'column',
//     backgroundColor: 'white',
//   },
//   iconImage: {
//     width: h('3.5%'),
//     height: h('3.5%'),
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {maincolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import LoginUprHeader from '../Components/LoginUprHeader';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {scale} from 'react-native-size-matters';
import {
  checkIsUserExist,
  postEmployDataWithJobId,
  getEmployDataWithJobId,
} from '../DataBase/databaseFunction';
import LoadingModal from '../Components/LoadingModal';
import {useDispatch} from 'react-redux';
import {setAuth} from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const role = await AsyncStorage.getItem('employeRole');
        if (role) {
          navigation.replace(
            role === 'SingleTeam'
              ? 'signleTeamSide'
              : role === 'SingleDTeam'
              ? 'dedicatedTeamSide'
              : role === 'supervisor'
              ? 'MySideNavSuperv'
              : role === 'admin'
              ? 'MySideNavAdmin'
              : 'home4btn',
          );
        }
      } catch (error) {
        console.log('Error checking user role:', error);
      }
    };

    setisLoading(true);
    checkRole();
    setisLoading(false);
  }, [navigation]);

  const loginFunction = async () => {
    setisLoading(true);

    if (emailValue !== '' && passwordValue !== '') {
      try {
        const result = await checkIsUserExist(`${emailValue}`);
        setisLoading(false);
        if (result) {
          if (result?.password === passwordValue) {
            dispatch(setAuth({isAuth: result}));
            await AsyncStorage.setItem(
              'acZurexBussinessLoginUserId',
              `${emailValue}`,
            );
            const employData = await getEmployDataWithJobId(emailValue);
            const employKey = Object.keys(employData)[0];
            const employInfo = employData[employKey];
            const employRole = employInfo.role;
            await AsyncStorage.setItem('employeRole', `${employRole}`);
            let employdeviceTokens = employInfo.deviceToken || [];
            console.log('Employ Device Tokens:', employdeviceTokens);
            const token = await AsyncStorage.getItem('deviceFCMToken');
            console.log('Retrieved Token:', token);
            if (token && !employdeviceTokens.includes(token)) {
              employdeviceTokens.push(token);
              await postEmployDataWithJobId(emailValue, {
                deviceToken: employdeviceTokens,
              });
              console.log('Updated Device Tokens:', employdeviceTokens);
            }
            navigation.replace(
              result?.role === 'SingleTeam'
                ? 'signleTeamSide'
                : result?.role === 'SingleDTeam'
                ? 'dedicatedTeamSide'
                : result?.role === 'supervisor'
                ? 'MySideNavSuperv'
                : result?.role === 'admin'
                ? 'MySideNavAdmin'
                : 'home4btn',
            );
          } else {
            Alert.alert(textStrings.authErrorTitle, textStrings.passwordError);
          }
        } else {
          Alert.alert(textStrings.authErrorTitle, textStrings.userDontEror);
        }
      } catch (error) {
        setisLoading(false);
        console.error('Login Error:', error);
        Alert.alert(textStrings.authErrorTitle, textStrings.generalError);
      }
    } else {
      Alert.alert(textStrings.authErrorTitle, textStrings.formFillError);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.screencont}>
          <LoginUprHeader isLanguageSwich={true} />
          <View style={{width: '100%', height: h('55%')}}>
            <View
              style={{
                width: '100%',
                height: h('40%'),
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
              }}>
              <View>
                <Text style={TextStyles.loginInputheading}>
                  {textStrings.loginInputemail}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={emailValue}
                    onChangeText={text => setEmailValue(text)}
                    style={{
                      ...TextStyles.textinputfamilyclassAll,
                      flex: 1,
                      height: '100%',
                      fontSize: scale(16),
                      marginLeft: 10,
                    }}
                  />
                </View>
              </View>
              <View>
                <Text style={TextStyles.loginInputheading}>
                  {textStrings.loginInputPassword}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    secureTextEntry={true}
                    value={passwordValue}
                    onChangeText={text => setPasswordValue(text)}
                    style={{
                      ...TextStyles.textinputfamilyclassAll,
                      flex: 1,
                      height: '100%',
                      fontSize: h('2.6%'),
                      marginLeft: 10,
                    }}
                  />
                  <Image
                    source={require('../assets/padlock.png')}
                    style={styles.iconImage}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.hiddenButton}
                onPress={() => console.log('hy')}>
                <Text
                  style={{...TextStyles.loginbotonswitchnav, color: maincolor}}>
                  {textStrings.forgotPassword}
                </Text>
              </TouchableOpacity>
            </View>
            <AppBtn title={textStrings.loginbtnTxt} clickfun={loginFunction} />
          </View>
          <View
            style={{
              width: '100%',
              height: h('10%'),
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
            }}></View>
        </View>
      </KeyboardAwareScrollView>
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

const styles = StyleSheet.create({
  screencont: {
    width: w('100%'),
    height: h('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '90%',
    height: h('7%'),
    alignSelf: 'center',
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    borderColor: '#BFD0E5',
    borderRadius: 6,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconImage: {
    width: h('3.5%'),
    height: h('3.5%'),
  },
  hiddenButton: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    opacity: 0,
  },
});

export default LoginScreen;
