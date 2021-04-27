import 'react-native-gesture-handler'
import React, { useCallback, useRef } from 'react'
import { Image }                      from 'react-native'
import MainScreen                     from './components/screens/MainScreen'
import { NavigationContainer }        from '@react-navigation/native'
import { createBottomTabNavigator }   from '@react-navigation/bottom-tabs'
import { createStackNavigator }       from '@react-navigation/stack'
import { SafeAreaProvider }           from 'react-native-safe-area-context'
import CategoryScreen                 from './components/screens/CategoryScreen'
import OpenWebUrl                     from './components/OpenWebUrl'
import SearchScreen                   from './components/screens/SearchScreen'
import MainScreenStack
                                      from './components/screens/stacks/MainScreenStack'
import SavedScreen                    from './components/screens/SavedScreen'
import { Provider }                   from 'react-redux'
import { PersistGate }                from 'redux-persist/integration/react'
import { store, persistor }           from './components/store/store'

const Tab = createBottomTabNavigator()

const App = () => {

  return (
    <SafeAreaProvider>
      <Provider store={ store }>
        <PersistGate
          loading={ null }
          persistor={ persistor }
        >


          <NavigationContainer>
            <Tab.Navigator
              screenOptions={ ({ route }) => (
                {
                  tabBarIcon: ({
                    focused,
                    color,
                    size,
                  }) => {
                    let iconName

                    if (route.name === 'Home') {
                      iconName = focused ? require( './assets/home.png' )
                        : require( './assets/home-gray.png' )
                    }
                    else if (route.name === 'Cauta') {
                      iconName = focused ? require(
                        './assets/search-active.png' ) : require(
                        './assets/search-grey.png' )
                    }
                    else if (route.name === 'Saved') {
                      iconName = focused ? require( './assets/saved.png' )
                        : require( './assets/save-gray.png' )
                    }

                    // You can return any component that you like here!
                    return <Image
                      source={ iconName }
                      style={ {
                        height: 26,
                        width : 26,
                      } }
                    />
                  },
                }
              ) }
              tabBarOptions={ {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: false,
              } }
            >
              <Tab.Screen
                name="Home"
                component={ MainScreenStack }
              />
              <Tab.Screen
                name="Cauta"
                component={ SearchScreen }
              />
              <Tab.Screen
                name="Saved"
                component={ SavedScreen }
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App
