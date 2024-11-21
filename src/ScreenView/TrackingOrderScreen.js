import {StyleSheet, View, Image} from 'react-native';
import React, {useRef} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {maincolor} from '../assets/Colors';
import {useTranslation} from '../Text/TextStrings';
const TrackingOrderScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const {latitude, longitude} = route?.params;
  const map = useRef(null);
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={' '}
        iconName1={'left'}
        firstbtnFun={() => navigation.goBack()}
      />
      <View style={styles.otherContent}>
        <MapView
          ref={map}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{width: '100%', height: h('86%')}}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            pinColor={maincolor}
            title={textStrings.recipiantAddressTxt}
          />
        </MapView>
      </View>
    </View>
  );
};

export default TrackingOrderScreen;

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
});
