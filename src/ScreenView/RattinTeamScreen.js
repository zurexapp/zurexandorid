import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
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
const RattinTeamScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const [isLoading, setisLoading] = useState(false);
  const {myOrdersData, allSupervisorsData, allTeamsData} = useSelector(
    state => state.project,
  );
  console.log(allTeamsData);
  const [showLargeArr, setshowLargeArr] = useState(false);
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.teamsBtnTxtHead}
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
                ? allTeamsData
                : allTeamsData.slice(
                    0,
                    allTeamsData?.length > 8 ? 8 : allTeamsData?.length,
                  )
            }
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              allTeamsData.length > 8 ? (
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
            ItemSeparatorComponent={() => (
              <View style={styles.listBorderItem} />
            )}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TeamPerformScreen', {teamId: item?.id})
                }
                style={styles.listItemView}>
                <Text
                  style={{
                    ...TextStyles.orderstepstimetxt,
                    fontSize: scale(16),
                    textAlign: 'left',
                    flex: 1,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    ...TextStyles.orderstepstimetxt,
                    textAlign: 'right',
                    color: ratingColor,
                    marginLeft: w('2%'),
                  }}>
                  {item.value}{' '}
                  <AntDesign name="star" size={h('2.5%')} color={ratingColor} />
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default RattinTeamScreen;

const styles = StyleSheet.create({
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
    height: h('5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: h('1%'),
    paddingBottom: h('2%'),
  },
  listBorderItem: {
    borderColor: borderColor,
    borderBottomWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    height: scale(5),
  },
});
