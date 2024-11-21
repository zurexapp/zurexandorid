import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {textcolor, redcolor, c0color, borderColor} from '../assets/Colors';
import {w, h} from 'react-native-responsiveness';
import Icon2 from 'react-native-vector-icons/AntDesign';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {scale} from 'react-native-size-matters';
const CustomDropDownBtn = ({
  title,
  value,
  onCangeValue,
  listData,
  isDropDown,
  isSmallDesign,
  listSecDesign,
}) => {
  const {textStrings} = useTranslation();
  const [openDropModel, setopenDropModel] = useState(false);
  const findtitle = () => {
    const result = listData?.filter(dat => dat.value === value);
    return result[0]?.title
      ? result[0]?.title
      : textStrings.productHasBeenDeleted;
  };
  return (
    <>
      <View
        style={{
          width: '100%',
          height: h('7.5%'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
        }}>
        <TouchableOpacity
          onPress={() => setopenDropModel(!openDropModel)}
          style={{
            width: isSmallDesign ? '81%' : '90%',
            height: isSmallDesign ? h('6%') : h('7.5%'),
            backgroundColor: '#FAFCFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderWidth: 0.5,
            borderColor: '#BFD0E5',
            paddingHorizontal: w('3%'),
          }}>
          <Text
            style={{
              ...TextStyles.customDropdowntitletxt,
              fontSize: isSmallDesign ? scale(12) : scale(14),
              color: value?.length <= 0 && value === '' ? c0color : textcolor,
            }}>
            {value ? findtitle() : title}
          </Text>
          <View
            style={{
              width: w('10%'),
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Icon2
              name={isDropDown ? 'down' : `right`}
              size={isSmallDesign ? h('2.8%') : h('3%')}
              color={value?.length <= 0 && value === '' ? c0color : textcolor}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        visible={openDropModel}
        transparent
        onRequestClose={() => setopenDropModel(!openDropModel)}>
        <View style={styles.blacktransparentdiv}>
          <TouchableOpacity
            onPress={() => setopenDropModel(!openDropModel)}
            style={{flex: 1, width: '100%'}}
          />
          <View style={styles.optionContainer}>
            <FlatList
              keyExtractor={item => item.id}
              data={listData}
              ItemSeparatorComponent={
                <View
                  style={{
                    marginVertical: h('1%'),
                    borderColor: borderColor,
                    borderWidth: 0.5,
                    width: '90%',
                    alignSelf: 'center',
                  }}
                />
              }
              renderItem={({item}) => (
                <>
                  {listSecDesign ? (
                    <TouchableOpacity
                      onPress={() => {
                        onCangeValue(item?.value);
                        setopenDropModel(!openDropModel);
                      }}
                      style={styles.pointContainer2}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={TextStyles.customdropdownvaluetxt}>
                        {item?.title}
                      </Text>
                      <View style={styles.firstTxtCont2}>
                        {item?.price ? (
                          <Text style={TextStyles.customdropdownvaluetxt}>
                            {textStrings.orignalTxtFilter}: {item?.price}{' '}
                            {textStrings.currencyTxt}
                          </Text>
                        ) : null}
                        {item?.secPrice ? (
                          <Text style={TextStyles.customdropdownvaluetxt}>
                            {textStrings.commercialTxtFilter}: {item?.secPrice}{' '}
                            {textStrings.currencyTxt}
                          </Text>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        onCangeValue(item?.value);
                        setopenDropModel(!openDropModel);
                      }}
                      style={styles.pointContainer}>
                      <View style={styles.firstTxtCont}>
                        <View
                          style={{height: '100%', flex: 1, marginRight: 10}}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={TextStyles.customdropdownvaluetxt}>
                            {item?.title}
                          </Text>
                        </View>

                        {item?.price ? (
                          <Text style={TextStyles.customdropdownvaluetxt}>
                            {item?.price} {textStrings.currencyTxt}
                          </Text>
                        ) : null}
                        {item?.secPrice ? (
                          <Text style={TextStyles.customdropdownvaluetxt}>
                            {item?.secPrice} {textStrings.currencyTxt}
                          </Text>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => setopenDropModel(!openDropModel)}
            style={{flex: 1, width: '100%'}}
          />
        </View>
      </Modal>
    </>
  );
};

export default CustomDropDownBtn;

const styles = StyleSheet.create({
  blacktransparentdiv: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  optionContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    maxHeight: h('40%'),
    paddingVertical: h('2%'),
    borderRadius: 10,
  },
  pointContainer2: {
    width: '90%',
    height: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  pointContainer: {
    width: '100%',
    height: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  circleCont: {
    width: h('5%'),
    height: h('5%'),
    borderRadius: h('10%'),
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstTxtCont2: {
    width: '100%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
  },
  firstTxtCont: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  smallcont: {
    width: h('2.5%'),
    height: h('2.5%'),
    borderRadius: h('10%'),
    backgroundColor: redcolor,
  },
});
