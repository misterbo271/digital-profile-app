import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry, Text, TextInput} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import RNFetchBlob from 'rn-fetch-blob';
import CodePush from 'react-native-code-push';
import {name as appName} from './app.json';
import App from './App';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1.5;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1.5;

require('moment/locale/en-gb');
require('moment/locale/vi');

window.FS = RNFetchBlob.fs;
window.File = RNFetchBlob.polyfill.File;
window.Fetch = new RNFetchBlob.polyfill.Fetch({
  auto: true,
  binaryContentTypes: ['image/', 'video/', 'audio/']
}).build();

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('dctan :: ' + JSON.stringify(remoteMessage));
});

const CBApp = CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL
})(App);

AppRegistry.registerComponent(appName, () => CBApp);
