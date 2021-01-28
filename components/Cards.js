import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator, Dimensions, FlatList, StyleSheet, View, Image, ScrollView,
} from 'react-native'
import axios                          from 'axios'
import Card                           from './Card'
import {
  Header,
  Colors,
}                                     from 'react-native/Libraries/NewAppScreen'

const CardsList = () => {
  const [dataState, setData] = useState( [] )
  const [refreshing, setRefreshing] = useState( false )

  const fetchData = async () => {
    const apiUrl = 'https://cdn.contentful.com/spaces/sjvzi6dlarr9/environments/master/assets?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0'
    await axios.get( apiUrl ).then( (repos) => {
      const allRepos = repos.data
      setData( allRepos.items )
    } )
  }

  useEffect( () => {
    fetchData()
  }, [setData] )

  const refresh = async () => {
    try {
      setRefreshing( true )
      await fetchData()
    }
    catch (e) {
      setRefreshing(false)
      console.log( e )
    }
    finally {
      setRefreshing( false )
    }
  }

  const renderItem = ({ item }) => {
    return (
      <Card item={ item } />
    )
  }

  if (dataState) {
    return (
      <>
        <FlatList
          ListHeaderComponent={<Header />}
          data={ dataState }
          renderItem={ renderItem }
          refreshing={ refreshing }
          onRefresh={ refresh }
          keyExtractor={ (item) => item.sys.id }
          showsVerticalScrollIndicator={ false }
        />
      </>
    )
  }
  else {
    return <ActivityIndicator size="small" color="black" />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default CardsList
