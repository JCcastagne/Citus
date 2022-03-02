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

function timeConverter (seconds) {
  /**
   * Format seconds to HH/MM/SS.
   *
   * @seconds {seconds} seconds
   * @return {xx:xx:xx} || {xx:xx} - Hours(HH) being shown depends if there is 1 hour or more in total.
   *
   * @powtac: https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
   **/
  var sec_num = parseInt(minutes, 10)
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor((sec_num - hours * 3600) / 60)
  var seconds = sec_num - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }

  if (hours == 0) {
    return minutes + ':' + seconds
  } else {
    return hours + ':' + minutes + ':' + seconds
  }
}

export default function HomeScreen ({ navigation }) {
  //Speech functionality
  function speak (thingToSay) {
    Speech.speak(thingToSay)
  }

  //State variables
  const [time, onChangeTime] = useState('10')
  const [announce, setAnnounce] = useState(false)
  const [frequency, setFrequency] = useState('15')
  const [timerRunning, setTimerRunning] = useState(false)
  //State variables for user input
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')
  {
    console.log(timerRunning)
  }
  // refs
  const frequencyInput = useRef(null)

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
          {time}
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
            timerRunning === true
              ? setTimerRunning(false)
              : setTimerRunning(true)
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
            if (timerRunning === false) {
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
            style={styles.controlInputs}
            placeholderTextColor='#58B0D1'
          />
        </View>

        <View id='announce' style={styles.controlLine}>
          <Text style={styles.controlLabels}>Announce</Text>
          <Pressable
            onPress={() => {
              announce ? setAnnounce(false) : setAnnounce(true)
            }}
          >
            <Text style={styles.controlInputs}>{announce ? 'On' : 'Off'}</Text>
          </Pressable>
        </View>

        <View id='frequency' style={styles.controlLine}>
          <Text style={styles.controlLabels}>Frequency</Text>
          <TextInput
            ref={frequencyInput}
            onChangeText={setFrequency}
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
