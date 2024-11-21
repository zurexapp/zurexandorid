import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {borderColor, greencolor, maincolor, textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
const ContactScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const [modalOpen, setmodalOpen] = useState(true);
  const closeTogle = () => {
    navigation.toggleDrawer();
  };
  useEffect(() => {
    setmodalOpen(true);
  }, []);

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.contactTeamMemberTxt}
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
                source={require('../assets/faceAvtar.png')}
              />
              <Text style={{...TextStyles.appbtntxt, color: 'black'}}>
                {textStrings.conatactTeamMemberTxt}
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
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
                    ...TextStyles.choiceinputinputxthead,
                    width: 'auto',
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
      {/* <Modal
        visible={modalOpen}
        onRequestClose={() => navigation.toggleDrawer()}
        transparent>
        
      </Modal> */}
    </View>
  );
};

export default ContactScreen;

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
