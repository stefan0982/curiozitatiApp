import React, { Component }                                from 'react';
import { FlatList, Text, View, ActivityIndicator, Button } from 'react-native';
import { contentful }                                      from './api/contentful';
import axios                                               from 'axios';
import CardImageSample
                                                           from './CardImageSample';
import HorizontalCategoriesList
                                                           from './HorizontalCategoriesList';
import Image
                                                           from 'react-native-image-progress';
import {
  NineCubesLoader,
}                                                          from 'react-native-indicator';

class InfiniteFlatList
  extends Component {

  state = {
    data      : [],
    skip      : 0,
    totalFacts: 0,
    refreshing: false,
    loading   : true,
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const { skip } = this.state;
    const factsUrl = `/entries?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0&content_type=curiozitati&limit=10&skip=${ skip }`;

    await contentful.get( factsUrl ).then( res => {
      this.setState( {
        data      : [...this.state.data, ...res.data.items],
        totalFacts: res.data.total,
        loading   : false,
      } );
    } );
  };

  handleLoadMore = () => {
    this.setState( {
      skip: this.state.skip + 10,
    }, () => {
      this.makeRemoteRequest();
    } );
  };

  refresh = async () => {
    this.setState( {
      refreshing: true,
      loading   : true,
      data      : [],
      skip      : 0,
    }, () => {
      this.makeRemoteRequest();
    } );
    this.setState( { refreshing: false } );
  };

  render() {
    if (this.state.loading) {
      return <View
        style={ {
          flex          : 1,
          display       : 'flex',
          justifyContent: 'center',
          alignItems    : 'center',
        } }
      ><NineCubesLoader color="#FFC75F" /></View>;
    }

    return (
      <FlatList
        ListHeaderComponent={
          <HorizontalCategoriesList navigation={ this.props.navigation } /> }
        data={ this.state.data }
        renderItem={ ({ item }) => <CardImageSample
          navigation={ this.props.navigation }
          categoria={ item.fields.categoria[0] }
          id={ item.fields.imagine.sys.id }
          data={ item.sys.createdAt }
        /> }
        keyExtractor={ item => item.sys.id }
        refreshing={ this.state.refreshing }
        onRefresh={ this.refresh }
        // this.state.totalFacts >= this.state.skip pentru a evita render la
        // sfarsit de lista
        onEndReached={ this.state.totalFacts >= this.state.skip
        && this.handleLoadMore }
        onEndThreshold={ 1.5 }
        showsVerticalScrollIndicator={ false }
        ListFooterComponent={ this.state.totalFacts >= this.state.skip && <View
          style={ {
            display       : 'flex',
            justifyContent: 'center',
            alignItems    : 'center',
            marginVertical: 30
          } }
        ><NineCubesLoader size={15} color="#FFC75F" /></View> }
      />
    );
  }
}

export default InfiniteFlatList;
