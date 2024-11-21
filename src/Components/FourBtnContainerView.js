import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import {borderColor, greencolor, redcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MainBtnComp = ({
  isLargeImg,
  bgColor,
  imglink,
  title,
  subtitle,
  chartValue,
  pointerValue,
  titleColor,
  clickfun,
  width,
}) => {
  return (
    <TouchableOpacity
      onPress={clickfun ? clickfun : () => console.log('hy')}
      style={{
        ...styles.mainBtnContainer,
        backgroundColor: bgColor ? bgColor : 'white',
        width: width ? width : '49%',
      }}>
      <View style={styles.titleContainer}>
        <Image
          style={
            isLargeImg
              ? {height: '100%', width: w('10%'), resizeMode: 'contain'}
              : styles.chartimg
          }
          source={imglink}
        />
        <Text
          style={{
            ...TextStyles.curvedHeaderscreenname,
            fontWeight: 'bold',
            textAlign: 'left',
            flex: 1,
            marginLeft: w('2%'),
            color: titleColor ? titleColor : 'black',
          }}>
          {title}
        </Text>
      </View>
      <Text style={{...TextStyles.orderstepstimetxt, ...styles.extraSpcae}}>
        {subtitle}
      </Text>
      {chartValue ? (
        <View style={styles.titleContainer}>
          {pointerValue ? (
            <MaterialIcons
              name="show-chart"
              size={h('3%')}
              color={chartValue?.includes('-') ? redcolor : greencolor}
              style={
                chartValue?.includes('-')
                  ? {transform: [{rotateY: '180deg'}]}
                  : {}
              }
            />
          ) : (
            <Image
              style={styles.chartimg}
              source={require('../assets/graph.png')}
            />
          )}

          <Text
            style={{
              ...TextStyles.balancesubtxt,
              ...styles.chartxtStyle,
            }}>
            {chartValue}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
const FourBtnContainerView = ({
  bgColor,
  imglink1,
  imglink4,
  title1,
  title2,
  title3,
  title4,
  subtitle1,
  subtitle2,
  subtitle3,
  subtitle4,
  chartValue1,
  chartValue2,
  chartValue3,
  chartValue4,
  isLargeImg,
  pointerValue,
  titleColor,
}) => {
  return (
    <View style={styles.btnMainContainerView}>
      <View style={styles.btn2Containers}>
        <MainBtnComp
          isLargeImg={isLargeImg}
          imglink={imglink1}
          bgColor={bgColor}
          chartValue={chartValue1}
          subtitle={subtitle1}
          title={title1}
          pointerValue={pointerValue}
          titleColor={titleColor}
        />
        <MainBtnComp
          isLargeImg={isLargeImg}
          imglink={imglink1}
          bgColor={bgColor}
          chartValue={chartValue2}
          subtitle={subtitle2}
          title={title2}
          pointerValue={pointerValue}
          titleColor={titleColor}
        />
      </View>
      <View style={styles.btn2Containers}>
        <MainBtnComp
          isLargeImg={isLargeImg}
          imglink={imglink1}
          bgColor={bgColor}
          chartValue={chartValue3}
          subtitle={subtitle3}
          title={title3}
          pointerValue={pointerValue}
          titleColor={titleColor}
        />
        <MainBtnComp
          isLargeImg={isLargeImg}
          imglink={imglink4 ? imglink4 : imglink1}
          bgColor={bgColor}
          chartValue={chartValue4}
          subtitle={subtitle4}
          title={title4}
          pointerValue={pointerValue}
          titleColor={titleColor}
        />
      </View>
    </View>
  );
};

export default FourBtnContainerView;
export {MainBtnComp};
const styles = StyleSheet.create({
  btnMainContainerView: {
    width: w('90%'),
    height: h('33%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  btn2Containers: {
    width: '100%',
    height: h('16%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  mainBtnContainer: {
    width: '49%',
    height: '100%',
    borderWidth: 0.2,
    borderColor: borderColor,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  titleContainer: {
    height: h('5%'),
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  chartimg: {
    height: '100%',
    width: w('6%'),
    resizeMode: 'contain',
    marginLeft: w('2%'),
  },
  extraSpcae: {
    marginVertical: h('0.8%'),
    textAlign: 'left',
    width: '80%',
  },
  chartxtStyle: {
    textAlign: 'left',
    flex: 1,
    lineHeight: h('5%'),
    marginHorizontal: w('1.5%'),
  },
});
