import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {useEffect} from 'react';
import Orientation from 'react-native-orientation-locker';
import firebase from '@react-native-firebase/app';
import {firebaseConfig} from './src/firebaseConfig'; // Adjust the path as necessary

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Root = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
