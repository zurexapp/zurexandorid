import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {greencolor, textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';

const ChoiceInputField = ({
  title,
  value,
  setValue,
  firstInput,
  secInput,
  thirdInput,
  showthem,
  setInputVCalue,
}) => {
  const [isSelectedExam, setisSelectedExam] = useState(false);
  const [selectedOptionValue, setselectedOptionValue] = useState('');
  const [isShowInputField, setisShowInputField] = useState(false);
  return (
    <>
      {((!firstInput && !secInput && !thirdInput) || showthem) && (
        <View style={styles.optionContainerMain}>
          <View style={styles.optionContainer}>
            <View style={styles.firstContainer}>
              <View
                style={{
                  ...styles.mainbtndiviconcont,
                  borderColor: isSelectedExam ? greencolor : 'rgba(0,0,0,0.3)',
                }}>
                <Icon
                  name="done"
                  size={h('2.3%')}
                  color={isSelectedExam ? greencolor : 'white'}
                />
              </View>

              <Text
                style={{
                  ...TextStyles.choiceinputmainbtndivseltxt,
                  textAlign: 'left',
                }}>
                {title}
              </Text>
            </View>
            <View style={styles.secContainer}>
              <TouchableOpacity
                onPress={() => {
                  setselectedOptionValue('original');
                  setisShowInputField(true);
                  setInputVCalue(true);
                }}
                style={styles.innerbtn}>
                <Text
                  style={{
                    ...TextStyles.choiceinputbtntxt,
                    color:
                      selectedOptionValue === 'original' || isSelectedExam
                        ? greencolor
                        : textcolor,
                  }}>
                  أصلي
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setselectedOptionValue('commercial');
                  setisShowInputField(true);
                  setInputVCalue(true);
                }}
                style={styles.innerbtn}>
                <Text
                  style={{
                    ...TextStyles.choiceinputbtntxt,
                    color:
                      selectedOptionValue === 'commercial' || isSelectedExam
                        ? greencolor
                        : textcolor,
                  }}>
                  تجاري
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isShowInputField && (
            <View style={styles.iNPUTmAINcONTAINER}>
              <Text style={TextStyles.choiceinputinputxthead}>
                {selectedOptionValue === 'original'
                  ? `سعر الأصل ${title ? title?.toLowerCase() : ''}`
                  : `السعر التجاري${title ? title?.toLowerCase() : ''}`}
              </Text>
              <TextInput
                style={[styles.inputField, TextStyles.textinputfamilyclassAll]}
                placeholder="سعر"
                keyboardType="number-pad"
                value={value}
                onChangeText={text => setValue(text)}
                onEndEditing={() => {
                  setisShowInputField(false);
                  setisSelectedExam(true);
                  setInputVCalue(false);
                }}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default ChoiceInputField;

const styles = StyleSheet.create({
  optionContainerMain: {
    width: '100%',
    alignSelf: 'center',
  },
  optionContainer: {
    width: '100%',
    height: h('7.5%'),
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: h('2%'),
  },
  firstContainer: {
    height: '100%',
    width: '46%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  secContainer: {
    height: '100%',
    width: '51%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },

  mainbtndiviconcont: {
    height: h('3.7%'),
    width: h('3.7%'),
    borderRadius: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  innerbtn: {
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  iNPUTmAINcONTAINER: {
    width: '100%',
    height: h('25%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: h('2%'),
  },
  inputField: {
    width: '100%',
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    height: h('7%'),
    fontSize: h('2.3%'),
    paddingHorizontal: w('2%'),
    marginTop: h('1%'),
  },
});
