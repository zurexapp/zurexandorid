import {
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import {useTranslation} from '../Text/TextStrings';
import {w, h} from 'react-native-responsiveness';
import {borderColor, maincolor, ratingColor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomBtn from '../Components/CustomBtn';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
const RattinSupervisorScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const {myOrdersData, allSupervisorsData, allTeamsData} = useSelector(
    state => state.project,
  );
  const [showLargeArr, setshowLargeArr] = useState(false);
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.superVisorBtnTxtHead}
        iconName1={'left'}
        firstbtnFun={() => navigation.goBack()}
      />
      <View style={styles.otherContent}>
        <View
          style={{
            ...styles.otherContent,
            marginVertical: h('3%'),
            width: '95%',
            alignSelf: 'center',
          }}>
          <FlatList
            data={
              showLargeArr
                ? allSupervisorsData
                : allSupervisorsData.slice(
                    0,
                    allSupervisorsData?.length > 8
                      ? 8
                      : allSupervisorsData?.length,
                  )
            }
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              allSupervisorsData?.length > 8 ? (
                <View
                  style={{
                    height: h('15%'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <CustomBtn
                    bgColor={'white'}
                    borderColor={maincolor}
                    secColor={maincolor}
                    clickfun={() => setshowLargeArr(!showLargeArr)}
                    title={
                      showLargeArr
                        ? textStrings.viewLessBtnTxt
                        : textStrings.viewAllBtnTxt
                    }
                  />
                </View>
              ) : null
            }
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.listUserProfileContainer}>
                <View
                  style={styles.MainInfoViewContainer}
                  // onPress={() =>
                  //   navigation.navigate('SupervisorPerformScreen', {
                  //     teamId: item?.teamId,
                  //   })}
                >
                  <Text
                    style={{
                      ...TextStyles.orderstepstimetxt,
                      fontSize: scale(16),
                      textAlign: 'left',
                      width: '100%',
                      marginBottom: h('1%'),
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      ...TextStyles.orderstepstimetxt,
                      textAlign: 'left',
                      width: '100%',
                      color: ratingColor,
                    }}>
                    <AntDesign
                      name="star"
                      size={h('2.5%')}
                      color={ratingColor}
                    />{' '}
                    {item.value}
                  </Text>
                </View>
                <View style={styles.btnContainerView}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`sms:${item?.phone}`)}
                    style={styles.subBtnShare}>
                    <Image
                      source={require('../assets/whatsappNew.png')}
                      style={{height: h('6%'), resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        Platform.OS === 'android'
                          ? `tel:${item?.phone}`
                          : Platform.OS === 'ios'
                          ? `telprompt:${item?.phone}`
                          : Alert.alert('Not available'),
                      )
                    }
                    style={styles.subBtnShare}>
                    <Image
                      source={require('../assets/mobileNew.png')}
                      style={{height: h('6%'), resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.listBorderItem} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default RattinSupervisorScreen;

const styles = StyleSheet.create({
  listUserProfileContainer: {
    width: w('90%'),
    height: h('12%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  listBorderItem: {
    borderColor: borderColor,
    borderBottomWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    height: scale(5),
  },
  MainInfoViewContainer: {
    height: '100%',
    width: w('60%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  btnContainerView: {
    height: '100%',
    width: w('27%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  subBtnShare: {
    width: '45%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  dateSelctorView: {
    width: '90%',
    height: h('6%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: h('2%'),
  },
  listItemView: {
    width: '90%',
    alignSelf: 'center',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: h('1%'),
  },
});
