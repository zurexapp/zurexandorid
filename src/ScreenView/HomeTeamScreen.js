import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import {useTranslation} from '../Text/TextStrings';
import CustomBtn from '../Components/CustomBtn';
import {borderColor, c0color, maincolor} from '../assets/Colors';
import {scale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import LoadingModal from '../Components/LoadingModal';
import TextStyles from '../Text/TextStyles';

const HomeTeamScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const [isLoading, setisLoading] = useState(false);
  const {allTeamsData, employsData} = useSelector(state => state.project);
  const [orderInputId, setorderInputId] = useState('');
  const [filteredTeamsData, setfilteredTeamsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTeams = async () => {
      setisLoading(true);
      const allTeamsData = employsData?.filter(
        dat => dat?.role === 'SingleDTeam' || dat?.role === 'SingleTeam',
      );
      setfilteredTeamsData(allTeamsData);
      setisLoading(false);
    };
    console.log('Initial Data:', {allTeamsData, employsData});

    if (allTeamsData?.length <= 0) {
      fetchTeams();
    }
  }, [allTeamsData, employsData]);

  const filterTeamData = () => {
    if (orderInputId) {
      const filtered = filteredTeamsData.filter(dat =>
        `${dat?.id}`.toLowerCase().includes(`${orderInputId}`.toLowerCase()),
      );
      return filtered;
    } else {
      return filteredTeamsData;
    }
  };

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.teamsBtnTxtHead}
          iconName1={'left'}
          firstbtnFun={() => navigation.goBack()}
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
              placeholder={textStrings.teamBtnTxt}
              style={styles.textinputStyle}
              value={orderInputId}
              onChangeText={text => setorderInputId(text)}
            />
          </View>
          <View style={{...styles.otherContent, marginTop: h('1.5%')}}>
            <FlatList
              keyExtractor={item => item.id}
              data={filterTeamData()}
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
                <CustomBtn
                  title={item?.teamInfo.name}
                  bgColor={'#fbfbfb'}
                  secColor={maincolor}
                  borderColor={borderColor}
                  children={
                    <Image
                      source={require('../assets/teamsIcon.png')}
                      style={{height: scale(24), resizeMode: 'contain'}}
                    />
                  }
                  clickfun={() =>
                    navigation.navigate('TeamNameScreen', {teamId: item?.id})
                  }
                />
              )}
            />
          </View>
        </View>
      </View>
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

export default HomeTeamScreen;

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
});
