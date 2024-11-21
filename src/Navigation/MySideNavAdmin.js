import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../Components/CustomDrawer';
import ContactScreen from '../ScreenView/ContactScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import AcZurexHomeScreen from '../ScreenView/AcZurexHomeScreen';
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
const MySideNavAdmin = () => {
  const {textStrings} = useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer username={'Admin'} {...props} />}
      initialRouteName="NewHome"
      screenOptions={{headerShown: false, drawerLabel: false}}>
      <Drawer.Screen
        name="NewHome"
        options={{
          drawerLabel: 'home',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.homeTxtBtn}
              imageLink={require('../assets/homeicon.png')}
            />
          ),
        }}
        component={AcZurexHomeScreen}
      />
    </Drawer.Navigator>
  );
};

export default MySideNavAdmin;

const styles = StyleSheet.create({});
