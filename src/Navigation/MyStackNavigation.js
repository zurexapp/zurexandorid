import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../ScreenView/SplashScreen';
import LoginScreen from '../ScreenView/LoginScreen';
import SignUpScreen from '../ScreenView/SignUpScreen';
import OrderDetailScreen from '../ScreenView/OrderDetailScreen';
import Home4btnScreen from '../ScreenView/Home4btnScreen';
import TrackingOrderScreen from '../ScreenView/TrackingOrderScreen';
import OrderDetail0StepScreen from '../ScreenView/OrderDetail0StepScreen';
import MySideNavigationDTeam from './MySideNavigationDTeam';
import MySideNavigation from './MySideNavigation';
import ByCarScreen from '../ScreenView/ByCarScreen';
import ByCityScreen from '../ScreenView/ByCityScreen';
import ByNeighborHod from '../ScreenView/ByNeighborHod';
import ByOrderRevenueScreen from '../ScreenView/ByOrderRevenueScreen';
import ByOrderScreen from '../ScreenView/ByOrderScreen';
import ServicesScreen from '../ScreenView/ServicesScreen';
import BatteriesServiceScreen from '../ScreenView/BatteriesServiceScreen';
import BSupportScreen from '../ScreenView/BSupportScreen';
import RattinSupervisorScreen from '../ScreenView/RattinSupervisorScreen';
import RattinTeamScreen from '../ScreenView/RattinTeamScreen';
import OrderStatScreen from '../ScreenView/OrderStatScreen';
import RevenueStatScreen from '../ScreenView/RevenueStatScreen';
import TeamPerformScreen from '../ScreenView/TeamPerformScreen';
import TeamNameScreen from '../ScreenView/TeamNameScreen';
import HomeTeamScreen from '../ScreenView/HomeTeamScreen';
import MySideNavSuperv from './MySideNavSuperv';
import MySideNavAdmin from './MySideNavAdmin';
import MyOrderNwDup from '../ScreenView/MyOrderNwDup';
import AcZurexHomeScreen from '../ScreenView/AcZurexHomeScreen';
import SupervisorPerformScreen from '../ScreenView/SupervisorPerformScreen';

const Stack = createNativeStackNavigator();

const MyStackNavigation = () => {
  const resultParm = {
    hideList: false,
    hideRatting: true,
    hideReasonInput: true,
    hideTwoSmallBtn: true,
    hideSingleBtn: false,
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Splash'}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{routeName: null}}
      />
      <Stack.Screen name="home4btn" component={Home4btnScreen} />
      <Stack.Screen name="signleTeamSide" component={MySideNavigation} />
      <Stack.Screen
        name="dedicatedTeamSide"
        component={MySideNavigationDTeam}
      />
      <Stack.Screen name="MySideNavSuperv" component={MySideNavSuperv} />
      <Stack.Screen name="MySideNavAdmin" component={MySideNavAdmin} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        initialParams={{routeName: null}}
      />
      <Stack.Screen name="orderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen
        name="orderDetailScreen0"
        component={OrderDetail0StepScreen}
        initialParams={resultParm}
      />
      <Stack.Screen
        name="TrackingOrderScreen"
        component={TrackingOrderScreen}
        initialParams={{latitude: 0, longitude: 0}}
      />
      <Stack.Screen name="ByCarScreen" component={ByCarScreen} />
      <Stack.Screen name="ByCityScreen" component={ByCityScreen} />
      <Stack.Screen name="ByNeighborHod" component={ByNeighborHod} />
      <Stack.Screen
        name="ByOrderRevenueScreen"
        component={ByOrderRevenueScreen}
      />
      <Stack.Screen name="ByOrderScreen" component={ByOrderScreen} />
      <Stack.Screen name="MyOrderNwDup" component={MyOrderNwDup} />
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
      <Stack.Screen
        name="BatteriesServiceScreen"
        component={BatteriesServiceScreen}
      />
      <Stack.Screen name="BSupportScreen" component={BSupportScreen} />
      <Stack.Screen
        name="RattinSupervisorScreen"
        component={RattinSupervisorScreen}
      />
      <Stack.Screen name="RattinTeamScreen" component={RattinTeamScreen} />
      <Stack.Screen name="OrderStatScreen" component={OrderStatScreen} />
      <Stack.Screen name="RevenueStatScreen" component={RevenueStatScreen} />
      <Stack.Screen
        name="TeamPerformScreen"
        component={TeamPerformScreen}
        initialParams={{teamId: ''}}
      />
      <Stack.Screen
        name="TeamNameScreen"
        component={TeamNameScreen}
        initialParams={{teamId: ''}}
      />
      <Stack.Screen name="HomeTeamScreen" component={HomeTeamScreen} />
      <Stack.Screen
        name="SupervisorPerformScreen"
        component={SupervisorPerformScreen}
      />

      {/*not required Screen*/}
    </Stack.Navigator>
  );
};

export default MyStackNavigation;
