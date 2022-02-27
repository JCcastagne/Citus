import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Pressable, TextInput } from 'react-native'
import * as Speech from 'expo-speech'
import { useState } from 'react'

export default function App ({ navigation }) {
  const speak = thingToSay => {
    Speech.speak(thingToSay)
  }

  const [time, onChangeTime] = useState('10')
  const [frequency, onChangeFrequency] = useState('15')

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Pressable
        id='navigation'
        onPress={() => {
          navigation.navigate('Settings')
        }}
      >
        <Image
          style={{ width: 24, height: 24 }}
          source={require('../assets/menu.png')}
        />
      </Pressable>

      <View id='visualizer' style={{ width: '100%' }}>
        <View
          style={{ height: 40, width: '100%', backgroundColor: '#000' }}
        ></View>
      </View>

      <View id='controls'>
        <View>
          <Text>Time</Text>
          <TextInput
            onChangeText={onChangeTime}
            placeholder={'10'}
            keyboardType='number-pad'
          />
        </View>
        <View>
          <Text>Announce</Text>
          <Pressable>
            <Text>On</Text>
            <Text>Off</Text>
          </Pressable>
        </View>
        <View>
          <Text>Frequency</Text>
          <TextInput
            onChangeText={onChangeFrequency}
            placeholder={'15'}
            keyboardType='number-pad'
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 17
  }
})
