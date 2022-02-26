import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native'
import * as Speech from 'expo-speech'

export default function App () {
  const speak = () => {
    let thingToSay = 'testing the speech feature'
    Speech.speak(thingToSay)
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Press to hear some words' onPress={speak} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
