import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import AppLoading from 'expo-app-loading'

export default function App () {
  const [resourcesLoaded, setResourcesLoaded] = useState(false)

  if (resourcesLoaded) {
    return (
      <View>
        <StatusBar style='auto' />
        <AppContainer />
      </View>
    )
  } else {
    return (
      <AppLoading
        startAsync={getResources}
        onFinish={() => {
          //minimum timeout for 2s so that we can see splashscreen
          setTimeout(() => {
            setResourcesLoaded(true)
          }, 2000)
        }}
        onError={console.warn}
      />
    )
  }
}

function AppContainer () {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
