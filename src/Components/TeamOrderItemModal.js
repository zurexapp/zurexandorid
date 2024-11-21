import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import OrderSmallCompTeam from './OrderSmallCompTeam';
import {h, w} from 'react-native-responsiveness';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {WhiteColor, greencolor, textcolor} from '../assets/Colors';

import {useTranslation} from '../Text/TextStrings';
import TextStyles from '../Text/TextStyles';
import {scale} from 'react-native-size-matters';
import CancelOrderModel from './CancelOrderModel';
const TeamOrderItemModal = ({
  btnSelectedValue,
  tickFun,
  crossFun,
  notCurentFun,
  item,
  onChangeTxt,
  resonTxt,
}) => {
  const [isCancelModal, setisCancelModal] = useState(false);
  const switchCancelModal = () => setisCancelModal(!isCancelModal);
  const ChildrenItem = ({item}) => {
    if (btnSelectedValue === 'Current') {
      return (
        <View style={styles.orderCradCont}>
          <OrderSmallCompTeam
            id={item?.id}
            DateValue={new Date(item?.createdAt).toDateString()}
            locationCityName={item?.deliveryInfo?.cityName}
            orderPrice={item?.totalPrice}
            products={item.products}
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={notCurentFun} style={styles.orderCradCont}>
          <OrderSmallCompTeam
            id={item?.id}
            DateValue={new Date(item?.createdAt).toDateString()}
            locationCityName={item?.deliveryInfo?.cityName}
            orderPrice={item?.totalPrice}
            products={item.products}
          />
        </TouchableOpacity>
      );
    }
  };
  return (
    <>
      {btnSelectedValue === 'Current' ? (
        <Swipeable
          renderLeftActions={() => (
            <View style={styles.btnContainersItem}>
              <TouchableOpacity
                onPress={tickFun}
                style={{
                  ...styles.iconContainerBtn,
                  backgroundColor: greencolor,
                }}>
                <MaterialIcons name="done" color="white" size={h('3.7%')} />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={switchCancelModal}
                style={{
                  ...styles.iconContainerBtn,
                  backgroundColor: redcolor,
                }}>
                <MaterialIcons name="close" color="white" size={h('3.7%')} />
              </TouchableOpacity> */}
            </View>
          )}>
          <ChildrenItem item={item} />
        </Swipeable>
      ) : (
        <ChildrenItem item={item} />
      )}
      <CancelOrderModel
        isCancelModal={isCancelModal}
        switchCancelModal={switchCancelModal}
        resonTxt={resonTxt}
        onChangeTxt={onChangeTxt}
        crossFun={crossFun}
      />
    </>
  );
};

export default TeamOrderItemModal;

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
