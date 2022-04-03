import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { StatusBar } from 'expo-status-bar'
import { styles, styleVariables } from './Homescreen'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function Settings ({ navigation }) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#F2F2F2',
        paddingTop: 80
      }}
    >
      <StatusBar style='auto' />

      <View id='navigation' style={styles.navigation}>
        <Pressable
          onPress={() => {
            navigation.navigate('Homescreen')
          }}
        >
          <View style={styles.navIconButton}>
            <Image
              style={styles.navIcons}
              source={require('../assets/back.png')}
            />
          </View>
        </Pressable>
      </View>

      <View
        style={{
          marginTop: 30,
          backgroundColor: '#FFF',
          // height: 384,
          width: width - 34,
          padding: 17,
          borderRadius: 28,
          // overflow: 'hidden',
          shadowColor: styleVariables.colors.blueGrey,
          shadowRadius: 34,
          shadowOffset: { height: 8 },
          shadowOpacity: 0.42,
          elevation: 20
        }}
      >
        {/* header */}
        <Text
          style={[
            styleVariables.fontSizes.titleSemiBold,
            { color: styleVariables.colors.blue }
          ]}
        >
          Keep it ad-free
        </Text>
        <Text
          style={[
            styleVariables.fontSizes.body,
            {
              color: styleVariables.colors.black,
              opacity: 0.66,
              marginBottom: 17
            }
          ]}
        >
          With everyone's help, donations are what
        </Text>

        {/* talkingPoints */}
        <View>
          <View
            style={{
              ...styles.controlLine,
              justifyContent: 'flex-start',
              paddingBottom: 25
            }}
          >
            <Image
              source={require('../assets/mdi_robot-happy-outline.png')}
              style={{ height: 26, width: 26, marginRight: 17 }}
            />
            <Text
              style={[
                styleVariables.fontSizes.body,
                { color: styleVariables.colors.black }
              ]}
            >
              Supports the developer
            </Text>
          </View>

          <View
            style={{
              ...styles.controlLine,
              justifyContent: 'flex-start',
              paddingBottom: 25
            }}
          >
            <Image
              source={require('../assets/currency-usd-off.png')}
              style={{ height: 26, width: 26, marginRight: 17 }}
            />
            <Text
              style={[
                styleVariables.fontSizes.body,
                { color: styleVariables.colors.black }
              ]}
            >
              Keeps the app free
            </Text>
          </View>

          <View
            style={{
              ...styles.controlLine,
              justifyContent: 'flex-start',
              paddingBottom: 34
            }}
          >
            <Image
              source={require('../assets/ic_baseline-web-asset-off.png')}
              style={{ height: 26, width: 26, marginRight: 17 }}
            />
            <Text
              style={[
                styleVariables.fontSizes.body,
                { color: styleVariables.colors.black }
              ]}
            >
              Keeps the app ad-free
            </Text>
          </View>
        </View>

        {/* CTA */}
        <View
          style={{
            backgroundColor: styleVariables.colors.perfectWhite,
            borderRadius: 14,
            shadowColor: '#17A9CF',
            shadowRadius: 68,
            shadowOffset: { height: 17 },
            shadowOpacity: 0.66,
            elevation: 22
          }}
        >
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
            <Text
              style={[
                styleVariables.fontSizes.body,
                { color: styleVariables.colors.white }
              ]}
            >
              Donate
            </Text>
          </ImageBackground>
        </View>
      </View>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })
