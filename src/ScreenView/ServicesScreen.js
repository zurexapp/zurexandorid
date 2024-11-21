import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import {useTranslation} from '../Text/TextStrings';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import {borderColor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import CustomDropDownBtn from '../Components/CustomDropDownBtn';
import {useSelector} from 'react-redux';
import {getDataWholeCollection} from '../DataBase/databaseFunction';
import LoadingModal from '../Components/LoadingModal';
import AppBtn from '../Components/AppBtn';
const ServicesScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const {myOrdersData} = useSelector(state => state.project);

  const [wholeDataYouWant, setWholeDataYouWant] = useState({
    oilPercent: 0,
    tyrePercent: 0,
    batteryPercent: 0,
    filterPercent: 0,
    engineOilPercent: 0,
    oil: 0,
    tyre: 0,
    battery: 0,
    filter: 0,
    engineOil: 0,
    SuportPercent: 0,
  });

  const [oilChangeModal, setOilChangeModal] = useState(false);
  const [otherOilModal, setOtherOilModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [tiresModal, setTiresModal] = useState(false);
  const [fromDateValue, setfromDateValue] = useState(
    new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  );
  const [toDateValue, settoDateValue] = useState(new Date());
  const toggleOilChangeModal = () => {
    setOilChangeModal(!oilChangeModal);
  };
  const toggleOtherOilModal = () => {
    setOtherOilModal(!otherOilModal);
  };
  const togglefilterModal = () => {
    setFilterModal(!filterModal);
  };
  const toggleTiresModal = () => {
    setTiresModal(!tiresModal);
  };
  const findPercent = (amount, total) => {
    return Math.floor((amount / total) * 100).toFixed(2);
  };

  useEffect(() => {
    const findAllPercentData = suport => {
      let wholeProducts = [];
      const filtered = myOrdersData?.filter(
        dat =>
          Date.parse(new Date(dat?.updatedAt).toDateString()) >=
            Date.parse(fromDateValue) &&
          Date.parse(new Date(dat?.updatedAt).toDateString()) <=
            Date.parse(toDateValue),
      );
      filtered?.map(dat => {
        wholeProducts.push(...dat?.products);
      });
      const filtersProducts = wholeProducts?.filter(
        dat => dat?.referance === 'Filters',
      );
      const batteryProducts = wholeProducts?.filter(
        dat => dat?.referance === 'btteries',
      );
      const tyreProducts = wholeProducts?.filter(
        dat => dat?.referance === 'Tyres',
      );
      const oilProducts = wholeProducts?.filter(
        dat => dat?.referance === 'Oils',
      );
      const engineOilProducts = wholeProducts?.filter(
        dat => dat?.referance === 'engineOil',
      );

      setWholeDataYouWant({
        oilPercent: findPercent(
          oilProducts?.length,
          wholeProducts?.length + suport,
        ),
        tyrePercent: findPercent(
          tyreProducts?.length,
          wholeProducts?.length + suport,
        ),
        engineOilPercent: findPercent(
          engineOilProducts?.length,
          wholeProducts?.length + suport,
        ),
        batteryPercent: findPercent(
          batteryProducts?.length,
          wholeProducts?.length + suport,
        ),
        filterPercent: findPercent(
          filtersProducts?.length,
          wholeProducts?.length + suport,
        ),
        SuportPercent: findPercent(suport, wholeProducts?.length + suport),
        oil: oilProducts?.length,
        tyre: tyreProducts?.length,
        battery: batteryProducts?.length,
        filter: filtersProducts?.length,
        engineOil: engineOilProducts.length,
      });
    };
    const getAllData = async () => {
      setisLoading(true);
      const result = await getDataWholeCollection('supportOrders');
      findAllPercentData(result?.length);
      setisLoading(false);
    };
    getAllData();
  }, [fromDateValue, toDateValue, myOrdersData]);
  const btnContainerItems = [
    {
      id: 0,
      title: textStrings.freeServiceTitle1,
      value: `${wholeDataYouWant?.oilPercent}%`,
      clickFunc: toggleOilChangeModal,
    },

    {
      id: 2,
      title: textStrings.freeServiceTitle3,
      value: `${wholeDataYouWant?.filterPercent}%`,
      clickFunc: togglefilterModal,
    },
    {
      id: 9,
      title: textStrings.enineOilTxt,
      value: `${wholeDataYouWant?.engineOilPercent}%`,
      clickFunc: togglefilterModal,
    },
    {
      id: 3,
      title: textStrings.freeServiceTitle4,
      value: `${wholeDataYouWant?.tyrePercent}%`,
      clickFunc: toggleTiresModal,
    },
    {
      id: 4,
      title: textStrings.freeServiceTitle5,
      value: `${wholeDataYouWant?.batteryPercent}%`,
      clickFunc: () => navigation.navigate('BatteriesServiceScreen'),
    },
    {
      id: 5,
      title: textStrings.freeServiceTitle6,
      value: `${wholeDataYouWant?.SuportPercent}%`,
      clickFunc: () => navigation.navigate('BSupportScreen'),
    },
  ];
  const oilChangeArray = [
    {
      id: 0,
      title: textStrings.byBrandTxt,
      newData: [
        {title: 'Total', value: '50%', id: 0},
        {title: 'Mobil', value: '30%', id: 1},
        {title: 'Shell', value: '20%', id: 2},
      ],
    },
    {
      id: 1,
      title: textStrings.byTypeTxt,
      newData: [
        {title: 'Mineral motor oil', value: '56%', id: 0},
        {title: 'Synthetic motor oil', value: '30%', id: 1},
        {title: 'Synthetic motor oil', value: '14%', id: 2},
      ],
    },
    {
      id: 2,
      title: textStrings.byCityBtnTxt,
      newData: [
        {title: 'AL Madinah', value: '38%', id: 0},
        {title: 'Riyadh', value: '29%', id: 1},
        {title: 'Jeddah', value: '16%', id: 2},
        {title: 'AL Madinah', value: '38%', id: 3},
        {title: 'Riyadh', value: '29%', id: 4},
        {title: 'Jeddah', value: '16%', id: 5},
      ],
    },
  ];
  const otherOilsArray = [
    {
      id: 0,
      title: textStrings.byTeamTxt,
      newData: [
        {title: 'Team 1', value: '38%', id: 0},
        {title: 'Team 2', value: '29%', id: 1},
        {title: 'Team 3', value: '16%', id: 2},
      ],
    },
    {
      id: 1,
      title: textStrings.byCityBtnTxt,
      newData: [
        {title: 'AL Madinah', value: '38%', id: 0},
        {title: 'Riyadh', value: '29%', id: 1},
        {title: 'Jeddah', value: '16%', id: 2},
        {title: 'AL Madinah', value: '38%', id: 3},
        {title: 'Riyadh', value: '29%', id: 4},
        {title: 'Jeddah', value: '16%', id: 5},
      ],
    },
  ];
  const filterChangeArray = [
    {
      id: 0,
      title: textStrings.byCarBtnTxt,
      newData: [
        {title: 'Car Name 1', value: '38%', id: 0},
        {title: 'Car Name 2', value: '29%', id: 1},
        {title: 'Car Name 3', value: '16%', id: 2},
        {title: 'Car Name 4', value: '38%', id: 3},
      ],
    },
    {
      id: 1,
      title: textStrings.byCityBtnTxt,
      newData: [
        {title: 'AL Madinah', value: '38%', id: 0},
        {title: 'Riyadh', value: '29%', id: 1},
        {title: 'Jeddah', value: '16%', id: 2},
        {title: 'AL Madinah', value: '38%', id: 3},
        {title: 'Riyadh', value: '29%', id: 4},
        {title: 'Jeddah', value: '16%', id: 5},
      ],
    },
  ];
  const tiresChangeArray = [
    {
      id: 0,
      title: textStrings.byCarBtnTxt,
      newData: [
        {title: 'Car Name 1', value: '38%', id: 0},
        {title: 'Car Name 2', value: '29%', id: 1},
        {title: 'Car Name 3', value: '16%', id: 2},
        {title: 'Car Name 4', value: '38%', id: 3},
      ],
    },
    {
      id: 1,
      title: textStrings.byCityBtnTxt,
      newData: [
        {title: 'AL Madinah', value: '38%', id: 0},
        {title: 'Riyadh', value: '29%', id: 1},
        {title: 'Jeddah', value: '16%', id: 2},
        {title: 'AL Madinah', value: '38%', id: 3},
        {title: 'Riyadh', value: '29%', id: 4},
        {title: 'Jeddah', value: '16%', id: 5},
      ],
    },
  ];
  const [oilType, setOilType] = useState('');
  const [filterType, setfilterType] = useState('');
  const [tireType, settireType] = useState('');
  const [otherOilType, setotherOilType] = useState('');
  const RenderListArray = ({
    listArray,
    title,
    backFuction,
    inputTitle,
    listData,
    value,
    onCangeValue,
  }) => {
    return (
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={title}
          iconName1={'left'}
          firstbtnFun={backFuction}
        />
        <View style={styles.otherContent}>
          <View style={styles.dateSelctorView}>
            <View style={{width: '47%'}}>
              <DateSelectorModelInput placeHolder={textStrings.fromBtnTxt} />
            </View>
            <View style={{width: '47%'}}>
              <DateSelectorModelInput placeHolder={textStrings.toBtnTxt} />
            </View>
          </View>
          {inputTitle ? (
            <CustomDropDownBtn
              title={inputTitle}
              value={value}
              onCangeValue={onCangeValue}
              listData={listData}
              isDropDown={true}
              isSmallDesign={true}
            />
          ) : null}
          <View
            style={{
              ...styles.otherContent,
              justifyContent: 'flex-start',
            }}>
            <FlatList
              data={listArray}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{marginBottom: h('5%')}} />}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={{width: w('90%')}}>
                  <Text
                    style={{
                      ...TextStyles.choiceinputinputxthead,
                      textAlign: 'left',
                      width: '100%',
                      alignSelf: 'center',
                      marginVertical: h('1.5%'),
                    }}>
                    {item?.title}
                  </Text>
                  <View
                    style={{
                      ...styles.listContainerView,
                      width: w('89.7%'),
                    }}>
                    {item?.newData?.map((dat, index) => (
                      <View key={index}>
                        <View style={styles.listItemView}>
                          <Text
                            style={{
                              ...TextStyles.orderstepstimetxt,
                              textAlign: 'left',
                              width: '55%',
                            }}>
                            {dat.title}
                          </Text>
                          <Text
                            style={{
                              ...TextStyles.orderstepstimetxt,
                              textAlign: 'right',
                              width: '35%',
                              color: 'black',
                            }}>
                            {dat.value}
                          </Text>
                        </View>
                        {item?.newData?.length > index + 1 ? (
                          <View
                            style={{
                              marginBottom: h('0.2%'),
                              borderColor: borderColor,
                              borderWidth: 0.5,
                              width: '90%',
                              alignSelf: 'center',
                            }}
                          />
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.servicesMainHeadingTxt}
          iconName1={'left'}
          firstbtnFun={() => navigation.goBack()}
        />
        <View style={styles.otherContent}>
          <View style={styles.dateSelctorView}>
            <View style={{width: '47%'}}>
              <DateSelectorModelInput
                placeHolder={textStrings.fromBtnTxt}
                value={fromDateValue}
                setValue={text => setfromDateValue(text)}
                isSelectedValue={
                  Date.parse(fromDateValue) !==
                  Date.parse(new Date().toDateString())
                }
              />
            </View>
            <View style={{width: '47%'}}>
              <DateSelectorModelInput
                placeHolder={textStrings.toBtnTxt}
                value={toDateValue}
                setValue={text => settoDateValue(text)}
                isSelectedValue={
                  Date.parse(toDateValue) !==
                  Date.parse(new Date().toDateString())
                }
              />
            </View>
          </View>
          <View style={{...styles.otherContent, justifyContent: 'flex-start'}}>
            <View style={styles.listContainerView}>
              <FlatList
                keyExtractor={item => item.id}
                data={btnContainerItems}
                ItemSeparatorComponent={
                  <View
                    style={{
                      marginBottom: h('0.2%'),
                      borderColor: borderColor,
                      borderWidth: 0.5,
                      width: '90%',
                      alignSelf: 'center',
                    }}
                  />
                }
                renderItem={({item}) => (
                  <View style={styles.listItemView}>
                    <Text
                      style={{
                        ...TextStyles.orderstepstimetxt,
                        textAlign: 'left',
                        width: '55%',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        ...TextStyles.orderstepstimetxt,
                        textAlign: 'right',
                        width: '35%',
                        color: 'black',
                      }}>
                      {item.value}
                    </Text>
                  </View>
                )}
              />
            </View>
            <AppBtn
              title={textStrings.homeTxtBtn}
              clickfun={() => navigation.replace('MySideNavAdmin')}
            />
          </View>
        </View>
        <Modal
          animationType="slide"
          visible={oilChangeModal}
          onRequestClose={toggleOilChangeModal}>
          <RenderListArray
            listArray={oilChangeArray}
            title={textStrings.freeServiceTitle1}
            backFuction={toggleOilChangeModal}
          />
        </Modal>
        <Modal
          animationType="slide"
          visible={otherOilModal}
          onRequestClose={toggleOtherOilModal}>
          <RenderListArray
            listArray={otherOilsArray}
            title={textStrings.freeServiceTitle2}
            backFuction={toggleOtherOilModal}
            inputTitle={textStrings.choseTypeOfOtherOilTxt}
            value={otherOilType}
            onCangeValue={text => setotherOilType(text)}
            listData={[
              {id: 0, title: 'All', value: 'all'},
              {id: 1, title: 'Machine wash oil', value: 'machine'},
              {id: 2, title: 'Drexon oil', value: 'drexon'},
              {id: 3, title: 'Gear oil', value: 'gear'},
              {id: 4, title: 'Brake oil', value: 'brake'},
              {id: 5, title: 'Radiator water', value: 'radiator'},
            ]}
          />
        </Modal>
        <Modal
          animationType="slide"
          visible={filterModal}
          onRequestClose={togglefilterModal}>
          <RenderListArray
            listArray={filterChangeArray}
            title={textStrings.freeServiceTitle3}
            backFuction={togglefilterModal}
            inputTitle={textStrings.choseTypeOfFilterTxt}
            value={filterType}
            onCangeValue={text => setfilterType(text)}
            listData={[
              {id: 0, title: 'All', value: 'all'},
              {id: 1, title: 'Oil filter', value: 'oilFilter'},
              {id: 2, title: 'Air filter', value: 'airFilter'},
              {id: 3, title: 'Air conditioner filter', value: 'airConditioner'},
            ]}
          />
        </Modal>
        <Modal
          animationType="slide"
          visible={tiresModal}
          onRequestClose={toggleTiresModal}>
          <RenderListArray
            listArray={tiresChangeArray}
            title={textStrings.freeServiceTitle4}
            backFuction={toggleTiresModal}
            inputTitle={textStrings.choseTypeOfTireTxt}
            value={tireType}
            onCangeValue={text => settireType(text)}
            listData={[
              {id: 0, title: 'All', value: 'all'},
              {id: 1, title: 'Michelin tire', value: 'michelin'},
              {id: 2, title: 'BRIDGESTONE tire', value: 'bridgestone'},
            ]}
          />
        </Modal>
      </View>
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
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
  otherContent: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  listContainerView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: borderColor,
    paddingVertical: h('1%'),
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
