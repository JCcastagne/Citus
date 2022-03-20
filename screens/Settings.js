import { StyleSheet, Text, View, Image } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { StatusBar } from 'expo-status-bar'
import { styles as hsStyles } from './Homescreen'

export default function Settings ({ navigation }) {
  return (
    <View
      style={{
        ...hsStyles.container,
        backgroundColor: '#F2F2F2',
        paddingTop: 80
      }}
    >
      <StatusBar style='auto' />

      <View
        id='navigation'
        style={{
          ...hsStyles.controlLine,
          width: '100%',
          paddingHorizontal: 34,
          padding: 0
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate('Homescreen')
          }}
        >
          <View style={hsStyles.navIcon}>
            <Image
              style={hsStyles.icons}
              source={require('../assets/back.png')}
            />
          </View>
        </Pressable>
        {/* <Text style={hsStyles.title}>Citus</Text> */}
      </View>

      <View style={{ ...hsStyles.controlsContainer, position: 'relative' }}>
        <Text>Keep it ad-free</Text>
        <Text>With everyone's help, donations are what</Text>
        <View>
          <View style={{ ...hsStyles.controlLine, paddingBottom: 25 }}>
            <Text>Supports the developer</Text>
          </View>
          <View style={{ ...hsStyles.controlLine, paddingBottom: 25 }}>
            <Text>Keeps the app free</Text>
          </View>
          <View style={{ ...hsStyles.controlLine, paddingBottom: 25 }}>
            <Text>Keeps the app ad-free</Text>
          </View>
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
