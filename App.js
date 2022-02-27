import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import HomeScreen from './screens/HomeScreen'
import Settings from './screens/Settings'

export default function App () {
  const [resourcesLoaded, setResourcesLoaded] = useState(false)

  let [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  })

  const getResources = () => {
    if (fontLoaded) {
      Promise.resolve()
    }
  }

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
          headerShown: false,
          cardShadowEnabled: true,
          cardOverlayEnabled: true
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
