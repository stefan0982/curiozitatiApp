import React, { useState, useEffect } from 'react';
import { Text, View }              from 'react-native';
import { categoryUrl, contentful } from '../api/contentful';
import axios                       from 'axios';
import { SafeAreaView }               from 'react-native-safe-area-context';
import InfiniteFactsList              from '../InfiniteFactsList';

const CategoryScreen = ({ route }) => {
  const { category, categoryId } = route.params;


  return (
    <SafeAreaView>
      <InfiniteFactsList main={false} categoryId={ categoryId } />
    </SafeAreaView>
  );
};

export default CategoryScreen;
