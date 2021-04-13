import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions,
}                                     from 'react-native';
import HorizontalCategoriesList       from '../HorizontalCategoriesList';
import { SafeAreaView }               from 'react-native-safe-area-context';
import InfiniteFactsList              from '../InfiniteFactsList';
import { factsUrl }                   from '../api/contentful';

export default function MainScreen({ navigation }) {

  return (
    <SafeAreaView style={ { flex: 1, backgroundColor: '#fafaf3' } }>
      <InfiniteFactsList main={true} navigation={navigation} />
    </SafeAreaView>
  );
}

