import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {borderColor, c0color, textcolor} from '../assets/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {w, h} from 'react-native-responsiveness';
import TextStyles from '../Text/TextStyles';

const DateSelectorModelInput = ({
  placeHolder,
  value,
  setValue,
  isSelectedValue,
}) => {
  const [showModal, setshowModal] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => {
          setshowModal(!showModal);
        }}>
        <EvilIcons name="calendar" color={borderColor} size={h('4.5%')} />
        <Text
          style={{
            ...TextStyles.Myorderbtntxt,
            flex: 1,
            lineHeight: h('6%'),
            textAlign: 'left',
            color: isSelectedValue ? textcolor : c0color,
          }}>
          {isSelectedValue
            ? new Date(value ? value : new Date()).toDateString()
            : placeHolder}
        </Text>
      </TouchableOpacity>
      <DatePicker
        mode="date"
        modal
        open={showModal}
        date={value ? value : new Date()}
        onConfirm={date => {
          setshowModal(!showModal);
          if (value) {
            setValue(date);
          }
        }}
        onCancel={() => {
          setshowModal(!showModal);
        }}
      />
    </>
  );
};

export default DateSelectorModelInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: h('6%'),
    backgroundColor: '#FBFBFB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: borderColor,
    overflow: 'hidden',
    paddingHorizontal: w('1%'),
  },
});
