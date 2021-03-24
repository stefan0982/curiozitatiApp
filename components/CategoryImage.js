import React, { useEffect, useState } from 'react';
import { contentful }                 from './api/contentful';
import { StyleSheet, View, Text }     from 'react-native';
import Image                          from 'react-native-image-progress';
import ImageProgress                  from 'react-native-image-progress';
import CircleSnail                    from 'react-native-progress/CircleSnail';
import ContentLoader, { Circle }      from 'react-content-loader/native';

const CategoryImage = ({ id }) => {

  const [imgUrl, setImgUrl] = useState( '' );
  const [loading, setLoading] = useState( true );

  const linkSingleAsset = `/assets/${ id }?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0`;

  const getSingleAsset = () => {
    contentful.get( linkSingleAsset ).then(
      data => {
        setImgUrl( data.data.fields.file.url );
        setLoading(false)
      } );
  };

  useEffect( () => {
    getSingleAsset();
  }, [] );

  if (loading) {
    return (
      <ContentLoader
        height={60}
        width={60}
        speed={1}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Circle cx="30" cy="30" r="30" />

      </ContentLoader>
    )
  }

  return (
    <Image
      source={ { uri: `https:${ imgUrl }?w=100&h=100` } }
      style={ styles.storyUserImage }
      indicator={ CircleSnail }
      indicatorProps={ {
        // size         : 20,
        // borderWidth  : 0,
        // color        : '#ffc75f',
        // unfilledColor: '#ffecb2',
      } }
    />
  );
};

const styles = StyleSheet.create( {
  storyUserImage: {
    height      : 60,
    width       : 60,
    borderRadius: 100,
    padding: 0
  },
} );

export default CategoryImage;
