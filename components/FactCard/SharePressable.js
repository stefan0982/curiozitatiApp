import React                            from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { captureRef }                   from 'react-native-view-shot'
import Share                            from 'react-native-share'

const SharePressable = ({viewRef, setModal}) => {
   const shareImage = async () => {
    try {
      // capture component
      const uri = await captureRef( viewRef, {
        format: 'png',
      } )
      setModal( false )

      // share
      const shareResponse = await Share.open( {
        url    : uri,
        message: 'curiozitati.app',
      } )
    }
    catch (error) {
      setModal( false )
      // console.log( 'error', error )
    } finally {
      setModal( false )
    }
  }
  return (
    <Pressable
      onPress={ () => {
        setModal( true )
        shareImage()
      } }
      style={ ({ pressed }) => [
        styles.button, {
          backgroundColor: pressed ? '#eceff1' : 'white',
        },
      ] }
    >
      { ({ pressed }) => (
        <Image
          source={ require( '../../assets/share.png' ) }
          style={ {
            width    : 25,
            height   : 25,
            alignSelf: 'center',
            marginTop: 5,
          } }
        />
      ) }
    </Pressable>
  )
}

const styles = StyleSheet.create( {
  button              : {
    height      : 35,
    width       : 35,
    marginRight : 5,
    borderRadius: 4,
  },
} )

export default SharePressable
