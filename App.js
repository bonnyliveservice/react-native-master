import React from 'react'
import { StyleSheet, WebView, View, Text, Button, Share } from 'react-native'

export default class App extends React.Component {
  testShare () {
    Share.share(
      {
        url: 'https://www.ptt.cc/bbs/Soft_Job/M.1534771650.A.5D5.html'
      })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg))
  }

  render () {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1
        }}>
        <WebView source={{uri: 'https://staging.bonnylive.biz/'}} style={styles.container} />
        <View
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 50, justifyContent: 'flex-end', alignItems: 'center'
          }}>
        >
          <Button
            onPress={this.testShare.bind(this)}
            title='Share'
            color='#fff'
          />
        </View>
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
