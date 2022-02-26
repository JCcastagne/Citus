import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react'
import AppLoading from 'expo-app-loading'

import HomeScreen from './screens/HomeScreen'
import Settings from './screens/Settings'

const getResources = () => {
  Promise.resolve()
}

export default function App () {
  const [resourcesLoaded, setResourcesLoaded] = useState(false)

  if (resourcesLoaded) {
    return <AppContainer />
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

function AppContainer () {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeScreen'
        screenOptions={({ navigation }) => ({
          cardOverlayEnabled: true,
          headerShown: false
        })}
      >
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='Settings' component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
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
