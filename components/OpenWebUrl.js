import React, {useCallback} from 'react'
import { Alert, Linking, Pressable, StyleSheet } from 'react-native'

const OpenWebUrl = ({ url, children }) => {
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

const styles = StyleSheet.create({
  button: {
    height      : 35,
    width       : 35,
    marginRight : 10,
    marginLeft  : -5,
    borderRadius: 4,
  },
})

export default OpenWebUrl
