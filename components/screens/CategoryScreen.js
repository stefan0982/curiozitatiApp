import React, { useState, useEffect } from 'react';
import { Text, View }                 from 'react-native';
import { contentful }                 from '../api/contentful';
import axios                          from 'axios';
import InfiniteCategoryPostsList      from '../InfiniteCategoryPostsList';
import { SafeAreaView }               from 'react-native-safe-area-context';

const CategoryScreen = ({ route }) => {
  const { category, categoryId } = route.params;

  const [data, setData] = useState( [] );

  const factsUrl = `/entries?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0&content_type=curiozitati&fields.categoria.sys.id=${ categoryId }`;

  useEffect( () => {
    contentful.get( factsUrl ).then( res => setData( res ) );
  }, [] );

  return (
    <SafeAreaView>
      <InfiniteCategoryPostsList categoryId={ categoryId } />
    </SafeAreaView>
  );
};

export default CategoryScreen;
