import React from 'react'
import { StyleSheet, WebView } from 'react-native'

export default class App extends React.Component {
  render () {
    return (
      <WebView source={{uri: 'https://www.bonny-badminton.tw/'}} style={styles.container} />
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
