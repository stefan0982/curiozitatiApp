import 'react-native-gesture-handler';
import React, { useCallback }             from 'react';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  Linking,
  Alert,
  StyleSheet,
}                                         from 'react-native';
import MainScreen
                                          from './components/screens/MainScreen';
import { NavigationContainer }            from '@react-navigation/native';
import { createStackNavigator }           from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CategoryScreen
                                          from './components/screens/CategoryScreen';

const Stack = createStackNavigator();

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback( async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL( url );

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web
      // link should be opened by some browser in the mobile
      await Linking.openURL( url );
    }
    else {
      Alert.alert( `Nu s-a putut deschide: ${ url }` );
    }
  }, [url] );

  return <Pressable
    onPress={ handlePress }
    style={ ({ pressed }) => [
      {
        backgroundColor: pressed ? '#eceff1' : 'white',
      }, styles.button,
    ] }
  >
    { children }
  </Pressable>;
};

const App = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Curiozitati"
            component={ MainScreen }
            options={ ({ route }) => (
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
                    <OpenURLButton url={ 'https://www.instagram.com/curiozitati.app/' }>
                      <Image
                        source={ require( './assets/ig.png' ) }
                        style={ styles.img }
                      />
                    </OpenURLButton>
                    <OpenURLButton url={ 'https://curiozitati.app' }>
                      <Image
                        source={ require( './assets/web.png' ) }
                        style={ styles.img }
                      />
                    </OpenURLButton>
                  </View>
                ),
              }
            ) }
          />
        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaProvider>
  );
};

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
} );

export default App;
