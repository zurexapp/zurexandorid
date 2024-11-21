import {StyleSheet, Text, View, Modal, TextInput} from 'react-native';
import React from 'react';
import {h, w} from 'react-native-responsiveness';
import {WhiteColor, textcolor} from '../assets/Colors';
import AppBtn from './AppBtn';
import {useTranslation} from '../Text/TextStrings';
import TextStyles from '../Text/TextStyles';
import {scale} from 'react-native-size-matters';

const CancelOrderModel = ({
  isCancelModal,
  switchCancelModal,
  resonTxt,
  onChangeTxt,
  crossFun,
}) => {
  const {textStrings} = useTranslation();

  return (
    <Modal
      transparent
      visible={isCancelModal}
      onRequestClose={switchCancelModal}>
      <View style={styles.fillModalView}>
        <View style={styles.reasonModalInputCont}>
          <Text
            style={{
              ...TextStyles.verifcationcodesentdesc,
              width: '90%',
              alignSelf: 'center',
            }}>
            {textStrings.cancelReasonTxt}
          </Text>
          <TextInput
            value={resonTxt}
            onChangeText={onChangeTxt}
            keyboardType="default"
            numberOfLines={3}
            textAlignVertical="top"
            style={styles.cancelInputTxt}
            placeholder={textStrings.cancelReasonTxt}
          />
          <AppBtn
            clickfun={() => {
              crossFun();
              if (resonTxt) {
                switchCancelModal();
              }
            }}
            title={textStrings.submitModalBtn}
            outHeight={h('8%')}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CancelOrderModel;

const styles = StyleSheet.create({
  cancelInputTxt: {
    width: '90%',
    alignSelf: 'center',
    height: h('18%'),
    marginVertical: scale(10),
    borderWidth: 1,
    borderColor: textcolor,
    borderRadius: h('2%'),
    paddingHorizontal: w('3%'),
    paddingVertical: w('3%'),
    ...TextStyles.textinputfamilyclassAll,
    fontSize: scale(14),
  },
  reasonModalInputCont: {
    width: '90%',
    height: h('38%'),
    backgroundColor: WhiteColor,
    borderRadius: h('2%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  fillModalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  orderCradCont: {
    width: w('90%'),
    backgroundColor: '#FBFBFB',
    height: h('16%'),
    borderWidth: 0.8,
    borderColor: '#BFD0E5',
    overflow: 'hidden',
  },
  iconContainerBtn: {
    width: w('10%'),
    height: h('5%'),
    borderRadius: h('5%'),
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainersItem: {
    width: w('12%'),
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
});
