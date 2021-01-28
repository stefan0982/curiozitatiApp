import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
}            from 'react-native'

import {
  Header,
  Colors,
}            from 'react-native/Libraries/NewAppScreen'
import Cards from './components/Cards'

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Cards />
      </SafeAreaView>
    </>
  )
}

export default App
