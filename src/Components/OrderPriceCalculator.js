import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import {maincolor, textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const OrderPriceCalculator = ({taxesdat, total, isReverse}) => {
  const {textStrings} = useTranslation();
  return (
    <>
      <View style={styles.calculatordiv}>
        {taxesdat?.map(item => (
          <View key={item?.id} style={styles.linecomp}>
            <Text
              style={{
                ...TextStyles.myorderbtnTxtNew,
                textAlign: 'left',
                color: 'black',
              }}>
              {item?.name}
            </Text>
            <Image
              source={require('../assets/dashes.png')}
              style={{
                height: '4%',
                maxWidth: '40%',
                resizeMode: 'repeat',
                marginHorizontal: w('2%'),
              }}
            />
            <Text
              style={{
                ...TextStyles.myorderbtnTxtNew,
                color: isReverse ? textcolor : 'black',
                textAlign: 'right',
              }}>
              {item?.price ? item?.price : 0} {textStrings.currencyTxt}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.finalMainWidth}>
        <View style={styles.finalrest}>
          <View style={styles.linecomp}>
            <Text
              style={{
                ...TextStyles.myorderbtnTxtNew,
                fontWeight: 'bold',
                color: maincolor,
                textAlign: 'left',
              }}>
              {textStrings.totalCodeTxt}
            </Text>
            <Image
              source={require('../assets/dashes.png')}
              style={{
                height: '4%',
                maxWidth: '40%',
                resizeMode: 'repeat',
                marginHorizontal: w('2%'),
              }}
            />
            <Text
              style={{
                ...TextStyles.myorderbtnTxtNew,
                fontWeight: 'bold',
                color: maincolor,
                textAlign: 'right',
              }}>
              {total ? total : 0} {textStrings.currencyTxt}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default OrderPriceCalculator;

const styles = StyleSheet.create({
  calculatordiv: {
    width: w('90%'),
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignSelf: 'center',
    marginVertical: h('2%'),
  },
  linecomp: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: h('5%'),
  },
  finalMainWidth: {
    backgroundColor: 'rgba(19, 72, 139, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: h('2%'),
  },
  finalrest: {
    height: h('9%'),
    width: w('90%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
