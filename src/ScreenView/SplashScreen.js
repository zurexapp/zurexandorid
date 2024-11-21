// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   Image,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {w, h} from 'react-native-responsiveness';
// import {maincolor} from '../assets/Colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {checkIsUserExist} from '../DataBase/databaseFunction';
// import {useDispatch} from 'react-redux';
// import {setAuth} from '../store/authSlice';
// import LottieView from 'lottie-react-native';

// const SplashScreen = ({navigation}) => {
//   const dispatch = useDispatch();
//   const [changinlayoutVideo, setchanginlayoutVideo] = useState(true);

//   const getUserDataFun = async () => {
//     const userNumber = await AsyncStorage.getItem(
//       'acZurexBussinessLoginUserId',
//     );
//     if (userNumber) {
//       await checkIsUserExist(userNumber)
//         .then(async result => {
//           if (result) {
//             await dispatch(setAuth({isAuth: result}));

//             setTimeout(() => {
//               navigation.replace(
//                 result?.role === 'SingleTeam'
//                   ? 'signleTeamSide'
//                   : result?.role === 'SingleDTeam'
//                   ? 'dedicatedTeamSide'
//                   : result?.role === 'supervisor'
//                   ? 'MySideNavSuperv'
//                   : result?.role === 'admin'
//                   ? 'MySideNavAdmin'
//                   : 'home4btn',
//               );
//             }, 1000);
//           }
//         })
//         .catch(e => console.log('check', e));
//     } else {
//       setTimeout(() => {
//         navigation.replace('Login');
//       }, 1000);
//     }
//   };

//   useEffect(() => {
//     getUserDataFun();
//     setTimeout(() => {
//       setchanginlayoutVideo(false);
//     }, 1200);
//   }, []);

//   useEffect(() => {
//     if (changinlayoutVideo === false) {
//       setTimeout(() => {
//         navigation.replace('home4btn');
//       }, 1200);
//     }
//   }, [changinlayoutVideo]);

//   return (
//     <>
//       {changinlayoutVideo ? (
//         <View style={styles.backgroundvidoContainer}>
//           <LottieView
//             source={require('../assets/main-gift1718026714.json')}
//             autoPlay
//             loop={false}
//             style={{
//               width: '100%',
//               height: '100%',
//             }}
//           />
//         </View>
//       ) : null}

//       <ImageBackground
//         blurRadius={25}
//         style={styles.backgroundimage}
//         source={require('../assets/splashbg.png')}>
//         <Image
//           style={styles.welcomeimg}
//           source={require('../assets/welcome.png')}
//         />
//       </ImageBackground>
//     </>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   backgroundimage: {
//     width: w('100%'),
//     height: h('100%'),
//     objectFit: 'cover',
//     backgroundColor: maincolor,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   backgroundvidoContainer: {
//     width: w('100%'),
//     height: h('100%'),
//     backgroundColor: 'white',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 4000,
//     position: 'absolute',
//     top: 0,
//   },
//   welcomeimg: {
//     width: w('85%'),
//     resizeMode: 'contain',
//   },
// });

import {StyleSheet, View, ImageBackground, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import {maincolor} from '../assets/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkIsUserExist} from '../DataBase/databaseFunction';
import {useDispatch} from 'react-redux';
import {setAuth} from '../store/authSlice';
import LottieView from 'lottie-react-native';
import messaging from '@react-native-firebase/messaging';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [changinlayoutVideo, setchanginlayoutVideo] = useState(true);

  const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Device FCM Token:', token);
      await AsyncStorage.setItem('deviceFCMToken', token);
    } catch (error) {
      console.log('Error getting device FCM token:', error);
    }
  };

  const logStoredToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('deviceFCMToken');
      console.log('Stored FCM Token:', storedToken);
    } catch (error) {
      console.log('Error retrieving stored FCM token:', error);
    }
  };

  useEffect(() => {
    const getUserDataFun = async () => {
      const userNumber = await AsyncStorage.getItem(
        'acZurexBussinessLoginUserId',
      );
      if (userNumber) {
        await checkIsUserExist(userNumber)
          .then(async result => {
            if (result) {
              await dispatch(setAuth({isAuth: result}));

              setTimeout(() => {
                navigation.replace(
                  result?.role === 'SingleTeam'
                    ? 'signleTeamSide'
                    : result?.role === 'SingleDTeam'
                    ? 'dedicatedTeamSide'
                    : result?.role === 'supervisor'
                    ? 'MySideNavSuperv'
                    : result?.role === 'admin'
                    ? 'MySideNavAdmin'
                    : 'Login',
                );
              }, 1000);
            }
          })
          .catch(e => console.log('check', e));
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 1000);
      }
    };
    getDeviceToken();
    logStoredToken();
    getUserDataFun();
    setTimeout(() => {
      setchanginlayoutVideo(false);
    }, 1200);
  }, [dispatch, navigation]);

  useEffect(() => {
    if (!changinlayoutVideo) {
      setTimeout(() => {
        navigation.replace('Login');
      }, 1200);
    }
  }, [changinlayoutVideo, navigation]);

  return (
    <>
      {changinlayoutVideo ? (
        <View style={styles.backgroundvidoContainer}>
          <LottieView
            source={require('../assets/main-gift1718026714.json')}
            autoPlay
            loop={false}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      ) : null}

      <ImageBackground
        blurRadius={25}
        style={styles.backgroundimage}
        source={require('../assets/splashbg.png')}>
        <Image
          style={styles.welcomeimg}
          source={require('../assets/welcome.png')}
        />
      </ImageBackground>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  backgroundimage: {
    width: w('100%'),
    height: h('100%'),
    objectFit: 'cover',
    backgroundColor: maincolor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundvidoContainer: {
    width: w('100%'),
    height: h('100%'),
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4000,
    position: 'absolute',
    top: 0,
  },
  welcomeimg: {
    width: w('85%'),
    resizeMode: 'contain',
  },
});
