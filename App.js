import React from 'react'
import { View, Button, Alert, Text, StyleSheet, Share, WebView, BackHandler, StatusBar } from 'react-native'
import createInvoke from 'react-native-webview-invoke/native'
var Geolocation = require('Geolocation');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      message: 'Get Geolocation',
      location: {},
      showBackButton: false
    };
  }
  webview: WebView
  invoke = createInvoke(() => this.webview)
  // webInitialize = () => {
    
  // }
  webWannaGet = () => {
    return this.state.location;
  }
  webWannaSet = (data) => {
    this.setState({ message: data })
  }

  handleBackPress = () => {
    this.webview.goBack();
    return true  ;
  }

  navStateChange = (state) => {
    let title = state.title;
    let isInclue = title.includes('波力雲羽集')
    this.setState({showBackButton: !isInclue})
  }
  
  componentDidMount() {
    this.invoke
      .define('get', this.webWannaGet)
      .define('set', this.webWannaSet)

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.getLocation();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  //get geolocation
  getLocation() {
    Geolocation.getCurrentPosition(
        location => {
            var coords = {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude
            }
            this.setState(previousState => (
              { location: coords }
            ))
        },
        error => {
          Alert.alert("获取位置失败："+ error)
        }
    );
 }


  render() {
    const backButton = <View
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 35,
      backgroundColor: '#c30d22',
    }}>
    <Button
      onPress={this.handleBackPress}
      title="< Back"
      color="#ffffff"
    />
  </View>;

    const patchPostMessageFunction = function() {
        var originalPostMessage = window.postMessage;
    
        var patchedPostMessage = function(message, targetOrigin, transfer) {
            originalPostMessage(message, targetOrigin, transfer);
        };
    
        patchedPostMessage.toString = function() {
            return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
        };
    
        window.postMessage = patchedPostMessage;
    };
    
    const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
      return (
        <View
          style={{
            flex: 1
          }}>
          <StatusBar
            barStyle="light-content"
          />
          <WebView
            injectedJavaScript={patchPostMessageJsCode}
            ref={w => this.webview = w}
            source={{uri: 'https://www.bonny-badminton.tw/'}}
            onMessage={this.invoke.listener}
            style={styles.container}
            onNavigationStateChange={this.navStateChange.bind(this)}
            />
          {this.state.showBackButton && backButton}
        </View>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})