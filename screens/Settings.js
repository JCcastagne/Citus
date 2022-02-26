import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function Settings () {
  return (
    <View>
      <StatusBar style='auto' />
      <Text>Settings</Text>
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
