import React, { useState, useEffect } from 'react';
import {
  Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity,
}                                     from 'react-native';
import { categoriesUrl, contentful }  from './api/contentful';
import CategoryImage                  from './CategoryImage';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

const HorizontalCategoriesList = ({ navigation }) => {

  const [categories, setCategories] = useState( [] );
  const [loading, setLoading] = useState( true );

  useEffect( () => {
    contentful.get( categoriesUrl ).then(
      data => {
        setCategories( data.data.items );
        setLoading(false)
      } );
  }, [] );

  if (loading) {
    return (
      <ContentLoader
        height={95}
        speed={1}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        viewBox="-10 10 360 70"
      >
        <Circle cx="27" cy="39" r="28"/>
        <Circle cx="100" cy="39" r="28" />
        <Circle cx="173" cy="39" r="28" />
        <Circle cx="246" cy="39" r="28" />
        <Circle cx="319" cy="39" r="28" />
        <Circle cx="392" cy="39" r="28" />
      </ContentLoader>

    )
  }


  return (
    <View style={ styles.storyView }>
      <ScrollView
        horizontal={ true }
        showsHorizontalScrollIndicator={ false }
      >
        { categories.filter(category => category.fields.denumirea !== 'Toate').map( category => (
          <View
            style={ styles.storyHolder }
            key={ category.sys.id }
          >
            <TouchableOpacity activeOpacity={ 0.4 }
                              onPress={ () => navigation.navigate(
                                'Category', {
                                  category: category.fields.denumirea,
                                  categoryId: category.sys.id
                                } ) }
            >
              <CategoryImage id={ category.fields.avatar.sys.id } />
              <Text style={ styles.storyUsernameText }>
                { category.fields.denumirea }
              </Text>
            </TouchableOpacity>
          </View>
        ) ) }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create( {
  storyView        : {
    paddingVertical: 4,
    marginTop      : 4,
    display        : 'flex',
    flexDirection  : 'row',
    alignItems     : 'center',
  },
  storyHolder      : {
    paddingHorizontal: 10,
    alignItems       : 'center',
  },
  storyUsernameText: {
    marginTop: 4,
    textAlign: 'center',
  },
} );

export default HorizontalCategoriesList;
