// link pentru search
// https://cdn.contentful.com/spaces/sjvzi6dlarr9/environments/master/assets?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0&fields.title[match]=bug

import React, { useState }                                from 'react'
import { Text, View, TextInput, Keyboard, Button, Alert } from 'react-native'
import SearchBar
                                                          from 'react-native-dynamic-search-bar'
import { useDispatch }                                    from 'react-redux'
import {
  addSavedFact, removeSavedFact
}                                                         from '../reducers/bookmarkSlice'

const SearchScreen = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState( '' )
  return (
    <View
      style={ {
        flex          : 1,
        justifyContent: 'center',
        alignItems    : 'center',
      } }
    >
      <SearchBar
        placeholder="Cauta"
        onChangeText={ text => setValue( text ) }
        clearIconImageStyle={ {
          width : value.length >= 1 ? 15 : 0,
          height: value.length >= 1 ? 15 : 0,
        } }
        onClearPress={ () => {
          Keyboard.dismiss()
          setValue( '' )
        } }
      />
      <Text>{ value }</Text>
    </View>
  )
}

export default SearchScreen
