import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {maincolor} from '../assets/Colors';
import {postDataWithRef} from '../DataBase/databaseFunction';

const CompleteOrderModal = ({
  visible,
  onClose,
  inputFields,
  handleInputChange,
  handleNext,
  orderDetails,
  userName,
}) => {
  const [dropdownValues, setDropdownValues] = useState(Array(26).fill(null));

  // Pre-fill input fields with orderDetails and userName if available
  useEffect(() => {
    console.log(`???????????????`, orderDetails, userName);
    const carName = orderDetails?.selectedCar?.carName || '';
    const carNameParts = carName.split(' ');

    const carBrand = carNameParts[0] || '';
    const carModel = carNameParts[1] || '';
    const modelYear = carNameParts[2] || '';

    handleInputChange('customerName', userName);
    handleInputChange('carModel', carModel);
    handleInputChange('modelYear', modelYear);
    handleInputChange('carBrand', carBrand);
  }, [userName, orderDetails, handleInputChange]);

  const handleComplete = async () => {
    const allData = {
      ...inputFields,
      dropdownValues,
    };
    const orderid = orderDetails.id;
    console.log(`😎`, allData, orderid);

    await postDataWithRef('teaminvoiceform', orderid, allData);
  };

  const renderInputField = (placeholder, valueKey) => (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={inputFields[valueKey]}
      onChangeText={value => handleInputChange(valueKey, value)}
      placeholderTextColor="#999" // Set placeholder text color
    />
  );

  const renderDropdownField = (label, index) => (
    <View style={styles.dropdownContainer} key={index}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        data={[
          {label: 'I', value: 'I'},
          {label: 'R', value: 'R'},
          {label: 'I/R', value: 'I/R'},
        ]}
        labelField="label"
        valueField="value"
        placeholder="Select"
        value={dropdownValues[index]}
        onChange={item => {
          const newValues = [...dropdownValues];
          newValues[index] = item.value;
          setDropdownValues(newValues);
        }}
        renderRightIcon={() => <Text style={styles.dropdownArrow}>▼</Text>}
      />
    </View>
  );

  const dropdownFields = [
    'Oil Filter',
    'AC Filter',
    'Spark Plugs',
    'Wiper',
    'Fuel Filter',
    'Tires and Check Tire Air Pressure',
    'Transmission Performance Check (if applicable)',
    'Brake System Check',
    'Bolts and Nuts',
    'Steering Operation and Linkages',
    'Fuel Lines and Hoses',
    'Safety Belts and Locks',
    'Inspect Filter Battery',
    'Engine Oil',
    'Air Intake Element',
    'Drive Belt',
    'Cooling System/Coolant Level',
    'Wiper Liquid',
    'Battery Fluid',
    'Tank Solution Injector Cleaner',
    'Brake Fluid',
    'Front and Rear Suspension',
    'Drive Dust Boots',
    'Exhaust System',
    'Exterior Interior Lights',
    'Tire Rotation',
  ];

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Customer Details</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {renderInputField('Customer Name', 'customerName')}
            {renderInputField('Branch', 'branch')}
            {renderInputField('Invoice Date', 'invoiceDate')}
            {renderInputField('Invoice Number', 'invoiceNumber')}
            {renderInputField('Phone Number', 'phoneNumber')}
            {renderInputField('Car Model', 'carModel')}
            {renderInputField('Model Year', 'modelYear')}
            {renderInputField('Car Brand', 'carBrand')}
            {renderInputField('VIN', 'vin')}
            {renderInputField('Team Name', 'teamName')}
            {renderInputField('Team Number', 'teamNumber')}
            {renderInputField('Kilometer', 'kilometer')}

            {dropdownFields.map((label, index) =>
              renderDropdownField(label, index),
            )}

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                <Text style={styles.modalButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  handleComplete();
                  handleNext();
                }}>
                <Text style={styles.modalButtonText}>Completed</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CompleteOrderModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: 'black',
  },
  dropdownContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdownLabel: {
    width: '65%',
    fontSize: 16,
    color: 'black',
  },
  dropdown: {
    width: '30%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
  dropdownArrow: {
    fontSize: 18,
    color: 'black',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: maincolor,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
