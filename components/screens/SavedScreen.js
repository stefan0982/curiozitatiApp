import React, { useState, useEffect }                        from 'react'
import { Text, View, Button, Alert, ScrollView, StyleSheet } from 'react-native'
import { useSelector }                                       from 'react-redux'

// la mmkv facem un array cu entriurile img, title si descriere
// dupa folosim infinite facts list ca la categorii

const SavedScreen = () => {

  const saved = useSelector(state => state.bookmark.savedFacts)

  return (
    <ScrollView
      style={ {
        flex          : 1,
        // justifyContent: 'center',
        // alignItems    : 'center',
      } }
    >
      <Text>Saved Screen</Text>
      {saved.map(({title, url, id}) => {
        return (
          <View key={id}>
            <Text>{title}</Text>
            <Text>{url}</Text>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 32,
  },
});

export default SavedScreen
