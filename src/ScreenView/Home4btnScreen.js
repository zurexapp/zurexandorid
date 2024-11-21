import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import {borderColor, lightgreycolor, textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import CustomBtn from '../Components/CustomBtn';
import {useTranslation} from '../Text/TextStrings';
const Home4btnScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const showbtns = [
    {
      title: textStrings.teamBtnTxt,
      clickfun: () => {
        navigation.navigate('signleTeamSide');
      },
      id: 0,
    },
    {
      title: textStrings.dectTeamBtnTxt,
      clickfun: () => {
        navigation.navigate('dedicatedTeamSide');
      },
      id: 1,
    },
    {
      title: textStrings.superBtnTxt,
      clickfun: () => navigation.navigate('MySideNavSuperv'),
      id: 2,
    },
    {
      title: textStrings.adminBtnTxt,
      clickfun: () => navigation.navigate('MySideNavAdmin'),
      id: 3,
    },
  ];
  return (
    <>
      <View style={styles.fillmainbg}>
        <View style={styles.btnsContainer}>
          <FlatList
            data={showbtns}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <View style={styles.txtContainerView}>
                <Text
                  style={{...TextStyles.custombtntitletxt, color: textcolor}}>
                  {textStrings.homeMainHeading}
                </Text>
              </View>
            }
            ItemSeparatorComponent={<View style={{marginTop: h('2%')}} />}
            renderItem={({item}) => (
              <CustomBtn
                bgColor={lightgreycolor}
                title={item?.title}
                borderColor={borderColor}
                secColor={textcolor}
                clickfun={item?.clickfun}
              />
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Home4btnScreen;

const styles = StyleSheet.create({
  fillmainbg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  txtContainerView: {
    width: '90%',
    alignSelf: 'center',
    height: h('25%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  btnContainer: {
    width: '90%',
    alignSelf: 'center',
    height: h('28%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageButton: {
    position: 'relative',
    width: '49%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    borderColor: '#BFD0E5',
    borderRadius: 5,
  },
  btnimage: {
    width: w('20%'),
    resizeMode: 'contain',
    height: w('21%'),
  },
});
