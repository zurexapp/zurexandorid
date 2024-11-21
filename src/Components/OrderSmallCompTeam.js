import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import TextStyles from '../Text/TextStyles';
import {w, h} from 'react-native-responsiveness';
import {WhiteColor} from '../assets/Colors';
import {useSelector} from 'react-redux';
import {useTranslation} from '../Text/TextStrings';
const OrderSmallCompTeam = ({
  id,
  DateValue,
  orderPrice,
  products,
  locationCityName,
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
    <View style={styles.UperConat}>
      <View style={styles.infoContainerCont}>
        <View style={styles.firstContainer}>
          <Text style={TextStyles.myorderscreenorderid}>
            {textStrings.orderIdTitle} :
            <Text style={TextStyles.myorderscreenorderidval}>{id}</Text>
          </Text>
        </View>
        <View style={styles.secondContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={TextStyles.myorderscreentitle}>
            {findTitle()}
          </Text>
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
                style={[TextStyles.myorderscreendattxt, {flex: 1}]}>
                {locationCityName}
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
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[TextStyles.myorderscreendattxt, {flex: 1}]}>
                {DateValue}
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
              <Text style={TextStyles.myorderscreendattxt}>{orderPrice}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderSmallCompTeam;

const styles = StyleSheet.create({
  priceConatiner: {
    width: '28%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dateContainer: {
    width: '40%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  quantityContainer: {
    width: '30%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  UperConat: {
    width: '100%',
    height: h('16%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: WhiteColor,
  },
  lowerConat: {
    width: '100%',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  firstContainer: {
    width: '100%',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoContainerCont: {
    width: '94%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  secondContainer: {
    width: '100%',
    height: h('2.5%'),
    marginVertical: h('1%'),
  },
});
