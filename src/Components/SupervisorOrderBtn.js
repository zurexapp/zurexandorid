import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {w, h} from 'react-native-responsiveness';
import {useSelector} from 'react-redux';
import {goldenColor, greencolor, maincolor, redcolor} from '../assets/Colors';
import {scale} from 'react-native-size-matters';
import dayjs from 'dayjs';
const SupervisorOrderBtn = ({
  onClickFun,
  orderId,
  orderStatus,
  location,
  price,
  dateProcess,
  products,
}) => {
  const {textStrings} = useTranslation();
  const {isArabicLanguage} = useSelector(state => state.auth);

  const {
    filtersData,
    oilsData,
    tireData,
    batteryData,
    engineOilData,
    engineOilPetrolData,
  } = useSelector(state => state.project);

  const findTitle = () => {
    const data =
      products[0]?.referance === 'Filters'
        ? filtersData.find(dat => dat.id === products[0].id)
        : products[0]?.referance === 'Oils'
        ? oilsData.find(dat => dat.id === products[0].id)
        : products[0]?.referance === 'Tyres'
        ? tireData.find(dat => dat.id === products[0].id)
        : products[0]?.referance === 'btteries'
        ? batteryData.find(dat => dat.id === products[0].id)
        : products[0]?.referance === 'engineOil'
        ? engineOilData.find(dat => dat.id === products[0].id)
        : products[0]?.referance === 'engineOilPetrol'
        ? engineOilPetrolData.find(dat => dat.id === products[0].id)
        : {};

    const productTitle = isArabicLanguage
      ? data?.productNameArab
      : data?.productNameEng;
    return productTitle ? productTitle : textStrings.productHasBeenDeleted;
  };
  return (
    <TouchableOpacity onPress={onClickFun} style={styles.orderCradCont}>
      <View style={styles.UperConat}>
        <View style={styles.infoContainerCont}>
          <View style={styles.firstContainer}>
            <View
              style={{
                height: '100%',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginRight: scale(4),
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{...TextStyles.myorderscreenorderid, flex: 1}}>
                {textStrings.orderIdTitle} :
                <Text style={TextStyles.myorderscreenorderidval}>
                  {orderId}
                </Text>
              </Text>
            </View>

            <View
              style={{
                ...styles.sideBtnstatys,
                borderColor:
                  orderStatus === 'approved' || orderStatus === 'assigned'
                    ? goldenColor
                    : orderStatus === 'pending'
                    ? greencolor
                    : orderStatus === 'completed'
                    ? maincolor
                    : orderStatus === 'canceled'
                    ? redcolor
                    : maincolor,
              }}>
              <Text
                style={{
                  ...TextStyles.orderscreenststus,
                  color:
                    orderStatus === 'approved' || orderStatus === 'assigned'
                      ? goldenColor
                      : orderStatus === 'pending'
                      ? greencolor
                      : orderStatus === 'completed'
                      ? maincolor
                      : orderStatus === 'canceled'
                      ? redcolor
                      : maincolor,
                }}>
                {orderStatus === 'approved' || orderStatus === 'assigned'
                  ? textStrings.currnetStatusTxt
                  : orderStatus === 'pending'
                  ? textStrings.newStatusTxt
                  : orderStatus === 'completed'
                  ? textStrings.completedStatusTxt
                  : orderStatus === 'canceled'
                  ? textStrings.cancelStatusTxt
                  : ' '}
              </Text>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <Text style={TextStyles.myorderscreentitle}>{findTitle()}</Text>
          </View>
          <View style={styles.lowerConat}>
            <View style={styles.innerLowerCont}>
              <View style={styles.quantityContainer}>
                <Image
                  source={require('../assets/location.png')}
                  style={{
                    height: '100%',
                    width: h('1.8%'),
                    resizeMode: 'contain',
                    marginRight: w('1%'),
                  }}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={TextStyles.myorderscreendattxt}>
                  {location}
                </Text>
              </View>
              <View style={styles.dateContainer}>
                <Image
                  source={require('../assets/calender.png')}
                  style={{
                    height: '100%',
                    width: h('3.7%'),
                    resizeMode: 'contain',
                  }}
                />
                <Text style={TextStyles.myorderscreendattxt}>
                  {dayjs(dateProcess).format('DD/MM/YYYY hh:mm a')}
                </Text>
              </View>
              <View style={styles.priceConatiner}>
                <Image
                  source={require('../assets/euro.png')}
                  style={{
                    height: '100%',
                    width: h('3.5%'),
                    resizeMode: 'contain',
                  }}
                />
                <Text style={TextStyles.myorderscreendattxt}>{price}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SupervisorOrderBtn;

const styles = StyleSheet.create({
  sideBtnstatys: {
    height: '100%',
    width: w('25%'),
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainerCont: {
    width: '94%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  quantityContainer: {
    width: '22%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  priceConatiner: {
    width: '28%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dateContainer: {
    width: '48%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  orderCradCont: {
    width: w('90%'),
    backgroundColor: '#FBFBFB',
    height: h('16%'),
    borderWidth: 0.8,
    borderColor: '#BFD0E5',
  },
  UperConat: {
    width: '100%',
    height: h('16%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lowerConat: {
    width: '100%',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  secondContainer: {
    width: '100%',
    height: h('2.5%'),
    marginVertical: h('1%'),
  },
  firstContainer: {
    width: '100%',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  innerLowerCont: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
