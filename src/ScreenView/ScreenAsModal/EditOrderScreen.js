import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import CurvedHeaderComp from '../../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import CustomDropDownBtn from '../../Components/CustomDropDownBtn';
import {useTranslation} from '../../Text/TextStrings';
import {
  WhiteColor,
  c0color,
  maincolor,
  redcolor,
  textcolor,
} from '../../assets/Colors';
import TextStyles from '../../Text/TextStyles';
import AppBtn from '../../Components/AppBtn';
import {useSelector} from 'react-redux';
import CartComp from '../../Components/CartComp';
import {scale} from 'react-native-size-matters';
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomBtn from '../../Components/CustomBtn';

const EditOrderScreen = ({
  closeModalFun,
  valueObject,
  changeValueFun,
  addBtnFunction,
  oldTotalPriceValue,
}) => {
  console.log('EditOrderScreen props:', {
    closeModalFun,
    valueObject,
    changeValueFun,
    addBtnFunction,
    oldTotalPriceValue,
  });

  const {textStrings} = useTranslation();
  console.log('textStrings:', textStrings);

  const {
    filtersData,
    oilsData,
    tireData,
    batteryData,
    supportServicesData,
    freeServices,
    engineOilData,
  } = useSelector(state => state.project);
  console.log('Redux state project data:', {
    filtersData,
    oilsData,
    tireData,
    batteryData,
    supportServicesData,
    freeServices,
    engineOilData,
  });

  const {isArabicLanguage} = useSelector(state => state.auth);
  console.log('isArabicLanguage:', isArabicLanguage);

  const [saveModalAlert, setsaveModalAlert] = useState(false);
  const [productsArry, setproductsArry] = useState([]);
  const [selectFilterType, setselectFilterType] = useState('');
  const [isDataUpdated, setisDataUpdated] = useState(false);
  const [fianlPrice, setfianlPrice] = useState(0);

  const batteryDataArr = batteryData?.map(dat => {
    return {
      title: isArabicLanguage ? dat?.productNameArab : dat?.productNameEng,
      value: dat?.id,
      id: dat?.id,
      price: dat?.originalPrice,
    };
  });
  console.log('batteryDataArr:', batteryDataArr);

  const tiresDataArr = tireData?.map(dat => {
    return {
      title: isArabicLanguage ? dat?.productNameArab : dat?.productNameEng,
      value: dat?.id,
      id: dat?.id,
      price: dat?.originalPrice,
    };
  });
  console.log('tiresDataArr:', tiresDataArr);

  const filtersDataArr = [
    ...filtersData?.map(dat => {
      return {
        title: isArabicLanguage ? dat?.productNameArab : dat?.productNameEng,
        value: dat?.id,
        id: dat?.id,
        price: dat?.originalPrice,
        secPrice: dat?.commercialPrice,
      };
    }),
  ];
  console.log('filtersDataArr:', filtersDataArr);

  const oilsDataArr = [
    ...oilsData?.map(dat => {
      return {
        title: isArabicLanguage ? dat?.productNameArab : dat?.productNameEng,
        value: dat?.id,
        id: dat?.id,
        price: dat?.originalPrice,
      };
    }),
  ];
  console.log('oilsDataArr:', oilsDataArr);

  const enigineOilArr = [
    ...engineOilData?.map(dat => {
      return {
        title: isArabicLanguage ? dat?.productNameArab : dat?.productNameEng,
        value: dat?.id,
        id: dat?.id,
        price: dat?.originalPrice,
      };
    }),
  ];
  console.log('enigineOilArr:', enigineOilArr);

  const getSupportServicesTitle = dat => {
    let title = '';
    dat?.products.map(dal => {
      let temptitle = isArabicLanguage
        ? dal?.productNameArab
        : dal?.productNameEng;
      title = title + temptitle + ' ';
    });
    return title;
  };

  const supportDataArr = supportServicesData?.map(dat => {
    return {
      title: getSupportServicesTitle(dat),
      value: dat?.id,
      id: dat?.id,
      price: dat?.originalPrice,
    };
  });
  console.log('supportDataArr:', supportDataArr);

  const freesupportDataArr = freeServices?.map(dat => {
    return {
      title: isArabicLanguage ? dat?.productNameArab : dat?.productNameEng,
      value: dat?.id,
      id: dat?.id,
    };
  });
  console.log('freesupportDataArr:', freesupportDataArr);

  const calculatePrice = useCallback(() => {
    console.log('calculatePrice function called');
    let finalPriceRaw = 0;
    console.log('productsArry inside calculatePrice:', productsArry);
    productsArry?.map(dat => {
      const confirmPrice =
        dat?.type === 'original' || dat?.type?.length <= 0
          ? dat?.originalPrice
          : dat?.commercialPrice
          ? dat?.commercialPrice
          : dat?.originalPrice;
      console.log(
        'confirmPrice:',
        confirmPrice,
        'quantity:',
        dat?.quantity,
        'referance:',
        dat?.referance,
      );
      let price = parseInt(confirmPrice) * parseInt(dat?.quantity || 1);
      const finalPriceDem = parseInt(finalPriceRaw) + parseInt(price);
      finalPriceRaw = finalPriceDem;
    });
    console.log('finalPriceRaw calculated:', finalPriceRaw);
    setfianlPrice(finalPriceRaw);
  }, [productsArry]);
  const getAllProducts = () => {
    console.log('getAllProducts function called');
    const fetchBattery = batteryData?.find(
      dat => dat?.id === valueObject.battery,
    );
    const fetchTire = tireData?.find(dat => dat?.id === valueObject.tire);
    const fetchOil = oilsData?.find(dat => dat?.id === valueObject.otherOils);
    const fetchFiltr = filtersData?.find(
      dat => dat?.id === valueObject.filters,
    );
    const fetchEngineOil = engineOilData?.find(
      dat => dat?.id === valueObject.engineOil,
    );
    const fetchSuport = supportServicesData?.find(
      dat => dat?.id === valueObject.supportService,
    );
    // console.log('Fetched products:', {
    //   fetchBattery,
    //   fetchTire,
    //   fetchOil,
    //   fetchFiltr,
    //   fetchEngineOil,
    //   fetchSuport,
    // });
    const finalData = [
      ...(fetchBattery
        ? [
            {
              ...fetchBattery,
              referance: 'btteries',
              quantity: productsArry?.filter(
                duc => duc.id === fetchBattery.id,
              )[0]?.quantity
                ? productsArry?.filter(duc => duc.id === fetchBattery.id)[0]
                    ?.quantity
                : 1,
            },
          ]
        : []),
      ...(fetchTire
        ? [
            {
              ...fetchTire,
              referance: 'Tyres',
              quantity: productsArry?.filter(duc => duc.id === fetchTire.id)[0]
                ?.quantity
                ? productsArry?.filter(duc => duc.id === fetchTire.id)[0]
                    ?.quantity
                : 1,
            },
          ]
        : []),
      ...(fetchOil
        ? [
            {
              ...fetchOil,
              referance: 'Oils',
              quantity: productsArry?.filter(duc => duc.id === fetchOil.id)[0]
                ?.quantity
                ? productsArry?.filter(duc => duc.id === fetchOil.id)[0]
                    ?.quantity
                : 1,
            },
          ]
        : []),
      ...(fetchEngineOil
        ? [
            {
              ...fetchEngineOil,
              referance: 'engineOil',
              quantity: productsArry?.filter(
                duc => duc.id === fetchEngineOil.id,
              )[0]?.quantity
                ? productsArry?.filter(duc => duc.id === fetchEngineOil.id)[0]
                    ?.quantity
                : 1,
            },
          ]
        : []),
      ...(fetchFiltr
        ? [
            {
              ...fetchFiltr,
              referance: 'Filters',
              quantity: productsArry?.filter(duc => duc.id === fetchFiltr.id)[0]
                ?.quantity
                ? productsArry?.filter(duc => duc.id === fetchFiltr.id)[0]
                    ?.quantity
                : 1,
              type: selectFilterType,
            },
          ]
        : []),
      ...(fetchSuport
        ? [
            {
              ...fetchSuport,
              referance: 'SupportServices',
              quantity: productsArry?.filter(
                duc => duc.id === fetchSuport.id,
              )[0]?.quantity
                ? productsArry?.filter(duc => duc.id === fetchSuport.id)[0]
                    ?.quantity
                : 1,
            },
          ]
        : []),
    ];
    console.log('finalData for setproductsArry:', finalData);
    setproductsArry(finalData);
  };
  getAllProducts();

  useEffect(() => {
    console.log('useEffect triggered');

    calculatePrice();
  }, [selectFilterType, valueObject, isDataUpdated, calculatePrice]);

  const findTaxFn = total => {
    console.log('findTaxFn:', total);
    return Math.round((15 / 100) * total);
  };

  const CloseEditModal = async () => {
    console.log('CloseEditModal function called');
    const checkIsFilterProduct = productsArry?.filter(
      dat => dat?.referance === 'Filters',
    );
    if (checkIsFilterProduct?.length > 0) {
      if (selectFilterType?.length > 0) {
        const formatedProducts = productsArry?.map(dat => {
          if (dat?.referance !== 'Filters') {
            return {
              id: dat?.id,
              referance: dat?.referance,
              quantity: dat?.quantity,
            };
          } else {
            return {
              id: dat?.id,
              referance: dat?.referance,
              quantity: dat?.quantity,
              type: selectFilterType ? selectFilterType : '',
            };
          }
        });
        console.log('formatedProducts with Filters:', formatedProducts);
        await addBtnFunction(
          formatedProducts,
          fianlPrice,
          findTaxFn(fianlPrice),
        );
      } else {
        setsaveModalAlert(false);
        Alert.alert(textStrings.normalEror, textStrings.filterTypeNotSelected);
      }
    } else {
      const formatedProducts = productsArry?.map(dat => {
        return {
          id: dat?.id,
          referance: dat?.referance,
          quantity: dat?.quantity,
        };
      });
      console.log('formatedProducts without Filters:', formatedProducts);

      await addBtnFunction(formatedProducts, fianlPrice, findTaxFn(fianlPrice));
    }
  };

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={' '}
          iconName1={'left'}
          firstbtnFun={closeModalFun}
        />
        <View style={styles.otherContent}>
          <ScrollView>
            <Text
              style={{...TextStyles.tamaralogininputtxt, marginTop: h('2%')}}>
              {textStrings.batteriesTxt}
            </Text>
            <CustomDropDownBtn
              title={textStrings.batteriesTxt}
              value={valueObject.battery}
              onCangeValue={text =>
                changeValueFun({...valueObject, battery: text})
              }
              listData={batteryDataArr}
            />
            <Text
              style={{...TextStyles.tamaralogininputtxt, marginTop: h('2%')}}>
              {textStrings.TiresTxt}
            </Text>
            <CustomDropDownBtn
              title={textStrings.TiresTxt}
              value={valueObject.tire}
              onCangeValue={text =>
                changeValueFun({...valueObject, tire: text})
              }
              listData={tiresDataArr}
            />
            <Text
              style={{...TextStyles.tamaralogininputtxt, marginTop: h('2%')}}>
              {textStrings.enineOilTxt}
            </Text>
            <CustomDropDownBtn
              title={textStrings.enineOilTxt}
              value={valueObject.engineOil}
              onCangeValue={text =>
                changeValueFun({...valueObject, engineOil: text})
              }
              listData={enigineOilArr}
            />
            <Text
              style={{...TextStyles.tamaralogininputtxt, marginTop: h('2%')}}>
              {textStrings.freeServiceTitle2}
            </Text>
            <CustomDropDownBtn
              title={textStrings.freeServiceTitle2}
              value={valueObject.otherOils}
              onCangeValue={text =>
                changeValueFun({...valueObject, otherOils: text})
              }
              listData={oilsDataArr}
            />
            <Text
              style={{...TextStyles.tamaralogininputtxt, marginTop: h('2%')}}>
              {textStrings.freeServiceTitle3}
            </Text>
            <CustomDropDownBtn
              listSecDesign={true}
              title={textStrings.freeServiceTitle3}
              value={valueObject.filters}
              onCangeValue={text =>
                changeValueFun({...valueObject, filters: text})
              }
              listData={filtersDataArr}
            />
            {valueObject.filters?.length > 0 ? (
              <Text
                style={{...TextStyles.tamaralogininputtxt, marginTop: h('2%')}}>
                {textStrings.filterTypeNotSelected}
              </Text>
            ) : null}
            {valueObject.filters?.length > 0 ? (
              <View style={{...styles.cartPriceView, marginTop: 0}}>
                <View style={{width: '48%'}}>
                  <CustomBtn
                    bgColor={
                      selectFilterType === 'original' ? maincolor : WhiteColor
                    }
                    borderColor={maincolor}
                    secColor={
                      selectFilterType === 'original' ? WhiteColor : maincolor
                    }
                    title={textStrings.orignalTxtFilter}
                    clickfun={() => setselectFilterType('original')}
                  />
                </View>
                <View style={{width: '48%'}}>
                  <CustomBtn
                    title={textStrings.commercialTxtFilter}
                    bgColor={
                      selectFilterType === 'commercial' ? maincolor : WhiteColor
                    }
                    borderColor={maincolor}
                    secColor={
                      selectFilterType === 'commercial' ? WhiteColor : maincolor
                    }
                    clickfun={() => setselectFilterType('commercial')}
                  />
                </View>
              </View>
            ) : null}
            <Text
              style={{...TextStyles.tamaralogininputtxt, marginTop: h('2%')}}>
              {textStrings.supportServiceTxt}
            </Text>
            <CustomDropDownBtn
              title={textStrings.supportServiceTxt}
              value={valueObject.supportService}
              onCangeValue={text =>
                changeValueFun({...valueObject, supportService: text})
              }
              listData={supportDataArr}
            />
            {/* <Text
              style={{...TextStyles.tamaralogininputtxt, marginTop: h('2%')}}>
              {textStrings.freeServicesTxt}
            </Text>
            <CustomDropDownBtn
              title={textStrings.freeServicesTxt}
              value={valueObject.freeService}
              onCangeValue={text =>
                changeValueFun({...valueObject, freeService: text})
              }
              listData={freesupportDataArr}
            /> */}
            {/* <Text
              style={{...TextStyles.tamaralogininputtxt, marginTop: h('2%')}}>
              {textStrings.cashBackTxt}
            </Text>
            <View
              style={{
                ...styles.textInputCust,
                ...TextStyles.textinputfamilyclassAll,
                borderColor:
                  valueObject.cashBack?.length > 0 &&
                  valueObject.cashBack !== ''
                    ? textcolor
                    : c0color,
              }}>
              <Text style={TextStyles.textinputfamilyclassAll}>
                {valueObject.cashBack}
              </Text>
            </View> */}
            {productsArry?.length > 0 ? (
              <Text style={styles.cartHeadingTxt}>{textStrings.cartTxt}</Text>
            ) : null}
            {productsArry?.map(dat => {
              const title =
                dat?.referance === 'SupportServices'
                  ? getSupportServicesTitle(dat)
                  : isArabicLanguage
                  ? dat?.productNameArab
                  : dat?.productNameEng;
              return (
                <CartComp
                  title={title}
                  quantity={dat?.quantity}
                  id={dat?.id}
                  key={dat?.id}
                  newProdUpdate={(id, qunatity) => {
                    const newProduct = productsArry.map(dal => {
                      if (dal.id === id) {
                        return {...dal, quantity: qunatity};
                      } else {
                        return {...dal, qunatity: 1};
                      }
                    });
                    console.log('newProduct after newProdUpdate:', newProduct);
                    setproductsArry(newProduct);
                    setisDataUpdated(!isDataUpdated);
                  }}
                  removeCurrentProduct={() => {
                    const newProduct = productsArry.filter(
                      dal => dal.id !== dat?.id,
                    );
                    console.log(
                      'newProduct after removeCurrentProduct:',
                      newProduct,
                    );
                    setproductsArry(newProduct);
                    const checkValueObject =
                      dat?.referance === 'SupportServices'
                        ? 'supportService'
                        : dat?.referance === 'Tyres'
                        ? 'tire'
                        : dat?.referance === 'btteries'
                        ? 'battery'
                        : dat?.referance === 'Filters'
                        ? 'filters'
                        : dat?.referance === 'Oils'
                        ? 'otherOils'
                        : dat?.referance === 'engineOil'
                        ? 'engineOil'
                        : 'freeService';
                    changeValueFun({...valueObject, [checkValueObject]: ''});
                    setisDataUpdated(!isDataUpdated);
                  }}
                />
              );
            })}
            {productsArry?.length > 0 ? (
              <View style={styles.cartPriceView}>
                <Text
                  style={{...TextStyles.choiceinputinputxthead, width: 'auto'}}>
                  {textStrings.priceCodeTxt}
                </Text>
                <Text
                  style={{...TextStyles.choiceinputinputxthead, width: 'auto'}}>
                  {fianlPrice == 0 ? calculatePrice() : fianlPrice}{' '}
                  {textStrings.currencyTxt}
                </Text>
              </View>
            ) : null}
            {productsArry?.length > 0 ? (
              <View style={styles.cartPriceView}>
                <Text
                  style={{...TextStyles.choiceinputinputxthead, width: 'auto'}}>
                  {textStrings.taxCodeTxt}
                </Text>
                <Text
                  style={{...TextStyles.choiceinputinputxthead, width: 'auto'}}>
                  {findTaxFn(fianlPrice)} {textStrings.currencyTxt}
                </Text>
              </View>
            ) : null}
            {productsArry?.length > 0 ? (
              <View style={styles.cartPriceView}>
                <Text
                  style={{...TextStyles.choiceinputinputxthead, width: 'auto'}}>
                  {textStrings.oldPriceCodeTxt}
                </Text>
                <Text
                  style={{...TextStyles.choiceinputinputxthead, width: 'auto'}}>
                  {oldTotalPriceValue} {textStrings.currencyTxt}
                </Text>
              </View>
            ) : null}
            {productsArry?.length > 0 ? (
              <View style={styles.cartPriceView}>
                <Text
                  style={{...TextStyles.choiceinputinputxthead, width: 'auto'}}>
                  {textStrings.totalCodeTxt}
                </Text>
                <Text
                  style={{...TextStyles.choiceinputinputxthead, width: 'auto'}}>
                  {fianlPrice + findTaxFn(fianlPrice) + oldTotalPriceValue}{' '}
                  {textStrings.currencyTxt}
                </Text>
              </View>
            ) : null}
            <AppBtn
              title={textStrings.saveBTnTxt}
              clickfun={() => setsaveModalAlert(true)}
            />
          </ScrollView>
        </View>
      </View>
      <AwesomeAlert
        show={saveModalAlert}
        showProgress={false}
        title={textStrings.editOrderCartAlertMsg}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={textStrings.logoutYesTxt}
        confirmText={textStrings.logoutNoTxt}
        confirmButtonColor="transparent"
        onCancelPressed={CloseEditModal}
        onConfirmPressed={closeModalFun}
        confirmButtonTextStyle={{color: textcolor, fontSize: h('2.3%')}}
        cancelButtonColor="transparent"
        cancelButtonTextStyle={{color: redcolor, fontSize: h('2.3%')}}
        cancelButtonStyle={{marginRight: h('10%')}}
      />
    </>
  );
};

export default EditOrderScreen;

const styles = StyleSheet.create({
  cartPriceView: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: h('3%'),
  },
  cartHeadingTxt: {
    ...TextStyles.choiceinputinputxthead,
    width: '90%',
    alignSelf: 'center',
    marginVertical: h('2%'),
  },
  cartBtn: {
    width: w('8%'),
    height: w('8%'),
    borderRadius: w('8%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: WhiteColor,
    borderWidth: 1,
    borderColor: maincolor,
  },
  cartItmTxtView: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  cartBTnCont: {
    width: w('30%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fillCartView: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: h('0.5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  editImageDone: {
    height: h('10%'),
    resizeMode: 'contain',
    marginBottom: h('3%'),
  },
  editMainBtnContainer: {
    width: '90%',
    height: h('25%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  editContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  screenHomeLogo: {
    height: scale(54),
    width: w('50%'),
    resizeMode: 'contain',
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },

  otherContent: {
    width: '100%',
    flex: 1,
  },
  textInputCust: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.3,
    paddingHorizontal: w('4%'),
    height: h('6%'),
    backgroundColor: '#FAFCFF',
    fontSize: h('2.7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});
