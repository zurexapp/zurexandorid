import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../Components/CustomDrawer';
import BalanceScreen from '../ScreenView/BalanceScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import MyOrderNewScreen from '../ScreenView/MyOrderNewScreen';
import SupervisorHomeScreen from '../ScreenView/SupervisorHomeScreen';
import ContactAdmin from '../ScreenView/ContactAdmin';
const Drawer = createDrawerNavigator();
const CustomIconCont = ({label, imageLink}) => {
  return (
    <View
      style={{
        width: '100%',
        height: h('5%'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Image
        style={{height: '100%', resizeMode: 'contain'}}
        source={imageLink}
      />
      <View
        style={{
          width: '90%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingLeft: w('2%'),
        }}>
        <Text style={TextStyles.sidenavebtntxt}>{label}</Text>
        <AntDesign name="right" size={h('3%')} color="#c0c0c0" />
      </View>
    </View>
  );
};
const MySideNavSuperv = () => {
  const {textStrings} = useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawer username={textStrings.superBtnTxt} {...props} />
      )}
      initialRouteName="SupervisorHomeScreen"
      screenOptions={{headerShown: false, drawerLabel: false}}>
      <Drawer.Screen
        name="SupervisorHomeScreen"
        options={{
          drawerLabel: 'SupervisorHomeScreen',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.homeTxtBtn}
              imageLink={require('../assets/homeicon.png')}
            />
          ),
        }}
        component={SupervisorHomeScreen}
      />
      <Drawer.Screen
        name="Balance"
        options={{
          drawerLabel: 'Balance',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.balanceBtnTxt}
              imageLink={require('../assets/blanceicon.png')}
            />
          ),
        }}
        component={BalanceScreen}
      />

      <Drawer.Screen
        name="ContactUs"
        options={{
          drawerLabel: 'ContactUs',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.contactUsAdminBtnTxt}
              imageLink={require('../assets/conatctusicon.png')}
            />
          ),
        }}
        component={ContactAdmin}
      />
    </Drawer.Navigator>
  );
};

export default MySideNavSuperv;

const styles = StyleSheet.create({});
