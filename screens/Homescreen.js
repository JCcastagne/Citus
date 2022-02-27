import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ImageBackground,
  Platform
} from 'react-native'
import * as Speech from 'expo-speech'
import { useEffect, useState } from 'react'

export default function App ({ navigation }) {
  const speak = thingToSay => {
    Speech.speak(thingToSay)
  }

  const [time, onChangeTime] = useState('10')

  const [announce, changeAnnounce] = useState('On')
  let isAnnounceOn = true
  useEffect(() => {
    if (announce === 'On') {
      isAnnounceOn = true
    } else {
      isAnnounceOn = false
    }
  }, [announce])

  const [frequency, onChangeFrequency] = useState('15')

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#EBEDF0'
      }}
    >
      <StatusBar style='auto' />

      <View
        id='navigation'
        style={{
          ...styles.controlLine,
          width: '100%'
        }}
      >
        <Image
          source={require('../assets/citus_logo_small.png')}
          style={{ height: 26.74, width: 106.96, marginBottom: 2 }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('Settings')
          }}
        >
          <Image style={styles.icons} source={require('../assets/menu.png')} />
        </Pressable>
      </View>

      <View
        id='visualizer'
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ImageBackground
          style={{
            width: 115,
            height: 286,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          source={require('../assets/meter.png')}
        >
          <View
            style={{
              width: 56,
              height: 220
            }}
          >
            <View
              style={{
                backgroundColor: '#3FDBF2',
                width: '100%',
                height: '66%',
                borderRadius: 13,
                position: 'absolute',
                bottom: 0
              }}
            ></View>
          </View>
        </ImageBackground>
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
          <Pressable
            onPress={() => {
              announce === 'On' ? changeAnnounce('Off') : changeAnnounce('On')
            }}
          >
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
    paddingHorizontal: 34,
    paddingTop: Platform.OS === 'ios' ? 34 : 80,
    paddingBottom: Platform.OS === 'ios' ? 41 : 38
  },
  controlLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8
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
    width: 24,
    height: 24
  }
})
