import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import PhoneInput from 'react-native-phone-number-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {maincolor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import LoginUprHeader from '../Components/LoginUprHeader';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const SignUpScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const {routeName} = route?.params;
  const navRoute = routeName
    ? () => navigation.navigate(`${routeName}`)
    : () => navigation.navigate('MyCarsAddScreen');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isRemember, setisRemember] = useState(false);
  const phoneInput = useRef();
  return (
    <KeyboardAwareScrollView>
      <View style={styles.screencont}>
        <LoginUprHeader imgSrc={require('../assets/createacc.png')}>
          <Text style={TextStyles.signupmaintxt}>{textStrings.createTxt}</Text>
        </LoginUprHeader>

        <View
          style={{
            width: '100%',
            height: h('55%'),
          }}>
          <View
            style={{
              width: '100%',
              height: h('40%'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
            }}>
            <View>
              <Text style={TextStyles.loginInputheading}>
                {textStrings.userNameTxt}
              </Text>
              <View
                style={{
                  width: '90%',
                  height: h('7%'),
                  alignSelf: 'center',
                  backgroundColor: '#FBFBFB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#BFD0E5',
                  borderRadius: 6,
                  paddingHorizontal: 10,
                }}>
                <Icon2
                  name="person-outline"
                  size={h('3.5%')}
                  color={textcolor}
                />
                <TextInput
                  style={{
                    ...TextStyles.textinputfamilyclassAll,
                    flex: 1,
                    height: '100%',
                    fontSize: h('2.6%'),
                    marginLeft: 10,
                  }}
                />
              </View>
            </View>
            <View>
              <Text style={TextStyles.loginInputheading}>
                {textStrings.loginInputFieldTxt1}
              </Text>
              <View
                style={{
                  width: '90%',
                  height: h('7%'),
                  alignSelf: 'center',
                  backgroundColor: '#FBFBFB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#BFD0E5',
                  borderRadius: 6,
                  paddingHorizontal: 10,
                }}>
                <Icon name="mobile1" size={h('3.5%')} color={textcolor} />

                <View
                  style={{
                    flex: 1,
                    height: '100%',
                    fontSize: h('2.6%'),
                  }}>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={`${value}`}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      paddingVertical: 0,
                    }}
                    textInputStyle={{
                      backgroundColor: 'transparent',
                      marginVertical: 0,
                    }}
                    textContainerStyle={{
                      paddingVertical: 0,
                      paddingLeft: 4,
                      paddingRight: 4,
                    }}
                    defaultCode="DM"
                    layout="second"
                    onChangeText={text => {
                      setValue(text);
                    }}
                    onChangeFormattedText={text => {
                      setFormattedValue(text);
                    }}
                    placeholder={textStrings.loginInputFieldTxt1}
                    withDarkTheme
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setisRemember(!isRemember)}
              style={{
                width: '90%',
                height: h('7%'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: h('5%'),
                  height: h('5%'),
                  borderWidth: 1,
                  borderColor: '#BFD0E5',
                  borderRadius: 5,
                  backgroundColor: isRemember ? maincolor : 'white',
                }}
              />
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={TextStyles.signupagreetxt}>
                  {textStrings.agreeToTxt}{' '}
                  <Text style={TextStyles.signupagreetxtunder}>
                    {textStrings.privcymTxt}
                  </Text>{' '}
                  {textStrings.andTitleTxt}{' '}
                  <Text style={TextStyles.signupagreetxtunder}>
                    {textStrings.termOfUseTxt}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <AppBtn title={textStrings.loginBtnTxt} clickfun={navRoute} />
        </View>
        <View
          style={{
            width: '100%',
            height: h('10%'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
          }}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{
              width: '75%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
            }}>
            <Text style={TextStyles.loginbotonswitchnav}>
              {textStrings.haveAnAccountTxt}{' '}
              <Text style={TextStyles.signupagreetxtunder}>
                {textStrings.loginBtnTxt}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  hadershow: {
    width: '100%',
    height: h('25%'),
    position: 'relative',
    marginBottom: h('9%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logoimg: {
    width: w('39%'),
    height: w('39%'),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -h('11%'),
    alignSelf: 'center',
  },
  screencont: {
    width: w('100%'),
    height: h('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
