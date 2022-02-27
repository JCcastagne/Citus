import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Pressable, TextInput } from 'react-native'
import * as Speech from 'expo-speech'
import { useEffect, useState } from 'react'

export default function App ({ navigation }) {
  const speak = thingToSay => {
    Speech.speak(thingToSay)
  }

  const [time, onChangeTime] = useState('10')

  const [announce, onChangeAnnounce] = useState(() => () => {
    console.log('here')
    return 'void'
  })

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
        <Image style={styles.icons} source={require('../assets/menu.png')} />
      </Pressable>

      <View id='visualizer' style={{ width: '100%' }}>
        <View
          style={{ height: 40, width: '100%', backgroundColor: '#000' }}
        ></View>
      </View>

      <View id='controls' style={{ width: '100%' }}>
        <View id='time' style={styles.controlLine}>
          <Text style={styles.controlLabels}>Time</Text>
          <TextInput
            onChangeText={onChangeTime}
            placeholder={'10'}
            keyboardType='number-pad'
            autoComplete='false'
            importantForAutofill='no'
            style={styles.controlInputs}
            placeholderTextColor='#58B0D1'
          />
        </View>
        <View id='announce' style={styles.controlLine}>
          <Text style={styles.controlLabels}>Announce</Text>
          <Pressable onPress={onChangeAnnounce}>
            <Text style={styles.controlInputs}>{announce}</Text>
          </Pressable>
        </View>
        <View id='frequency' style={styles.controlLine}>
          <Text style={styles.controlLabels}>Frequency</Text>
          <TextInput
            onChangeText={onChangeFrequency}
            placeholder={'15'}
            keyboardType='number-pad'
            autoComplete='false'
            importantForAutofill='no'
            style={styles.controlInputs}
            placeholderTextColor='#58B0D1'
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
  },
  controlLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  controlLabels: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
    color: '#58B0D1'
  },
  controlInputs: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 17,
    color: '#58B0D1'
  },
  icons: {
    width: 36,
    height: 36
  }
})
