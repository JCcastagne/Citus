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
  Dimensions,
  Linking
} from 'react-native'
import * as Speech from 'expo-speech'
import { useEffect, useState, useRef } from 'react'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

function timeConverter (seconds) {
  /**
   * Format seconds to HH/MM/SS.
   *
   * @seconds {seconds} seconds
   * @return {xx:xx:xx} || {xx:xx} - Hours(HH) being shown depends if there is 1 hour or more in total.
   *
   * @powtac: https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
   **/
  var sec_num = parseInt(seconds, 10)
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
  //Image source
  const [imageSource, setImageSource] = useState(
    'https://images.unsplash.com/photo-1644962986863-d075ee548966?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
  )
  const [imageCredits, setImageCredits] = useState({
    name: 'Matt Hans',
    profileURL: 'https://unsplash.com/@matthanns',
    websiteURL: 'https://unsplash.com'
  })

  //State variables
  const [totalTime, setTotalTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [announce, setAnnounce] = useState(false)
  const [frequency, setFrequency] = useState(30)
  const [timerRunning, setTimerRunning] = useState(false)
  useEffect(() => {
    setRemainingTime(totalTime)
  }, [totalTime])

  //State variables for user input countdown times
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(30)
  const [seconds, setSeconds] = useState(0)

  //convert all user input countdown times into seconds
  useEffect(() => {
    let hoursToSeconds = hours * 3600
    let minutesToSeconds = minutes * 60
    let totalSeconds = hoursToSeconds + minutesToSeconds + seconds
    // console.log(`
    // Total countdown user input time
    // hoursToSeconds:${hoursToSeconds}
    // minutesToSeconds:${minutesToSeconds}
    // seconds:${seconds}
    // totalSeconds:${totalSeconds}
    // `)
    setTotalTime(totalSeconds)
  }, [hours, minutes, seconds])

  //State variables for user input frequency times
  const [fHours, setFhours] = useState(0)
  const [fMinutes, setFminutes] = useState(0)
  const [fSeconds, setFseconds] = useState(30)

  //convert all user input frequency times into seconds
  useEffect(() => {
    let hoursToSeconds = fHours * 3600
    let minutesToSeconds = fMinutes * 60
    let totalSeconds = hoursToSeconds + minutesToSeconds + fSeconds
    // console.log(`
    // Frequency user input time
    // fHoursToSeconds:${hoursToSeconds}
    // fMinutesToSeconds:${minutesToSeconds}
    // fSeconds:${seconds}
    // totalSeconds:${totalSeconds}
    // `)
    setFrequency(totalSeconds)
  }, [fHours, fMinutes, fSeconds])

  //Timer countdown functionality
  const [intervalId, setIntervalId] = useState(0)
  const toggleTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(0)
      return
    }

    const newIntervalId = setInterval(() => {
      setRemainingTime(remainingTime => remainingTime - 1)
    }, 1000)
    setIntervalId(newIntervalId)
  }

  //Timer announce functionality
  const [timeToAnnounce, setTimeToAnnounce] = useState(0)
  useEffect(() => {
    setTimeToAnnounce(totalTime - frequency)
  }, [totalTime, frequency])

  useEffect(() => {
    if (remainingTime === timeToAnnounce) {
      speak(remainingTime)
      setTimeToAnnounce(timeToAnnounce => timeToAnnounce - frequency)
    }
  }, [remainingTime])

  //Speech functionality
  function speak (time) {
    if (!announce) {
      return
    }
    time = timeConverter(time)

    let timeSegments = time.split(':')

    if (timeSegments[2]) {
      Speech.speak(
        `${timeSegments[0]} hours ${timeSegments[1]} minutes and ${timeSegments[2]} seconds remaining`
      )
    } else {
      Speech.speak(
        `${timeSegments[0]} minutes and ${timeSegments[1]} seconds remaining`
      )
    }
  }

  //SettingViewBackground
  function setViewBackground () {
    let accessKey = `HB-4Z23pQJyXP-jlu7rzYNpvecL_XivjIqhuEVR1-wU`
    let url = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&query=landscape-forest-lake?color=blue`

    let URLparams = {
      width: 681,
      height: 772,
      fit: 'crop'
    }

    let postFetchParams = `&w=${URLparams.width}&h=${URLparams.height}&fit=${URLparams.fit}`

    async function getImageOfTheDay () {
      await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${accessKey}`,
          'Content-Type': 'application/json',
          'Accept-Version': 'v1'
        }
      })
        .then(resp => {
          if (resp.ok) {
            console.log(`good response for getImageOfTheDay()`)
            return resp.json()
          } else {
            throw new Error(resp.status)
          }
        })
        .then(data => {
          let imageOfTheDayURL = `${data.urls.raw}${postFetchParams}`
          setImageSource(imageOfTheDayURL)
          setImageCredits({
            name: `${data.user.first_name} ${data.user.last_name}`,
            profileURL: `${data.user.links.html}`,
            websiteURL: 'https://unsplash.com'
          })
        })
        .catch(err => {
          let msg = `Unable to load image of the day`
          console.log(err, msg)
        })
    }
    getImageOfTheDay()
  }
  // useEffect(() => {
  //   setViewBackground()
  //   console.log(imageSource)
  // }, [imageSource])

  // refs
  const [
    setMinutesInput,
    setSecondsInput,
    setFminutesInput,
    setFsecondsInput
  ] = Array.from({ length: 4 }, () => useRef(null))

  // useEffect(() => {
  //   console.log(`
  //   remainingTime:${remainingTime}
  //   announce:${announce}
  //   frequency:${frequency}
  //   timerRunning:${timerRunning}
  //   hours:${hours}
  //   minutes:${minutes}
  //   seconds:${seconds}
  //   `)
  // }, [
  //   remainingTime,
  //   announce,
  //   frequency,
  //   timerRunning,
  //   hours,
  //   minutes,
  //   seconds
  // ])

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#F2F2F2',
        paddingTop: 80
      }}
    >
      <StatusBar style='auto' />

      <View
        id='navigation'
        style={{
          ...styles.controlLine,
          width: '100%',
          paddingHorizontal: 34,
          padding: 0
        }}
      >
        <Text style={styles.title}>Citus</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Settings')
          }}
        >
          <View style={styles.navIcon}>
            <Image
              style={styles.icons}
              source={require('../assets/menu.png')}
            />
          </View>
        </Pressable>
      </View>

      <ImageBackground
        id='visualizer'
        style={{
          marginTop: 34,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF',
          height: 384,
          width: width - 34
        }}
        source={{ uri: imageSource }}
      >
        <View
          id='timeInfo'
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <View id='remainingTime'>
            <Text
              id='remainingTime'
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 51,
                color: '#272727',
                marginBottom: -4
              }}
            >
              {remainingTime === 0 ? '00:00' : timeConverter(remainingTime)}
            </Text>
            <Text
              id='remainingTimeLabel'
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 14,
                color: '#272727'
              }}
            >
              Time left
            </Text>
          </View>

          <View id='totalTime' style={{ alignItems: 'flex-end' }}>
            <Text
              id='totalTime'
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 22,
                color: '#272727A8',
                marginBottom: 7
              }}
            >
              {timeConverter(totalTime)}
            </Text>
            <Text
              id='totalTimeLabel'
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 14,
                color: '#272727A8'
              }}
            >
              Total time
            </Text>
          </View>
        </View>

        <Pressable
          id='startStop'
          onPress={() => {
            if (timerRunning == true) {
              setTimerRunning(false)
              toggleTimer()
            } else {
              setRemainingTime(totalTime)
              setTimerRunning(true)
              toggleTimer()
            }
          }}
          style={{ width: '100%' }}
        >
          {() => {
            if (timerRunning === false) {
              return (
                <>
                  <ImageBackground
                    source={require('../assets/startButtonBG.png')}
                    style={{
                      height: 49,
                      width: '100%',
                      borderRadius: 14,
                      overflow: 'hidden',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row'
                    }}
                  >
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
                  </ImageBackground>
                </>
              )
            } else {
              return (
                <>
                  <ImageBackground
                    source={require('../assets/startButtonBG.png')}
                    style={{
                      height: 49,
                      width: '100%',
                      borderRadius: 14,
                      overflow: 'hidden',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: 2
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#FFF',
                        height: '100%',
                        width: '100%',
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                      }}
                    >
                      <Image
                        source={require('../assets/stop.png')}
                        style={{ height: 16, width: 16, marginRight: 6 }}
                      />
                      <Text
                        style={{
                          fontFamily: 'Poppins_400Regular',
                          fontSize: 17,
                          color: '#16A7CE',
                          paddingHorizontal: 1
                        }}
                      >
                        Stop
                      </Text>
                    </View>
                  </ImageBackground>
                </>
              )
            }
          }}
        </Pressable>

        <View id='imageCredits'>
          <Text>Picture by</Text>
          <Text
            onPress={() => {
              Linking.openURL(`${imageCredits.profileURL}`)
            }}
          >{`${imageCredits.name}`}</Text>
          <Text>on</Text>
          <Text
            onPress={() => {
              Linking.openURL(`${imageCredits.websiteURL}`)
            }}
          >
            Unsplash
          </Text>
        </View>
      </ImageBackground>

      <View id='controls' style={styles.controlsContainer}>
        <View id='time' style={styles.controlLine}>
          <Text style={styles.controlLabels}>Time</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <TextInput
              onChangeText={val => {
                val = parseInt(val)
                if (val > 24) {
                  val = 24
                }
                if (val.toString().length === 2) {
                  setHours(val)
                  setMinutesInput.current.focus()
                } else {
                  setHours(val)
                }
              }}
              placeholder={Platform.OS === 'ios' ? '00' : '00 '}
              keyboardType='number-pad'
              returnKeyType='next'
              autoComplete='false'
              importantForAutofill='no'
              maxLength={2}
              onSubmitEditing={() => {
                setMinutesInput.current.focus()
              }}
              style={styles.controlInputs}
              placeholderTextColor='#272727A8'
            />
            <Text style={styles.controlInputSpacer}>:</Text>
            <TextInput
              ref={setMinutesInput}
              onChangeText={val => {
                val = parseInt(val)
                if (val > 60) {
                  val = 60
                }
                if (val.toString().length === 2) {
                  setMinutes(val)
                  setSecondsInput.current.focus()
                } else {
                  setMinutes(val)
                }
              }}
              placeholder={Platform.OS === 'ios' ? '30' : '30 '}
              keyboardType='number-pad'
              returnKeyType='next'
              autoComplete='false'
              importantForAutofill='no'
              maxLength={2}
              onSubmitEditing={() => {
                setSecondsInput.current.focus()
              }}
              style={styles.controlInputs}
              placeholderTextColor='#272727A8'
            />
            <Text style={styles.controlInputSpacer}>:</Text>
            <TextInput
              ref={setSecondsInput}
              onChangeText={val => {
                val = parseInt(val)
                if (val > 60) {
                  val = 60
                }
                if (val.toString().length === 2) {
                  setSeconds(val)
                  setSecondsInput.current.blur()
                } else {
                  setSeconds(val)
                }
              }}
              placeholder={Platform.OS === 'ios' ? '00' : '00 '}
              keyboardType='number-pad'
              returnKeyType='done'
              autoComplete='false'
              importantForAutofill='no'
              maxLength={2}
              style={styles.controlInputs}
              placeholderTextColor='#272727A8'
            />
          </View>
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <TextInput
              onChangeText={val => {
                val = parseInt(val)
                if (val > 23) {
                  val = 23
                }
                if (val.toString().length === 2) {
                  setFhours(val)
                  setFminutesInput.current.focus()
                } else {
                  setFhours(val)
                }
              }}
              placeholder={Platform.OS === 'ios' ? '00' : '00 '}
              keyboardType='number-pad'
              returnKeyType='done'
              autoComplete='false'
              importantForAutofill='no'
              maxLength={2}
              onSubmitEditing={() => {
                setFminutesInput.current.focus()
              }}
              style={styles.controlInputs}
              placeholderTextColor='#272727A8'
            />
            <Text style={styles.controlInputSpacer}>:</Text>
            <TextInput
              ref={setFminutesInput}
              onChangeText={val => {
                val = parseInt(val)
                if (val > 59) {
                  val = 59
                }
                if (val.toString().length === 2) {
                  setFminutes(val)
                  setFsecondsInput.current.focus()
                } else {
                  setFminutes(val)
                }
              }}
              placeholder={Platform.OS === 'ios' ? '00' : '00 '}
              keyboardType='number-pad'
              returnKeyType='done'
              autoComplete='false'
              importantForAutofill='no'
              maxLength={2}
              onSubmitEditing={() => {
                setFsecondsInput.current.focus()
              }}
              style={styles.controlInputs}
              placeholderTextColor='#272727A8'
            />
            <Text style={styles.controlInputSpacer}>:</Text>
            <TextInput
              ref={setFsecondsInput}
              onChangeText={val => {
                val = parseInt(val)
                if (val > 59) {
                  val = 59
                }
                if (val.toString().length === 2) {
                  setFseconds(val)
                  setFsecondsInput.current.blur()
                } else {
                  setFseconds(val)
                }
              }}
              placeholder={Platform.OS === 'ios' ? '30' : '30 '}
              keyboardType='number-pad'
              returnKeyType='done'
              autoComplete='false'
              importantForAutofill='no'
              maxLength={2}
              onSubmitEditing={() => {
                setFsecondsInput.current.blur()
              }}
              style={styles.controlInputs}
              placeholderTextColor='#272727A8'
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
    // justifyContent: 'center'
  },
  controlsContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 34,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 34,
    paddingBottom: Platform.OS === 'ios' ? 41 : 20,
    shadowColor: '#AEB9C2',
    shadowRadius: 68,
    shadowOffset: { height: 8 },
    shadowOpacity: 0.56,
    elevation: 20,
    position: 'absolute',
    bottom: 0
  },
  controlLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10
  },
  controlLabels: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#272727A8'
  },
  controlInputs: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    color: '#272727A8'
  },
  controlInputSpacer: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    color: '#272727A8',
    // lineHeight: Platform.OS === 'android' ? 18 : 0
    transform:
      Platform.OS === 'ios' ? [{ translateY: -1 }] : [{ translateY: -4 }],
    paddingRight: Platform.OS === 'ios' ? 0 : 2
  },
  title: {
    fontSize: 34,
    fontFamily: 'Poppins_700Bold',
    color: '#272727'
  },
  icons: {
    width: 28,
    height: 28
  },
  navIcon: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 14,
    shadowColor: '#AEB9C2',
    shadowRadius: 34,
    shadowOffset: { height: 8 },
    shadowOpacity: 42
  }
})
