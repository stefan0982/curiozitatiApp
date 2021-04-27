import React, { useState }          from 'react'
import {
  Dimensions, Image, Pressable, StyleSheet, Button, Text, View,
}                                   from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  addSavedFact, removeSavedFact,
}                                   from '../reducers/bookmarkSlice'

const SavePressable = ({
  id,
  categoryAvatarUrl,
  categoryTitle,
  imgUrl,
  title,
  description,
}) => {
  const dispatch = useDispatch()

  const savedFacts = useSelector( state => state.bookmark.savedFacts )

  const isSaved = savedFacts.find( fact => {
    if (fact.id === id) {
      return true
    }
    else {
      return false
    }
  } )

  return (
    <Pressable
      onPress={ () => {
        dispatch( !!isSaved === false ? addSavedFact( {
          id,
          title,
          imgUrl,
          categoryTitle,
          categoryAvatarUrl,
          description,
        } ) : removeSavedFact( id ) )
      } }
      style={ ({ pressed }) => [
        styles.button, {
          backgroundColor: pressed ? '#eceff1' : 'white',
        },
      ] }
    >
      { ({ pressed }) => (
        <Image
          source={ !!isSaved === true ? require( '../../assets/saved.png' )
            : require( '../../assets/save.png' ) }
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
  button: {
    height      : 35,
    width       : 35,
    marginRight : 5,
    borderRadius: 4,
  },
} )

export default SavePressable
