import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import {WhiteColor, maincolor, redcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import Entypo from 'react-native-vector-icons/Entypo';
const CartComp = ({
  title,
  quantity,
  id,
  newProdUpdate,
  removeCurrentProduct,
}) => {
  // const [quantityValue, setquantityValue] = useState(0);
  // useEffect(() => {
  //   setquantityValue(quantity);
  // }, [quantity]);
  return (
    <View style={styles.fillCartView}>
      <View style={styles.cartItmTxtView}>
        <Text style={TextStyles.choiceinputbtntxt}>{title}</Text>
      </View>
      <View style={styles.cartBTnCont}>
        <TouchableOpacity
          onPress={() => {
            newProdUpdate(id, quantity - 1);
          }}
          style={styles.cartBtn}>
          <Entypo name="minus" size={w('5%')} color={WhiteColor} />
        </TouchableOpacity>
        <Text style={TextStyles.choiceinputbtntxt}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            newProdUpdate(id, quantity + 1);
          }}
          style={styles.cartBtn}>
          <Entypo name="plus" size={w('5%')} color={WhiteColor} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={removeCurrentProduct}
        style={styles.closeBtnStyle}>
        <Entypo name="cross" size={w('5%')} color={WhiteColor} />
      </TouchableOpacity>
    </View>
  );
};

export default CartComp;

const styles = StyleSheet.create({
  closeBtnStyle: {
    width: w('8%'),
    height: w('8%'),
    borderRadius: w('8%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: redcolor,
    borderWidth: 1,
    borderColor: redcolor,
    marginLeft: 10,
  },
  cartBtn: {
    width: w('8%'),
    height: w('8%'),
    borderRadius: w('8%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: maincolor,
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
    width: w('26%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fillCartView: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: h('2%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
