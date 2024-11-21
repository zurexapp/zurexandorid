import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {borderColor, textcolor} from '../assets/Colors';
import {w, h} from 'react-native-responsiveness';
import TextStyles from '../Text/TextStyles';
import {scale} from 'react-native-size-matters';
import {useTranslation} from '../Text/TextStrings';
const AcHomeBtn = ({
  listArr,
  imglink,
  title,
  secTxtColor,
  isSmallWidth,
  ClickFun,
}) => {
  const {textStrings} = useTranslation();

  return (
    <TouchableOpacity
      onPress={ClickFun}
      style={{
        ...styles.customBtnContainer,
        width: isSmallWidth ? '49%' : w('90%'),
        alignSelf: isSmallWidth ? 'auto' : 'center',
      }}>
      <View style={styles.mainHeadinContainer}>
        <View style={styles.imageContrainerdiv}>
          <Image
            source={imglink}
            style={{width: '100%', height: '60%', resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.mainTxtContainer}>
          <Text
            style={{
              ...TextStyles.ordercalctaxname,
              textAlign: 'left',
              width: '100%',
            }}>
            {title}
          </Text>
        </View>
      </View>
      <View style={{width: '100%', flex: 1, marginTop: scale(15)}}>
        <FlatList
          data={listArr?.length > 3 ? listArr?.slice(0, 3) : listArr}
          ListEmptyComponent={
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                ...TextStyles.orderdetaillocationHeadingtitle,
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              {textStrings.noDataFond}
            </Text>
          }
          renderItem={({item, index}) => (
            <View key={index} style={styles.mainHeadinContainerSub}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  ...TextStyles.orderstepstimetxt,
                  textAlign: 'left',
                  color: 'black',
                  flex: 1,
                }}>
                {item?.title}
              </Text>
              <Text
                style={{
                  ...TextStyles.orderstepstimetxt,
                  color: secTxtColor ? secTxtColor : textcolor,
                  textAlign: 'right',
                  marginLeft: scale(2),
                  width: scale(30),
                }}>
                ({item.value})
              </Text>
            </View>
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AcHomeBtn;

const styles = StyleSheet.create({
  customBtnContainer: {
    width: '90%',
    alignSelf: 'center',
    height: h('25%'),
    borderWidth: 0.2,
    borderColor: borderColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  mainHeadinContainer: {
    width: '95%',
    alignSelf: 'center',
    height: h('6%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  mainHeadinContainerSub: {
    width: '90%',
    alignSelf: 'center',
    height: scale(35),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageContrainerdiv: {
    height: '100%',
    width: h('5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTxtContainer: {
    height: '100%',
    flex: 1,
    marginLeft: w('1%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
