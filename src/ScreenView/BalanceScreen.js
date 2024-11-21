// import {StyleSheet, Text, View, Image, FlatList, Share} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {w, h} from 'react-native-responsiveness';
// import CurvedHeaderComp from '../Components/CurvedHeaderComp';
// import {
//   WhiteColor,
//   borderColor,
//   graphSecondColor,
//   greencolor,
//   maincolor,
//   redcolor,
//   textcolor,
// } from '../assets/Colors';
// import TextStyles from '../Text/TextStyles';
// import {useTranslation} from '../Text/TextStrings';
// import {BarChart} from 'react-native-gifted-charts';
// import Octicons from 'react-native-vector-icons/Octicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import CustomBtn from '../Components/CustomBtn';
// import DateSelectorModelInput from '../Components/DateSelectorModelInput';
// import {useSelector} from 'react-redux';
// const BalanceScreen = ({navigation}) => {
//   const {textStrings} = useTranslation();
//   const {myOrdersData} = useSelector(state => state.project);
//   let TotalRevenue = 0;
//   const [fromDateValue, setfromDateValue] = useState(
//     new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
//   );
//   const [toDateValue, settoDateValue] = useState(new Date());
//   const [isLoading, setisLoading] = useState(false);
//   const [filteredProducts, setfilteredProducts] = useState([]);
//   const [totalRevenue, settotalRevenue] = useState(0);

//   myOrdersData?.map(dat => (TotalRevenue = TotalRevenue + dat?.orderPrice));
//   const CompleteOrderfilteredDataWithMonth = curentDay => {
//     const result = filteredProducts?.filter(
//       dat =>
//         (new Date(dat?.createdAt).getDay() === curentDay ||
//           new Date(dat?.updatedAt).getDay() === curentDay) &&
//         dat?.orderStatus === 'completed',
//     );

//     return result?.length;
//   };
//   const UnCompletefilteredDataWithMonth = curentDay => {
//     const result = filteredProducts?.filter(
//       dat =>
//         (new Date(dat?.createdAt).getDay() === curentDay ||
//           new Date(dat?.updatedAt).getDay() === curentDay) &&
//         dat?.orderStatus === 'canceled',
//     );
//     return result?.length;
//   };
//   const stackData = [
//     {
//       stacks: [
//         {value: 0, color: maincolor},
//         {
//           value: 0,
//           color: graphSecondColor,
//         },
//       ],
//       label: '',
//     },
//     {
//       stacks: [
//         {value: CompleteOrderfilteredDataWithMonth(0), color: maincolor},
//         {
//           value: UnCompletefilteredDataWithMonth(0),
//           color: graphSecondColor,
//         },
//       ],
//       label: 'Sun',
//     },
//     {
//       stacks: [
//         {value: CompleteOrderfilteredDataWithMonth(1), color: maincolor},
//         {
//           value: UnCompletefilteredDataWithMonth(1),
//           color: graphSecondColor,
//         },
//       ],
//       label: 'Mon',
//     },
//     {
//       stacks: [
//         {value: CompleteOrderfilteredDataWithMonth(2), color: maincolor},
//         {
//           value: UnCompletefilteredDataWithMonth(2),
//           color: graphSecondColor,
//         },
//       ],
//       label: 'Tue',
//     },
//     {
//       stacks: [
//         {value: CompleteOrderfilteredDataWithMonth(3), color: maincolor},
//         {
//           value: UnCompletefilteredDataWithMonth(3),
//           color: graphSecondColor,
//         },
//       ],
//       label: 'Wed',
//     },
//     {
//       stacks: [
//         {value: CompleteOrderfilteredDataWithMonth(4), color: maincolor},
//         {
//           value: UnCompletefilteredDataWithMonth(4),
//           color: graphSecondColor,
//         },
//       ],
//       label: 'Thu',
//     },
//     {
//       stacks: [
//         {value: CompleteOrderfilteredDataWithMonth(5), color: maincolor},
//         {
//           value: UnCompletefilteredDataWithMonth(5),
//           color: graphSecondColor,
//         },
//       ],
//       label: 'Fri',
//     },
//     {
//       stacks: [
//         {value: CompleteOrderfilteredDataWithMonth(6), color: maincolor},
//         {
//           value: UnCompletefilteredDataWithMonth(6),
//           color: graphSecondColor,
//         },
//       ],
//       label: 'Sat',
//     },
//   ];
//   const paymentMethods = [
//     {
//       firstTxt: textStrings.numberOfOrdersTxt,
//       subtext: '+30%',
//       value: filteredProducts?.length,
//       id: 0,
//     },
//     {
//       firstTxt: textStrings.revenueTxt,
//       subtext: '+30%',
//       value: totalRevenue,
//       currency: textStrings.currencyTxt,
//       id: 1,
//     },
//     {
//       firstTxt: textStrings.commisonTxtHead,
//       subtext: '+15%',
//       value: totalRevenue,
//       currency: textStrings.currencyTxt,
//       id: 2,
//     },
//     {
//       firstTxt: textStrings.completedOrderLabelTxt,
//       subtext: '-30%',
//       value: filteredProducts?.filter(dat => dat?.orderStatus === 'completed')
//         ?.length,

//       id: 3,
//     },
//     {
//       firstTxt: textStrings.unCompletedOrderLabelTxt,
//       subtext: '+30%',
//       value: filteredProducts?.filter(dat => dat?.orderStatus === 'canceled')
//         ?.length,

//       id: 4,
//     },
//   ];
//   const onShare = async () => {
//     try {
//       const result = await Share.share({
//         message: `${textStrings.numberOfOrdersTxt}:${myOrdersData?.length}\n
//         ${textStrings.revenueTxt}:${TotalRevenue} ${textStrings.currencyTxt}\n
//         ${textStrings.commisonTxtHead}:${TotalRevenue} ${
//           textStrings.currencyTxt
//         }\n
//         ${textStrings.completedOrderLabelTxt}:${
//           myOrdersData?.filter(dat => dat?.orderStatus === 'completed')?.length
//         }\n
//         ${textStrings.unCompletedOrderLabelTxt}:${
//           myOrdersData?.filter(dat => dat?.orderStatus !== 'completed')?.length
//         }`,
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       Alert.alert(error.message);
//     }
//   };
//   const getTotalRevnue = () => {
//     let totalRev = 0;
//     myOrdersData?.map(dat => {
//       if (
//         dat?.updatedAt >= Date.parse(fromDateValue) &&
//         dat?.updatedAt <= Date.parse(toDateValue) &&
//         dat.orderStatus === 'completed'
//       ) {
//         totalRev = totalRev + dat?.orderPrice;
//       } else {
//         totalRev = totalRev + 0;
//       }
//     });
//     settotalRevenue(totalRev);
//   };
//   const fetchFilteredProducts = () => {
//     const result = myOrdersData?.filter(
//       dat =>
//         dat?.updatedAt >= Date.parse(fromDateValue) &&
//         dat?.updatedAt <= Date.parse(toDateValue),
//     );
//     setfilteredProducts(result);
//   };
//   useEffect(() => {
//     getTotalRevnue();
//     fetchFilteredProducts();
//   }, [fromDateValue, toDateValue]);

//   return (
//     <View style={styles.fillscreenbg}>
//       <CurvedHeaderComp
//         name={textStrings.balanceBtnTxt}
//         iconName1={'list'}
//         firstbtnFun={() => navigation.toggleDrawer()}
//       />
//       <View style={styles.otherContent}>
//         <FlatList
//           keyExtractor={item => item.id}
//           data={paymentMethods}
//           ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
//           ListFooterComponent={
//             <View
//               style={{
//                 width: '95%',
//                 height: h('15%'),
//                 alignSelf: 'center',
//                 marginTop: h('1%'),
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <CustomBtn
//                 bgColor={'#25D366'}
//                 title={textStrings.shareBtnWalaTxt}
//                 secColor={'white'}
//                 clickfun={onShare}
//                 children={
//                   <Image
//                     style={{
//                       resizeMode: 'contain',
//                       width: '100%',
//                       height: '60%',
//                     }}
//                     source={require('../assets/whatsappTransp.png')}
//                   />
//                 }
//               />
//             </View>
//           }
//           ListHeaderComponent={
//             <View style={styles.chartContainerDiv}>
//               <View style={styles.dateSelctorView}>
//                 <View style={{width: '47%'}}>
//                   <DateSelectorModelInput
//                     placeHolder={textStrings.fromBtnTxt}
//                     value={fromDateValue}
//                     setValue={text => setfromDateValue(text)}
//                     isSelectedValue={
//                       Date.parse(fromDateValue) !==
//                       Date.parse(new Date().toDateString())
//                     }
//                   />
//                 </View>
//                 <View style={{width: '47%'}}>
//                   <DateSelectorModelInput
//                     placeHolder={textStrings.toBtnTxt}
//                     value={toDateValue}
//                     setValue={text => settoDateValue(text)}
//                     isSelectedValue={
//                       Date.parse(toDateValue) !==
//                       Date.parse(new Date().toDateString())
//                     }
//                   />
//                 </View>
//               </View>
//               <View style={styles.borderdiv}>
//                 <View style={styles.heroMainContainer}>
//                   <View style={styles.heroConatiner}>
//                     <View
//                       style={{...styles.heroCirle, borderColor: maincolor}}
//                     />
//                     <Text style={TextStyles.myorderscreendattxt}>
//                       {textStrings.completedOrderLabelTxt}
//                     </Text>
//                   </View>
//                   <View style={styles.heroConatiner}>
//                     <View
//                       style={{
//                         ...styles.heroCirle,
//                         borderColor: graphSecondColor,
//                       }}
//                     />
//                     <Text style={TextStyles.myorderscreendattxt}>
//                       {textStrings.unCompletedOrderLabelTxt}
//                     </Text>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     alignSelf: 'center',
//                     marginTop: h('2%'),
//                     paddingHorizontal: h('2%'),
//                   }}>
//                   <BarChart
//                     width={w('83%')}
//                     stackData={stackData}
//                     barWidth={w('3%')}
//                     barBorderRadius={h('1%')}
//                     spacing={w('8.5%')}
//                     //hideAxesAndRules={true}
//                     hideRules={true}
//                     initialSpacing={0}
//                     backgroundColor={WhiteColor}
//                     xAxisLabelTextStyle={{
//                       fontSize: h('1.8%'),
//                       color: textcolor,
//                     }}
//                     yAxisTextStyle={{color: textcolor}}
//                     //color={'blue'}
//                   />
//                 </View>
//               </View>
//             </View>
//           }
//           renderItem={({item, index}) => (
//             <View style={styles.pointContainer}>
//               <View style={styles.iconContainerView}>
//                 {index !== 1 && index !== 2 ? (
//                   <Octicons name={'package'} color={redcolor} size={h('3%')} />
//                 ) : (
//                   <FontAwesome5
//                     name={'chart-line'}
//                     color={redcolor}
//                     size={h('3%')}
//                   />
//                 )}
//               </View>
//               <View style={{...styles.firstTxtCont, flex: 1}}>
//                 <Text style={TextStyles.balancemainTxt}>{item?.firstTxt}</Text>
//                 <View
//                   style={{
//                     width: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'flex-start',
//                     flexDirection: 'row',
//                   }}>
//                   <MaterialIcons
//                     name="show-chart"
//                     size={h('3%')}
//                     color={item?.subtext?.includes('-') ? redcolor : greencolor}
//                     style={
//                       item?.subtext?.includes('-')
//                         ? {transform: [{rotateY: '180deg'}]}
//                         : {}
//                     }
//                   />
//                   <Text
//                     style={{...TextStyles.balancesubtxt, marginLeft: w('1%')}}>
//                     ({item?.subtext})
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.firstTxtCont}>
//                 <Text style={{...TextStyles.balancevaluetxt, color: maincolor}}>
//                   {item?.value}
//                 </Text>
//                 {item?.currency ? (
//                   <Text
//                     style={{
//                       ...TextStyles.balancesubtxt,
//                       textAlign: 'center',
//                       width: '100%',
//                       color: maincolor,
//                     }}>
//                     {item?.currency}
//                   </Text>
//                 ) : null}
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// export default BalanceScreen;

// const styles = StyleSheet.create({
//   fillscreenbg: {
//     height: h('100%'),
//     width: w('100%'),
//     backgroundColor: 'white',
//   },
//   borderdiv: {
//     paddingVertical: h('3%'),
//     borderWidth: 0.5,
//     borderColor: borderColor,
//     width: '90%',
//     alignSelf: 'center',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     paddingHorizontal: h('2%'),
//     overflow: 'hidden',
//   },
//   headerImage: {
//     width: '100%',
//     height: h('25%'),
//     resizeMode: 'contain',
//     borderRadius: h('4%'),
//     position: 'absolute',
//     top: -h('12%'),
//   },
//   headerDivCont: {
//     width: '100%',
//     height: h('8%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginBottom: h('6.5%'),
//   },
//   headerbtn: {
//     width: w('15%'),
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     position: 'relative',
//   },
//   reddot: {
//     width: 10,
//     height: 10,
//     backgroundColor: 'red',
//     position: 'absolute',
//     borderRadius: 10,
//     top: h('2%'),
//     right: w('3%'),
//   },
//   screenname: {
//     width: w('70%'),
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   otherContent: {
//     width: '100%',
//     flex: 1,
//   },
//   pointContainer: {
//     width: w('90%'),
//     height: h('12%'),
//     alignSelf: 'center',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     paddingHorizontal: w('2%'),
//     backgroundColor: '#FBFBFB',
//     borderRadius: h('1%'),
//   },
//   SrNumberCont: {
//     width: '100%',
//     marginBottom: h('1.2%'),
//   },
//   MainTextCont: {
//     width: '100%',
//   },
//   creditcardimg: {
//     width: '100%',
//     height: '100%',
//     alignSelf: 'center',
//     position: 'relative',
//   },
//   smallImageS: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   imageContainerSmall: {
//     position: 'absolute',
//     top: h('2.5%'),
//     left: w('6%'),
//     width: w('18%'),
//     height: h('5%'),
//     paddingHorizontal: h('1%'),
//     paddingVertical: h('1.1%'),
//     borderRadius: 5,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//   },
//   balanceImg: {
//     width: '90%',
//     height: h('26%'),
//     alignSelf: 'center',
//     resizeMode: 'contain',
//     marginBottom: h('4%'),
//   },
//   firstTxtCont: {
//     width: 'auto',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   chartContainerDiv: {
//     width: '100%',
//     height: h('60%'),
//     marginBottom: h('2%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     flexDirection: 'column',
//   },
//   heroMainContainer: {
//     width: '100%',
//     height: h('3%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   heroCirle: {
//     width: h('3%'),
//     height: h('3%'),
//     borderWidth: h('1%'),
//     borderRadius: h('3%'),
//     marginRight: w('2%'),
//   },
//   heroConatiner: {
//     width: '50%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   iconContainerView: {
//     width: h('7%'),
//     height: h('7%'),
//     borderRadius: h('7%'),
//     backgroundColor: 'rgba(159,32,59,0.1)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     marginRight: w('2.5%'),
//   },
//   dateSelctorView: {
//     width: '90%',
//     height: h('6%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Share,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {
  WhiteColor,
  borderColor,
  graphSecondColor,
  greencolor,
  maincolor,
  redcolor,
  textcolor,
} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {BarChart} from 'react-native-gifted-charts';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomBtn from '../Components/CustomBtn';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import {useSelector} from 'react-redux';

const BalanceScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const {myOrdersData} = useSelector(state => state.project);
  let TotalRevenue = 0;
  const [fromDateValue, setfromDateValue] = useState(
    new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  );
  const [toDateValue, settoDateValue] = useState(new Date());
  const [isLoading, setisLoading] = useState(false);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [totalRevenue, settotalRevenue] = useState(0);

  // Calculate total revenue from orders
  myOrdersData?.map(dat => (TotalRevenue = TotalRevenue + dat?.orderPrice));

  // Memoized function to filter completed orders for the given day of the week
  const CompleteOrderfilteredDataWithMonth = useCallback(
    curentDay => {
      const result = filteredProducts?.filter(
        dat =>
          (new Date(dat?.createdAt).getDay() === curentDay ||
            new Date(dat?.updatedAt).getDay() === curentDay) &&
          dat?.orderStatus === 'completed',
      );
      return result?.length;
    },
    [filteredProducts],
  );

  // Memoized function to filter canceled orders for the given day of the week
  const UnCompletefilteredDataWithMonth = useCallback(
    curentDay => {
      const result = filteredProducts?.filter(
        dat =>
          (new Date(dat?.createdAt).getDay() === curentDay ||
            new Date(dat?.updatedAt).getDay() === curentDay) &&
          dat?.orderStatus === 'canceled',
      );
      return result?.length;
    },
    [filteredProducts],
  );

  // Stack data for the bar chart
  const stackData = [
    {
      stacks: [
        {value: 0, color: maincolor},
        {value: 0, color: graphSecondColor},
      ],
      label: '',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(0), color: maincolor},
        {value: UnCompletefilteredDataWithMonth(0), color: graphSecondColor},
      ],
      label: 'Sun',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(1), color: maincolor},
        {value: UnCompletefilteredDataWithMonth(1), color: graphSecondColor},
      ],
      label: 'Mon',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(2), color: maincolor},
        {value: UnCompletefilteredDataWithMonth(2), color: graphSecondColor},
      ],
      label: 'Tue',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(3), color: maincolor},
        {value: UnCompletefilteredDataWithMonth(3), color: graphSecondColor},
      ],
      label: 'Wed',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(4), color: maincolor},
        {value: UnCompletefilteredDataWithMonth(4), color: graphSecondColor},
      ],
      label: 'Thu',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(5), color: maincolor},
        {value: UnCompletefilteredDataWithMonth(5), color: graphSecondColor},
      ],
      label: 'Fri',
    },
    {
      stacks: [
        {value: CompleteOrderfilteredDataWithMonth(6), color: maincolor},
        {value: UnCompletefilteredDataWithMonth(6), color: graphSecondColor},
      ],
      label: 'Sat',
    },
  ];

  const paymentMethods = [
    {
      firstTxt: textStrings.numberOfOrdersTxt,
      subtext: '+30%',
      value: filteredProducts?.length,
      id: 0,
    },
    {
      firstTxt: textStrings.revenueTxt,
      subtext: '+30%',
      value: totalRevenue,
      currency: textStrings.currencyTxt,
      id: 1,
    },
    {
      firstTxt: textStrings.commisonTxtHead,
      subtext: '+15%',
      value: totalRevenue,
      currency: textStrings.currencyTxt,
      id: 2,
    },
    {
      firstTxt: textStrings.completedOrderLabelTxt,
      subtext: '-30%',
      value: filteredProducts?.filter(dat => dat?.orderStatus === 'completed')
        ?.length,
      id: 3,
    },
    {
      firstTxt: textStrings.unCompletedOrderLabelTxt,
      subtext: '+30%',
      value: filteredProducts?.filter(dat => dat?.orderStatus === 'canceled')
        ?.length,
      id: 4,
    },
  ];

  // Function to handle sharing
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${textStrings.numberOfOrdersTxt}:${myOrdersData?.length}\n
        ${textStrings.revenueTxt}:${TotalRevenue} ${textStrings.currencyTxt}\n
        ${textStrings.commisonTxtHead}:${TotalRevenue} ${
          textStrings.currencyTxt
        }\n
        ${textStrings.completedOrderLabelTxt}:${
          myOrdersData?.filter(dat => dat?.orderStatus === 'completed')?.length
        }\n
        ${textStrings.unCompletedOrderLabelTxt}:${
          myOrdersData?.filter(dat => dat?.orderStatus !== 'completed')?.length
        }`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // Memoized function to calculate total revenue
  const getTotalRevnue = useCallback(() => {
    let totalRev = 0;
    myOrdersData?.map(dat => {
      if (
        dat?.updatedAt >= Date.parse(fromDateValue) &&
        dat?.updatedAt <= Date.parse(toDateValue) &&
        dat.orderStatus === 'completed'
      ) {
        totalRev = totalRev + dat?.orderPrice;
      }
    });
    settotalRevenue(totalRev);
  }, [fromDateValue, toDateValue, myOrdersData]);

  // Memoized function to fetch filtered products
  const fetchFilteredProducts = useCallback(() => {
    const result = myOrdersData?.filter(
      dat =>
        dat?.updatedAt >= Date.parse(fromDateValue) &&
        dat?.updatedAt <= Date.parse(toDateValue),
    );
    setfilteredProducts(result);
  }, [fromDateValue, toDateValue, myOrdersData]);

  // Fetch the filtered products and total revenue when date range changes
  useEffect(() => {
    getTotalRevnue();
    fetchFilteredProducts();
  }, [fromDateValue, toDateValue, getTotalRevnue, fetchFilteredProducts]);

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.balanceBtnTxt}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
      />
      <View style={styles.otherContent}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={paymentMethods}
          ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
          ListFooterComponent={
            <View style={styles.footerContainer}>
              <CustomBtn
                bgColor={'#25D366'}
                title={textStrings.shareBtnWalaTxt}
                secColor={'white'}
                clickfun={onShare}
                children={
                  <Image
                    style={styles.whatsappImage}
                    source={require('../assets/whatsappTransp.png')}
                  />
                }
              />
            </View>
          }
          ListHeaderComponent={
            <View style={styles.chartContainerDiv}>
              <View style={styles.dateSelctorView}>
                <View style={{width: '47%'}}>
                  <DateSelectorModelInput
                    placeHolder={textStrings.fromBtnTxt}
                    value={fromDateValue}
                    setValue={text => setfromDateValue(text)}
                    isSelectedValue={fromDateValue}
                  />
                </View>
                <View style={{width: '47%'}}>
                  <DateSelectorModelInput
                    placeHolder={textStrings.toBtnTxt}
                    value={toDateValue}
                    setValue={text => settoDateValue(text)}
                    isSelectedValue={toDateValue}
                  />
                </View>
              </View>
              <View style={styles.barChartContainer}>
                <BarChart
                  width={w('95%')}
                  height={h('28%')}
                  data={stackData}
                  frontColor={'white'}
                  barWidth={30}
                  initialSpacing={10}
                  stackedBar
                  yAxisLabel=""
                  yAxisSuffix=""
                />
              </View>
            </View>
          }
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={TextStyles.textPrimary2}>{item.firstTxt}</Text>
              <Text style={styles.priceStyle}>
                {item.currency} {item.value}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fillscreenbg: {
    flex: 1,
    backgroundColor: WhiteColor,
  },
  otherContent: {
    paddingHorizontal: w('4%'),
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  whatsappImage: {
    width: w('10%'),
    height: h('6%'),
  },
  chartContainerDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: h('2%'),
  },
  dateSelctorView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: h('2%'),
  },
  barChartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: h('2%'),
  },
  card: {
    backgroundColor: WhiteColor,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: borderColor,
    borderWidth: 1,
  },
  priceStyle: {
    color: maincolor,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BalanceScreen;
