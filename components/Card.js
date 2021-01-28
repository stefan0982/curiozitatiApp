import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  Image, TouchableOpacity,
  Pressable, Text, ActivityIndicator, Modal,
}                                    from 'react-native'
import { formatDistanceToNowStrict } from 'date-fns'
import { ro }                        from 'date-fns/locale'
import { captureRef }                from 'react-native-view-shot'
import Share                         from 'react-native-share'

export default ({ item }) => {
  let description = ``
  const [stateDescription, setDescription] = useState(
    description.slice( 0, 75 ) )
  const [readMore, setReadMore] = useState( '... mai mult' )
  const [modal, setModal] = useState( false )
  const [imageLoading, setImageLoading] = useState( false )


  const viewRef = useRef()
  const shareImage = async () => {
    try {
      // capture component
      const uri = await captureRef( viewRef, {
        format: 'png',
      } )
      setModal( false )

      // share
      const shareResponse = await Share.open(
        { url: uri, message: 'curiozitati.app' } )
    }
    catch (error) {
      setModal( false )
      // console.log( 'error', error )
    }
    finally {
      setModal( false )
    }
  }

  return (
    <View style={ { backgroundColor: 'white' } }>
      <Image
        source={ { uri: `https:${ item.fields.file.url }` } }
        style={ styles.image }
        ref={ viewRef }
      />

      <View
        style={ {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        } }
      >

        <Text
          style={ {
            marginTop: 2,
            marginLeft: 10,
            color: 'gray',
            fontSize: 12,
          } }
        >{ formatDistanceToNowStrict(
          new Date( item.sys.createdAt ),
          { locale: ro },
        ) } în urmă</Text>
        <Pressable
          onPress={ () => {
            setModal(true)
            shareImage()
          } }
          style={ ({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#eceff1'
                : 'white',
            },
            styles.button,
          ] }
        >
          { ({ pressed }) => (
            <Image
              source={ require( '../assets/share.png' ) }
              style={ {
                width: 25,
                height: 25,
                alignSelf: 'center',
                marginTop: 5,
              } }
            />
          ) }
        </Pressable>
        <Modal
          animationType="none"
          transparent={ true }
          visible={ modal }
        >
          <View style={ styles.centeredView }>
            <View style={ styles.modalView }>
              <ActivityIndicator
                size="small"
                color="black"
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}
;
const styles = StyleSheet.create(
  {
    image: {
      height: Dimensions.get( 'window' ).width
              - 12,
      width: Dimensions.get( 'window' ).width,
      marginTop: 20,
      marginBottom: 5,
      borderRadius: 4,
      overflow: 'hidden',
    }
    ,
    button: {
      height: 35,
      width: 35,
      marginRight: 5,
      borderRadius: 4,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
      height: 40,
      width: 40,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
)
