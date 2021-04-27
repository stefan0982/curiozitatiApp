import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Text,
  ActivityIndicator,
}                                             from 'react-native'
import ImageProgress                          from 'react-native-image-progress'
import ProgressBar                            from 'react-native-progress/Bar'
import { contentful }                         from './api/contentful'
import ContentLoader, { Rect, Circle, Path }  from 'react-content-loader/native'
import SkeletonLoading                        from './FactCard/SkeletonLoading'
import CardFooter                             from './FactCard/CardFooter'
import LoadingModal                           from './FactCard/LoadingModal'
import SavePressable                          from './FactCard/SavePressable'
import SharePressable                         from './FactCard/SharePressable'
import { captureRef }                         from 'react-native-view-shot'
import Share                                  from 'react-native-share'

export default ({
  id,
  data,
  categoria,
  navigation,
  categoryScreen,
}) => {

  const [modal, setModal] = useState( false )
  const [imageLoading, setImageLoading] = useState( false )
  const [title, setTitle] = useState( '' )
  const [description, setDescription] = useState( '' )
  const [shortDescription, setShortDescription] = useState( '' )
  const [category, setCategory] = useState( null )
  const [categoryAvatarUrl, setCategoryAvatarUrl] = useState( '' )
  const [loading, setLoading] = useState( true )
  const [categoryAvatarLoading, setCategoryAvatarLoading] = useState( true )
  const [entryId, setEntryId] = useState( '' )

  const [imgUrl, setImgUrl] = useState( '' )

  const linkSingleAsset = `/assets/${ id }?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0`

  const getSingleAsset = () => {
    contentful.get( linkSingleAsset ).then( data => {
      if (data.data.fields.description !== undefined) {
        setDescription( data.data.fields.description )
        setShortDescription( data.data.fields.description.slice( 0, 75 ) )
      }
      else {
        setDescription( '' )
        setShortDescription( '' )
      }
      setImgUrl( data.data.fields.file.url )
      setTitle(data.data.fields.title)
    } )
  }

  const linkSingleEntry = `/entries/${ categoria.sys.id }?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0`

  const getCategoryEntry = async () => {
    await contentful.get( linkSingleEntry ).then( data => {
      setCategory( data.data )
      setLoading( false )
    } )
  }

  useEffect( () => {
    getSingleAsset()
    getCategoryEntry()
  }, [] )

  if (category) {
    const categoryAvatar = category.fields.avatar.sys.id
    contentful.get(
      `/assets/${ categoryAvatar }?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0` )
      .then( res => {
        setCategoryAvatarUrl( res.data.fields.file.url )
        setCategoryAvatarLoading( false )
      } )
  }

  const viewRef = useRef()
  const shareImage = async () => {
    const uri = await captureRef( viewRef, {
      format: 'png',
    } )
    const shareResponse = await Share.open( {
      url    : uri,
      message: 'curiozitati.app',
    } )
  }

  if (loading) {
    <SkeletonLoading />
  }

  return (
    <View style={ [styles.post, { marginTop: 20 }] }>
      <LoadingModal modal={ modal } />
      { !categoryScreen && <View style={ styles.postHeader }>
        <TouchableOpacity
          activeOpacity={ 0.4 }
          onPress={ () => navigation.navigate( 'Category', {
            category  : category.fields.denumirea,
            categoryId: category.sys.id,
          } ) }
        >
          { categoryAvatarLoading ? <ContentLoader
            speed={ 0.5 }
            width={ 40 }
            height={ 40 }
            // viewBox="0 0 400 48"
            backgroundColor="#d9d9d9"
            foregroundColor="#b9baa7"
          >
            <Circle
              cx="20"
              cy="20"
              r="20"
            />
          </ContentLoader> : <Image
            style={ styles.postUserImage }
            source={ {
              uri: `https:${ categoryAvatarUrl }?w=50&h=50`,
            } }
          /> }
        </TouchableOpacity>
        <Text style={ styles.postUsernameText }>{ category
        && category.fields.denumirea }</Text>
        <SharePressable
          viewRef={ viewRef }
          setModal={ setModal }
        />
        <SavePressable
          id={ id }
          title={title}
          imgUrl={ imgUrl }
          description={description}
          categoryAvatarUrl={ categoryAvatarUrl }
          categoryTitle={category && category.fields.denumirea}
        />
      </View> }
      { categoryScreen ? <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ () => shareImage() }
      >
        <ImageProgress
          source={ { uri: `https:${ imgUrl }?w=800&h=800` } }
          style={ styles.image }
          indicator={ ProgressBar }
          indicatorProps={ {
            size         : 80,
            borderWidth  : 0,
            color        : '#ffc75f',
            unfilledColor: '#ffecb2',
          } }
          ref={ viewRef }
        />
      </TouchableOpacity> : <ImageProgress
        source={ { uri: `https:${ imgUrl }?w=800&h=800` } }
        style={ styles.image }
        indicator={ ProgressBar }
        indicatorProps={ {
          size         : 80,
          borderWidth  : 0,
          color        : '#ffc75f',
          unfilledColor: '#ffecb2',
        } }
        ref={ viewRef }
      /> }
      <CardFooter
        description={ description }
        setShortDescription={ setShortDescription }
        shortDescription={ shortDescription }
        data={ data }
      />

    </View>
  )
};

const styles = StyleSheet.create( {
  image           : {
    height: Dimensions.get( 'window' ).width,
    width : Dimensions.get( 'window' ).width, // marginTop: 20,
    // marginBottom: 5,
    borderRadius: 4,
    overflow    : 'hidden',
  },
  post            : {},
  postHeader      : {
    display          : 'flex',
    flexDirection    : 'row',
    alignItems       : 'center',
    paddingHorizontal: 10,
    paddingVertical  : 4,
    borderTopWidth   : 1,
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4ea',
    borderTopColor   : '#dfe4ea',
    backgroundColor  : '#fff',
  },
  postUserImage   : {
    width       : 40,
    height      : 40,
    borderRadius: 100,
  },
  postUsernameText: {
    flex      : 1,
    marginLeft: 10,
  },
} )

