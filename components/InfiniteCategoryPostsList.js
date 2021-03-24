import React, { Component } from 'react';
import { FlatList, Text }   from 'react-native';
import { contentful }       from './api/contentful';
import {
  Header,
}                           from 'react-native/Libraries/NewAppScreen';
import CardImageSample      from './CardImageSample';

class InfiniteCategoryPostsList
  extends Component {

  state = {
    data      : [],
    skip      : 0,
    totalFacts: 0,
    refreshing: false,
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const { skip } = this.state;
    const factsUrl = `/entries?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0&content_type=curiozitati&fields.categoria.sys.id=${ this.props.categoryId }&limit=10&skip=${ skip }`;

    await contentful.get( factsUrl ).then( res => {
      this.setState( {
        data      : [...this.state.data, ...res.data.items],
        totalFacts: res.data.total,
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
      data      : [],
      skip      : 0,
    }, () => {
      this.makeRemoteRequest();
    } );
    this.setState( { refreshing: false } );
  };

  render() {
    return (
      <FlatList
        data={ this.state.data }
        renderItem={ ({ item }) => <CardImageSample
          categoryScreen={true}
          categoria={item.fields.categoria[0]}
          id={ item.fields.imagine.sys.id }
          data={ item.sys.createdAt }
        /> }
        keyExtractor={ item => item.sys.id }
        refreshing={ this.state.refreshing }
        onRefresh={ this.refresh }
        onEndReached={ this.state.totalFacts >= this.state.skip
        && this.handleLoadMore }
        onEndThreshold={ 1.5 }
        showsVerticalScrollIndicator={ false }
      />
    );
  }
}

export default InfiniteCategoryPostsList;
