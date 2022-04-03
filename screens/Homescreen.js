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

export default function Homescreen ({ navigation }) {
  //Image source
  const [imageSource, setImageSource] = useState(
    'https://images.unsplash.com/photo-1644962986863-d075ee548966?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
  )
  const [imageCredits, setImageCredits] = useState({
    name: 'Matt Hans',
    profileURL: 'https://unsplash.com/@matthanns',
    websiteURL: 'https://unsplash.com'
  })

  //State variables for timer
  const [totalTime, setTotalTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [announce, setAnnounce] = useState(false)
  const [frequency, setFrequency] = useState(30)
  const [timerRunning, setTimerRunning] = useState(false)
  const [progressBar, setProgressBar] = useState(100)
  useEffect(() => {
    setRemainingTime(totalTime)
  }, [totalTime])
  useEffect(() => {
    let progressPercentage = (remainingTime * 100) / totalTime
    setProgressBar(progressPercentage)
  }, [remainingTime])

  //State variables for user input countdown times
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(30)
  const [seconds, setSeconds] = useState(0)

  //convert all user input countdown times into seconds
  useEffect(() => {
    if (isNaN(hours)) {
      setHours(0)
    }
    if (isNaN(minutes)) {
      setMinutes(0)
    }
    if (isNaN(seconds)) {
      setSeconds(0)
    }
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
    if (isNaN(fHours)) {
      setFhours(0)
    }
    if (isNaN(fMinutes)) {
      setFminutes(0)
    }
    if (isNaN(fSeconds)) {
      setFseconds(0)
    }
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
    if (remainingTime === timeToAnnounce && timerRunning) {
      if (remainingTime <= 0) {
        console.log(remainingTime)
        setTimerRunning(false)
        toggleTimer()
        Speech.speak('countdown completed')
      } else {
        speak(remainingTime)
        setTimeToAnnounce(timeToAnnounce => timeToAnnounce - frequency)
      }
    }
  }, [remainingTime])

  //Speech functionality
  function speak (time) {
    if (!announce) {
      return
    }
    time = timeConverter(time)

    let timeSegments = time.split(':')

    //trim leading 0's
    timeSegments.forEach((segment, index) => {
      // console.log(segment)
      if (segment[0] === '0') {
        timeSegments[index] = segment[1]
      }
    })

    if (timeSegments[2]) {
      Speech.speak(
        `${timeSegments[0]} hours ${timeSegments[1]} minutes and ${timeSegments[2]} seconds remaining`
      )
    } else if (timeSegments[1]) {
      Speech.speak(
        `${timeSegments[0]} minutes and ${timeSegments[1]} seconds remaining`
      )
    } else {
      Speech.speak(`${timeSegments[1]} seconds remaining`)
    }
  }

  //Setting View Background
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
  //   timeToAnnounce:${timeToAnnounce}
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
        backgroundColor: styleVariables.white,
        paddingTop: 80
      }}
    >
      <StatusBar style='auto' />

      {/* visualizerBackgroundBlur */}
      <Image
        id='visualizerBackgroundBlur'
        style={{
          width: width,
          height: height,
          position: 'absolute',
          top: 45
          //top: 80 (top padding for custom safeAreaView)
        }}
        source={require('../assets/visualizerBackgroundBlur.png')}
      ></Image>

      {/* navigation */}
      <View id='navigation' style={styles.navigation}>
        <Text
          style={[
            styleVariables.fontSizes.title,
            { color: styleVariables.colors.black }
          ]}
        >
          Citus
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Settings')
          }}
        >
          <View style={styles.navIconButton}>
            <Image
              style={styles.navIcons}
              source={require('../assets/menu.png')}
            />
          </View>
        </Pressable>
      </View>

      <ImageBackground
        id='visualizer'
        style={{
          marginTop: 30,
          backgroundColor: '#FFF',
          height: 384,
          width: width - 34,
          borderRadius: 28,
          overflow: 'hidden'
        }}
        source={{ uri: imageSource }}
      >
        <ImageBackground
          id='gradientOverlay'
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 384,
            width: width - 34,
            borderRadius: 28,
            overflow: 'hidden',
            paddingTop: 25,
            paddingHorizontal: 25
          }}
          source={require('../assets/photo-of-the-dayGradientOverlay.png')}
        >
          <View
            id='timeInfo'
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              width: '100%'
            }}
          >
            <View id='remainingTime'>
              <Text
                id='remainingTime'
                style={[
                  styleVariables.fontSizes.countDown,
                  { color: styleVariables.colors.black }
                ]}
              >
                {remainingTime === 0 ? '00:00' : timeConverter(remainingTime)}
              </Text>
              <Text
                id='remainingTimeLabel'
                style={[
                  styleVariables.fontSizes.callout,
                  { color: styleVariables.colors.black }
                ]}
              >
                Time left
              </Text>
            </View>

            <View
              id='totalTime'
              style={{ alignItems: 'flex-end', opacity: 0.66 }}
            >
              <Text
                id='totalTime'
                style={[
                  styleVariables.fontSizes.subTitle,
                  { color: styleVariables.colors.black, marginBottom: 8 }
                ]}
              >
                {timeConverter(totalTime)}
              </Text>
              <Text
                id='totalTimeLabel'
                style={[
                  styleVariables.fontSizes.callout,
                  { color: styleVariables.colors.black }
                ]}
              >
                Total time
              </Text>
            </View>

            <View
              id='progressBar'
              style={{
                marginTop: 25,
                backgroundColor: styleVariables.colors.blueGreyDarker,
                height: 8,
                width: '100%',
                borderRadius: 99,
                overflow: 'hidden'
              }}
            >
              <Image
                id='progressBarFill'
                style={{
                  height: 8,
                  width: `${progressBar}%`,
                  borderRadius: 99,
                  overflow: 'hidden'
                }}
                source={require('../assets/progress-bar-fill.png')}
              ></Image>
            </View>
          </View>

          <View style={{ width: '100%' }}>
            <Pressable
              id='startStop'
              onPress={() => {
                if (timerRunning == true) {
                  setTimerRunning(false)
                  toggleTimer()
                } else {
                  setRemainingTime(totalTime)
                  setTimeToAnnounce(totalTime - frequency)
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
                          style={[
                            styleVariables.fontSizes.body,
                            { color: styleVariables.colors.white }
                          ]}
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
                        source={require('../assets/stopButtonBG.png')}
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
                          source={require('../assets/stop.png')}
                          style={{ height: 16, width: 16, marginRight: 6 }}
                        />
                        <Text
                          style={[
                            styleVariables.fontSizes.body,
                            {
                              color: styleVariables.colors.blue,
                              paddingHorizontal: 1
                            }
                          ]}
                        >
                          Stop
                        </Text>
                      </ImageBackground>
                    </>
                  )
                }
              }}
            </Pressable>

            <View
              id='imageCredits'
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.33
              }}
            >
              <Text
                style={[
                  styleVariables.fontSizes.subCallout,
                  ,
                  {
                    color: styleVariables.colors.white,

                    paddingTop: 7,
                    marginBottom: 16
                  }
                ]}
              >
                Picture by{' '}
              </Text>
              <Text
                onPress={() => {
                  Linking.openURL(`${imageCredits.profileURL}`)
                }}
                style={[
                  styleVariables.fontSizes.subCallout,
                  ,
                  {
                    color: styleVariables.colors.white,

                    paddingTop: 7,
                    marginBottom: 16,
                    textDecorationLine: 'underline'
                  }
                ]}
              >{`${imageCredits.name} `}</Text>
              <Text
                style={[
                  styleVariables.fontSizes.subCallout,
                  ,
                  {
                    color: styleVariables.colors.white,

                    paddingTop: 7,
                    marginBottom: 16
                  }
                ]}
              >
                on{' '}
              </Text>
              <Text
                onPress={() => {
                  Linking.openURL(`${imageCredits.websiteURL}`)
                }}
                style={[
                  styleVariables.fontSizes.subCallout,
                  ,
                  {
                    color: styleVariables.colors.white,
                    paddingTop: 7,
                    marginBottom: 16,
                    textDecorationLine: 'underline'
                  }
                ]}
              >
                Unsplash
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>

      <View id='controls' style={styles.controlsContainer}>
        <View id='time' style={[styles.controlLine, { opacity: 0.66 }]}>
          <Text
            style={[
              styleVariables.fontSizes.bodyBigSemiBold,
              { color: styleVariables.colors.black }
            ]}
          >
            Time
          </Text>
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
              style={[
                styleVariables.fontSizes.bodyBig,
                { color: styleVariables.colors.black }
              ]}
              placeholderTextColor={styleVariables.colors.black}
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
              style={[
                styleVariables.fontSizes.bodyBig,
                { color: styleVariables.colors.black }
              ]}
              placeholderTextColor={styleVariables.colors.black}
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
              style={[
                styleVariables.fontSizes.bodyBig,
                { color: styleVariables.colors.black }
              ]}
              placeholderTextColor={styleVariables.colors.black}
            />
          </View>
        </View>

        <View id='announce' style={[styles.controlLine, { opacity: 0.66 }]}>
          <Text
            style={[
              styleVariables.fontSizes.bodyBigSemiBold,
              { color: styleVariables.colors.black }
            ]}
          >
            Announce
          </Text>
          <Pressable
            onPress={() => {
              announce ? setAnnounce(false) : setAnnounce(true)
            }}
          >
            <Text
              style={[
                styleVariables.fontSizes.bodyBig,
                { color: styleVariables.colors.black }
              ]}
            >
              {announce ? 'On' : 'Off'}
            </Text>
          </Pressable>
        </View>

        <View id='frequency' style={[styles.controlLine, { opacity: 0.66 }]}>
          <Text
            style={[
              styleVariables.fontSizes.bodyBigSemiBold,
              { color: styleVariables.colors.black }
            ]}
          >
            Frequency
          </Text>
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
              style={[
                styleVariables.fontSizes.bodyBig,
                { color: styleVariables.colors.black }
              ]}
              placeholderTextColor={styleVariables.colors.black}
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
              style={[
                styleVariables.fontSizes.bodyBig,
                { color: styleVariables.colors.black }
              ]}
              placeholderTextColor={styleVariables.colors.black}
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
              style={[
                styleVariables.fontSizes.bodyBig,
                { color: styleVariables.colors.black }
              ]}
              placeholderTextColor={styleVariables.colors.black}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

let styleVariables = {
  fontSizes: {
    countDown: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 51
    },
    titleSemiBold: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 34
    },
    title: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 34
    },
    subTitle: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 22
    },
    bodyBig: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 20
    },
    bodyBigSemiBold: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 20
    },
    body: { fontFamily: 'Poppins_400Regular', fontSize: 17 },
    callout: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 14
    },
    subCallout: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 12
    }
  },
  colors: {
    perfectWhite: '#FFF',
    white: '#F2F2F2',
    black: '#272727',
    blue: '#16A7CE',
    blueGrey: '#AEB9C2',
    blueGreyDarker: '#E2E5E6'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleVariables.colors.perfectWhite,
    alignItems: 'center'
    // justifyContent: 'center'
  },
  navIcons: {
    width: 28,
    height: 28
  },
  navIconButton: {
    padding: 10,
    backgroundColor: styleVariables.colors.perfectWhite,
    borderRadius: 14,
    shadowColor: styleVariables.colors.blueGrey,
    shadowRadius: 34,
    shadowOffset: { height: 8 },
    shadowOpacity: 0.42,
    elevation: 20
  },
  controlsContainer: {
    width: '100%',
    backgroundColor: styleVariables.colors.perfectWhite,
    paddingHorizontal: 34,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 34,
    paddingBottom: Platform.OS === 'ios' ? 41 : 20,
    shadowColor: styleVariables.colors.blueGrey,
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
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 34,
    paddingBottom: 10
  },
  controlInputSpacer: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    color: styleVariables.colors.black,
    // lineHeight: Platform.OS === 'android' ? 18 : 0
    transform:
      Platform.OS === 'ios' ? [{ translateY: -1 }] : [{ translateY: -4 }],
    paddingRight: Platform.OS === 'ios' ? 0 : 2
  }
})

export { styles, styleVariables }
