import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ImageBackground,
  Platform,
  Dimensions
} from 'react-native'
import * as Speech from 'expo-speech'
import { useEffect, useState, useRef } from 'react'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const visualizerScale = 1.25

export default function App ({ navigation }) {
  //Speech functionality
  function speak (thingToSay) {
    Speech.speak(thingToSay)
  }

  //State variables
  const [time, onChangeTime] = useState('10')
  const [announce, changeAnnounce] = useState('On')
  const [frequency, onChangeFrequency] = useState('15')
  const [isCountDownActive, setIsCountDownActive] = useState(false)

  // refs
  const frequencyInput = useRef(null)
  const onSubmitTime = () => {
    frequencyInput.current.focus()
  }

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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          id='totalTime'
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 17,
            color: '#6DBDC9'
          }}
        >
          15:00
        </Text>
        <ImageBackground
          id='visualizer'
          style={{
            width: 115 * visualizerScale,
            height: 286 * visualizerScale,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          source={require('../assets/meter.png')}
        >
          <View
            id='visualizerMeterWrapper'
            style={{
              width: 56 * visualizerScale,
              height: 220 * visualizerScale
            }}
          >
            <View
              id='visualizerMeter'
              style={{
                backgroundColor: '#3FDBF2',
                width: '100%',
                height: '66%',
                borderRadius: 13 * visualizerScale,
                position: 'absolute',
                bottom: 0
              }}
            ></View>
          </View>
        </ImageBackground>

        <Text
          id='remainingTime'
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 51,
            color: '#007B8B'
          }}
        >
          10:47
        </Text>

        <Pressable
          id='startStop'
          onPress={() => {
            isCountDownActive
              ? setIsCountDownActive(false)
              : setIsCountDownActive(true)
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#007B8B',
            paddingVertical: 4,
            paddingHorizontal: 17,
            borderRadius: 99
          }}
        >
          {() => {
            if (isCountDownActive) {
              return (
                <>
                  <Image
                    source={require('../assets/play.png')}
                    style={{ height: 16, width: 16, marginRight: 6 }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins_400Regular',
                      fontSize: 17,
                      color: '#F0F2F5'
                    }}
                  >
                    Start
                  </Text>
                </>
              )
            } else {
              return (
                <>
                  <Image
                    source={require('../assets/stop.png')}
                    style={{ height: 16, width: 16, marginRight: 6 }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins_400Regular',
                      fontSize: 17,
                      color: '#F0F2F5',
                      paddingHorizontal: 1
                    }}
                  >
                    Stop
                  </Text>
                </>
              )
            }
          }}
        </Pressable>
      </View>

      <View id='controls' style={{ width: '100%' }}>
        <View id='time' style={styles.controlLine}>
          <Text style={styles.controlLabels}>Time</Text>
          <TextInput
            onChangeText={onChangeTime}
            placeholder={'10'}
            keyboardType='number-pad'
            returnKeyType='next'
            autoComplete='false'
            importantForAutofill='no'
            onSubmitEditing={() => {
              frequencyInput.current.focus()
            }}
            // blurOnSubmit='false'
            style={styles.controlInputs}
            placeholderTextColor='#58B0D1'
          />
        </View>
        <View id='announce' style={styles.controlLine}>
          <Text style={styles.controlLabels}>Announce</Text>
          <Pressable
            onPress={() => {
              announce ? changeAnnounce(false) : changeAnnounce(true)
            }}
          >
            <Text style={styles.controlInputs}>{announce ? 'On' : 'Off'}</Text>
          </Pressable>
        </View>
        <View id='frequency' style={styles.controlLine}>
          <Text style={styles.controlLabels}>Frequency</Text>
          <TextInput
            ref={frequencyInput}
            onChangeText={onChangeFrequency}
            placeholder={'15'}
            keyboardType='number-pad'
            returnKeyType='done'
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
