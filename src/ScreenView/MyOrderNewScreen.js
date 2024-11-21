import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import {
  borderColor,
  c0color,
  goldenColor,
  greencolor,
  maincolor,
  redcolor,
} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import Entypo from 'react-native-vector-icons/Entypo';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import AppBtn from '../Components/AppBtn';
import {scale} from 'react-native-size-matters';
const MyOrderNewScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const [btnSelectedValue, setbtnSelectedValue] = useState('new');
  const [openFilterModal, setopenFilterModal] = useState(false);
  const [selectItemFilter, setselectItemFilter] = useState('');
  const closeModal = () => {
    setopenFilterModal(!openFilterModal);
  };

  const CurrentData = [
    {
      id: 0,
      title: `N100L- ${textStrings.singleBattery}`,
      orderid: 1124,
      date: '15 Jan 2018',
      price: '200.00',
      location: 'Riyadh',
      status: 'current',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: false,
          hideRatting: true,
          hideReasonInput: true,
          hideTwoSmallBtn: false,
          hideSingleBtn: true,
        }),
    },
    {
      id: 1,
      title: `N100K- ${textStrings.singleBattery}`,
      orderid: 1134,
      date: '15 Jun 2018',
      price: '100.00',
      location: 'Riyadh',
      status: 'current',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: false,
          hideRatting: true,
          hideReasonInput: true,
          hideTwoSmallBtn: false,
          hideSingleBtn: true,
        }),
    },
  ];
  const newData = [
    {
      id: 0,
      title: `N100L- ${textStrings.singleBattery}`,
      orderid: 1124,
      date: '15 Jan 2018',
      price: '200.00',
      location: 'Riyadh',
      status: 'new',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: false,
          hideRatting: true,
          hideReasonInput: true,
          hideTwoSmallBtn: false,
          hideSingleBtn: true,
        }),
    },
    {
      id: 1,
      title: `N100K- ${textStrings.singleBattery}`,
      orderid: 1134,
      date: '15 Jun 2018',
      price: '100.00',
      location: 'Riyadh',
      status: 'new',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: false,
          hideRatting: true,
          hideReasonInput: true,
          hideTwoSmallBtn: false,
          hideSingleBtn: true,
        }),
    },
  ];
  const cancelData = [
    {
      id: 0,
      title: `N100L- ${textStrings.singleBattery}`,
      orderid: 1124,
      date: '15 Jan 2018',
      price: '200.00',
      location: 'Riyadh',
      status: 'cancel',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: true,
          hideRatting: true,
          hideReasonInput: false,
          hideTwoSmallBtn: true,
          hideSingleBtn: true,
        }),
    },
    {
      id: 1,
      title: `N100K- ${textStrings.singleBattery}`,
      orderid: 1134,
      date: '15 Jun 2018',
      price: '100.00',
      location: 'Riyadh',
      status: 'cancel',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: true,
          hideRatting: true,
          hideReasonInput: false,
          hideTwoSmallBtn: true,
          hideSingleBtn: true,
        }),
    },
  ];
  const defferdData = [
    {
      id: 0,
      title: `N100L- ${textStrings.singleBattery}`,
      orderid: 1124,
      date: '15 Jan 2018',
      price: '200.00',
      location: 'Riyadh',
      status: 'deferred',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: true,
          hideRatting: true,
          hideReasonInput: false,
          hideTwoSmallBtn: true,
          hideSingleBtn: true,
        }),
    },
    {
      id: 1,
      title: `N100K- ${textStrings.singleBattery}`,
      orderid: 1134,
      date: '15 Jun 2018',
      price: '100.00',
      location: 'Riyadh',
      status: 'deferred',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: true,
          hideRatting: true,
          hideReasonInput: false,
          hideTwoSmallBtn: true,
          hideSingleBtn: true,
        }),
    },
  ];

  const completedData = [
    {
      id: 0,
      title: `N100L- ${textStrings.singleBattery}`,
      orderid: 1164,
      date: '15 Jan 2018',
      price: '200.00',
      location: 'Riyadh',
      status: 'completed',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: false,
          hideRatting: false,
          hideReasonInput: true,
          hideTwoSmallBtn: true,
          hideSingleBtn: true,
        }),
    },
    {
      id: 1,
      title: `N100K- ${textStrings.singleBattery}`,
      orderid: 1136,
      date: '15 Jun 2018',
      price: '100.00',
      location: 'Riyadh',
      status: 'completed',
      clickfun: () =>
        navigation.navigate('orderDetailScreen', {
          hideList: false,
          hideRatting: false,
          hideReasonInput: true,
          hideTwoSmallBtn: true,
          hideSingleBtn: true,
        }),
    },
  ];
  const btnArray = [
    {
      id: 0,
      title: textStrings.newStatusTxt,
      value: 'new',
      onClickFun: () => setbtnSelectedValue('new'),
    },
    {
      id: 1,
      title: textStrings.currnetStatusTxt,
      value: 'current',
      onClickFun: () => setbtnSelectedValue('current'),
    },
    {
      id: 2,
      title: textStrings.completedStatusTxt,
      value: 'completed',
      onClickFun: () => setbtnSelectedValue('completed'),
    },
    {
      id: 3,
      title: textStrings.deferredStatusTxt,
      value: 'deferred',
      onClickFun: () => setbtnSelectedValue('deferred'),
    },
    {
      id: 4,
      title: textStrings.cancelStatusTxt,
      value: 'cancel',
      onClickFun: () => setbtnSelectedValue('cancel'),
    },
  ];
  const TeamsData = [
    {id: 0, title: 'Team', value: 'team0'},
    {id: 1, title: 'Team', value: 'team1'},
    {id: 2, title: 'Team', value: 'team2'},
    {id: 3, title: 'Team', value: 'team3'},
    {id: 4, title: 'Team', value: 'team4'},
    {id: 5, title: 'Team', value: 'team5'},
    {id: 6, title: 'Team', value: 'team6'},
    {id: 7, title: 'Team', value: 'team7'},
    {id: 8, title: 'Team', value: 'team8'},
    {id: 9, title: 'Team', value: 'team9'},
    {id: 10, title: 'Team', value: 'team10'},
    {id: 11, title: 'Team', value: 'team11'},
    {id: 12, title: 'Team', value: 'team12'},
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.orderTitle}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
      />
      <View style={styles.otherContent}>
        <View style={styles.topBtncontainers}>
          <View style={styles.iconConatinerStyle}>
            <Entypo
              name="magnifying-glass"
              size={h('4%')}
              color={borderColor}
            />
          </View>
          <TextInput
            placeholder={textStrings.orderIdTitle}
            style={styles.textinputStyle}
          />
          <TouchableOpacity
            onPress={closeModal}
            style={styles.btnContainerStyle}>
            <Entypo name="sound-mix" size={h('4%')} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={{...styles.otherContent, marginTop: h('1.5%')}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              height: h('6%'),
              marginBottom: h('1.5%'),
            }}>
            <FlatList
              data={btnArray}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={item.onClickFun}
                  style={{
                    ...styles.smallBtnDiv,
                    backgroundColor:
                      btnSelectedValue === item?.value
                        ? maincolor
                        : borderColor,
                  }}>
                  <Text
                    style={{
                      ...TextStyles.choiceinputbtntxt,
                      color:
                        btnSelectedValue === item?.value ? 'white' : maincolor,
                    }}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <FlatList
            keyExtractor={item => item.id}
            data={
              btnSelectedValue === 'current'
                ? CurrentData
                : btnSelectedValue === 'new'
                ? newData
                : btnSelectedValue === 'completed'
                ? completedData
                : btnSelectedValue === 'deferred'
                ? defferdData
                : btnSelectedValue === 'cancel'
                ? cancelData
                : []
            }
            ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
            ListFooterComponent={
              <View
                style={{
                  width: '95%',
                  height: h('5%'),
                  alignSelf: 'center',
                  marginTop: h('1%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={item.clickfun}
                style={styles.orderCradCont}>
                <View style={styles.UperConat}>
                  <View style={styles.infoContainerCont}>
                    <View style={styles.firstContainer}>
                      <Text style={TextStyles.myorderscreenorderid}>
                        {textStrings.orderIdTitle} :
                        <Text style={TextStyles.myorderscreenorderidval}>
                          {item?.orderid}
                        </Text>
                      </Text>
                      <View
                        style={{
                          ...styles.sideBtnstatys,
                          borderColor:
                            item.status === 'current'
                              ? goldenColor
                              : item.status === 'new'
                              ? greencolor
                              : item.status === 'completed'
                              ? maincolor
                              : item.status === 'deferred'
                              ? redcolor
                              : item.status === 'cancel'
                              ? redcolor
                              : maincolor,
                        }}>
                        <Text
                          style={{
                            ...TextStyles.orderscreenststus,
                            color:
                              item.status === 'current'
                                ? goldenColor
                                : item.status === 'new'
                                ? greencolor
                                : item.status === 'completed'
                                ? maincolor
                                : item.status === 'deferred'
                                ? redcolor
                                : item.status === 'cancel'
                                ? redcolor
                                : maincolor,
                          }}>
                          {item.status === 'current'
                            ? textStrings.currnetStatusTxt
                            : item.status === 'new'
                            ? textStrings.newStatusTxt
                            : item.status === 'completed'
                            ? textStrings.completedStatusTxt
                            : item.status === 'deferred'
                            ? textStrings.deferredStatusTxt
                            : item.status === 'cancel'
                            ? textStrings.cancelStatusTxt
                            : ' '}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={TextStyles.myorderscreentitle}>
                        {item?.title}
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
                          <Text style={TextStyles.myorderscreendattxt}>
                            {item?.location}
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
                            {item?.date}
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
                          <Text style={TextStyles.myorderscreendattxt}>
                            {item?.price}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <Modal visible={openFilterModal} onRequestClose={closeModal}>
        <View style={styles.fillscreenbg}>
          <CurvedHeaderComp
            name={textStrings.filterTitleTxt}
            iconName1={'left'}
            firstbtnFun={closeModal}
          />
          <View style={{...styles.otherContent, marginTop: h('2%')}}>
            <Text
              style={{
                ...TextStyles.choiceinputinputxthead,
                textAlign: 'left',
                width: '90%',
                alignSelf: 'center',
                marginBottom: h('1%'),
              }}>
              {textStrings.selectDateHeadinTxt}
            </Text>
            <View style={styles.dateSelctorView}>
              <View style={{width: '47%'}}>
                <DateSelectorModelInput placeHolder={textStrings.fromBtnTxt} />
              </View>
              <View style={{width: '47%'}}>
                <DateSelectorModelInput placeHolder={textStrings.toBtnTxt} />
              </View>
            </View>
            <View
              style={{
                ...styles.otherContent,
                marginVertical: h('2%'),
              }}>
              <Text
                style={{
                  ...TextStyles.choiceinputinputxthead,
                  textAlign: 'left',
                  width: '90%',
                  alignSelf: 'center',
                  marginBottom: h('1%'),
                }}>
                {textStrings.teamsBtnTxtHead}
              </Text>
              <FlatList
                data={TeamsData}
                ItemSeparatorComponent={
                  <View style={{width: '100%', marginBottom: h('2%')}} />
                }
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => setselectItemFilter(item?.value)}
                    style={styles.listFilterBtn}>
                    <Text style={styles.listMainTxt}>
                      {item.title} {item.id + 1}
                    </Text>
                    <View
                      style={{
                        ...styles.listBtnCircle,
                        borderWidth:
                          selectItemFilter === item?.value ? h('1.2%') : 1,
                        borderColor:
                          selectItemFilter !== item?.value
                            ? borderColor
                            : maincolor,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.btnConterLower}>
              <AppBtn title={textStrings.applyBtnTxt} clickfun={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyOrderNewScreen;

const styles = StyleSheet.create({
  listMainTxt: {
    ...TextStyles.Myorderbtntxt,
    fontSize: scale(14),
    lineHeight: h('7.5%'),
    flex: 1,
  },
  listBtnCircle: {
    height: h('4%'),
    width: h('4%'),
    borderRadius: h('10%'),
    overflow: 'hidden',
  },
  listFilterBtn: {
    width: w('90%'),
    height: h('7.5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: w('3%'),
    backgroundColor: '#FBFBFB',
    borderWidth: 0.7,
    borderColor: borderColor,
  },
  smallBtnDiv: {
    height: '100%',
    borderRadius: h('3%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: w('20%'),
    paddingHorizontal: w('4%'),
    marginRight: w('2%'),
  },
  topBtnContainersScrolled: {
    height: h('6%'),
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  btnContainerStyle: {
    width: '14%',
    height: '90%',
    backgroundColor: maincolor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: w('1%'),
  },
  iconConatinerStyle: {
    width: '11%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: w('1%'),
  },
  textinputStyle: {
    ...TextStyles.textinputfamilyclassAll,
    flex: 1,
    height: '100%',
    fontSize: scale(16),
    marginLeft: 10,
  },
  sideBtnstatys: {
    height: '100%',
    width: '37%',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityContainer: {
    width: '30%',
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
    width: '40%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  infoContainerCont: {
    width: '94%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imageContainer: {
    height: h('10%'),
    width: h('10%'),
    borderRadius: h('1.5%'),
    overflow: 'hidden',
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  mainimage: {
    width: w('90%'),
    resizeMode: 'contain',
    height: h('30%'),
  },
  otherContent: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  maintxt: {
    fontSize: h('2.7%'),
    color: 'black',
    marginVertical: h('3%'),
  },
  subtext: {
    width: '70%',
    textAlign: 'center',
    fontSize: h('1.9%'),
    marginBottom: h('14%'),
  },
  btnConatiners: {
    width: w('90%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    width: '49%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBtncontainers: {
    width: w('90%'),
    height: h('6.5%'),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: c0color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: w('0.7%'),
  },
  btnTabComp: {
    width: '32%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  btnContainersItem: {
    width: w('15%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  iconContainerBtn: {
    width: h('5%'),
    height: h('5%'),
    borderRadius: h('5%'),
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateSelctorView: {
    width: '90%',
    height: h('6%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnConterLower: {
    width: '100%',
    height: h('15%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
