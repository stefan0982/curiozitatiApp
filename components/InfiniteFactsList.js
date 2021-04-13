import React, { Component }                  from 'react';
import { FlatList, View, Dimensions }        from 'react-native';
import { categoryUrl, contentful, factsUrl } from './api/contentful';
import axios                                 from 'axios';
import FactCard                              from './FactCard';
import HorizontalCategoriesList              from './HorizontalCategoriesList';
import Image                                 from 'react-native-image-progress';
import {
  NineCubesLoader,
}                                            from 'react-native-indicator';

class InfiniteFactsList
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
    await contentful.get(
      this.props.main ? factsUrl( skip ) : categoryUrl( this.props.categoryId,
        skip,
      ) ).then( res => {
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
          marginTop     : Dimensions.get( 'window' ).height / 2 - 100,
          display       : 'flex',
          justifyContent: 'center',
          alignItems    : 'center',
        } }
      ><NineCubesLoader color="#FFC75F" /></View>;
    }

    return (
      <FlatList
        ListHeaderComponent={ this.props.main &&
        <HorizontalCategoriesList navigation={ this.props.navigation } /> }
        data={ this.state.data }
        renderItem={ ({ item }) => <FactCard
          categoryScreen={ !this.props.main }
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
            marginVertical: 30,
          } }
        ><NineCubesLoader
          size={ 15 }
          color="#FFC75F"
        /></View> }
      />
    );
  }
}

export default InfiniteFactsList;
