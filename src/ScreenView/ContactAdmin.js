import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {borderColor, greencolor, maincolor, textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {getSupervisor} from '../DataBase/databaseFunction';
import LoadingModal from '../Components/LoadingModal';
const ContactAdmin = ({navigation}) => {
  const {textStrings} = useTranslation();
  const [modalOpen, setmodalOpen] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [superviosrData, setsuperviosrData] = useState(null);

  const closeTogle = () => {
    navigation.toggleDrawer();
  };
  useEffect(() => {
    setmodalOpen(true);
  }, []);
  const getContactData = async () => {
    setisLoading(true);
    const check = await getSupervisor('admin');
    setsuperviosrData(check);
    setisLoading(false);
  };
  console.log(superviosrData);
  useEffect(() => {
    if (superviosrData === null) {
      getContactData();
    }
  }, [superviosrData]);
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.contactUsAdminBtnTxt}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
      />
      <View style={styles.otherContent}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={closeTogle}
            style={{flex: 1, width: '100%'}}
          />
          <View style={styles.contactUsMainDiv}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.userAvtarImage}
                source={
                  superviosrData?.userImage
                    ? {uri: superviosrData?.userImage}
                    : require('../assets/faceAvtar.png')
                }
              />
              <Text
                style={{...TextStyles.curvedHeaderscreenname, color: 'black'}}>
                Admin
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`sms:${superviosrData?.phone}`)}
                style={{
                  ...styles.btnContainerDiv,
                  backgroundColor: '#D3F6E0',
                }}>
                <Image
                  source={require('../assets/grenntrasp.png')}
                  style={styles.btnImage}
                />
                <Text
                  style={{
                    ...TextStyles.choiceinputinputxthead,
                    width: 'auto',
                    color: greencolor,
                  }}>
                  {textStrings.whatsappTxt}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    Platform.OS === 'android'
                      ? `tel:${superviosrData?.phone}`
                      : Platform.OS === 'ios'
                      ? `telprompt:${superviosrData?.phone}`
                      : Alert.alert('Not available'),
                  )
                }
                style={{
                  ...styles.btnContainerDiv,
                  backgroundColor: borderColor,
                }}>
                <Image
                  source={require('../assets/phonetransp.png')}
                  style={styles.btnImage}
                />
                <Text
                  style={{
                    ...TextStyles.ordercalctaxname,
                    color: maincolor,
                    marginLeft: w('3%'),
                  }}>
                  {textStrings.callBtnTxt}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={closeTogle}
            style={{flex: 1, width: '100%'}}
          />
        </View>
      </View>
      <LoadingModal visibleModal={isLoading} />
      {/* <Modal
        visible={modalOpen}
        onRequestClose={() => navigation.toggleDrawer()}
        transparent>
        
      </Modal> */}
    </View>
  );
};

export default ContactAdmin;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    //backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contactUsMainDiv: {
    width: '90%',
    height: h('40%'),
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: borderColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: h('31%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  btnContainer: {
    width: '100%',
    height: h('9%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnContainerDiv: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnImage: {
    height: '50%',
    width: h('5%'),
    resizeMode: 'contain',
    marginRight: w('2%'),
  },
  userAvtarImage: {
    height: h('15%'),
    resizeMode: 'contain',
    marginBottom: h('3%'),
  },
});
