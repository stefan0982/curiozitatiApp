import React                    from 'react'
import MainScreen               from '../MainScreen'
import CategoryScreen              from '../CategoryScreen'
import { Image, StyleSheet, View } from 'react-native'
import OpenWebUrl                  from '../../OpenWebUrl'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons                 from 'react-native-vector-icons/Ionicons'


const MainScreenStack = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Curiozitati"
        component={ MainScreen }
        options={ ({
          route,
          navigation,
        }) => (
          {
            title: 'Curiozități',
          }
        ) }
      />
      <Stack.Screen
        name="Category"
        component={ CategoryScreen }
        options={ ({ route }) => (
          {
            title      : route.params.category,
            headerRight: () => (
              <View
                style={ {
                  display      : 'flex',
                  flexDirection: 'row',
                } }
              >
                <OpenWebUrl url={ 'https://www.instagram.com/curiozitati.app/' }>
                  <Image
                    source={ require( '../../../assets/ig.png' ) }
                    style={ styles.img }
                  />
                </OpenWebUrl>
                <OpenWebUrl url={ 'https://curiozitati.app' }>
                  <Image
                    source={ require( '../../../assets/web.png' ) }
                    style={ styles.img }
                  />
                </OpenWebUrl>
              </View>
            ),
          }
        ) }
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create( {
  button: {
    height      : 35,
    width       : 35,
    marginRight : 10,
    marginLeft  : -5,
    borderRadius: 4,
  },
  img   : {
    width    : 25,
    height   : 25,
    alignSelf: 'center',
    marginTop: 5,
  },
} )

export default MainScreenStack
