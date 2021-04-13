import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Text,
  ActivityIndicator,
  Modal,
}                                             from 'react-native';
import { formatDistanceToNowStrict }          from 'date-fns';
import { ro }                                 from 'date-fns/locale';
import { captureRef }                         from 'react-native-view-shot';
import Share                                  from 'react-native-share';
import ImageProgress
                                              from 'react-native-image-progress';
import ProgressBar                            from 'react-native-progress/Bar';
import { contentful }                         from './api/contentful';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"


export default ({ id, data, categoria, navigation, categoryScreen }) => {

  const [modal, setModal] = useState( false );
  const [imageLoading, setImageLoading] = useState( false );
  const [description, setDescription] = useState( '' );
  const [shortDescription, setShortDescription] = useState( '' );
  const [readMore, setReadMore] = useState( '... mai mult' );
  const [category, setCategory] = useState( null );
  const [categoryAvatarUrl, setCategoryAvatarUrl] = useState( '' );
  const [loading, setLoading] = useState( true );
  const [categoryAvatarLoading, setCategoryAvatarLoading] = useState(true);

  const [imgUrl, setImgUrl] = useState( '' );

  const linkSingleAsset = `/assets/${ id }?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0`;

  const getSingleAsset = () => {
    contentful.get( linkSingleAsset ).then( data => {
      if (data.data.fields.description !== undefined) {
        setDescription( data.data.fields.description );
        setShortDescription( data.data.fields.description.slice( 0, 75 ) );
      }
      else {
        setDescription( '' );
        setShortDescription( '' );
      }
      setImgUrl( data.data.fields.file.url );
    } );
  };

  const linkSingleEntry = `/entries/${ categoria.sys.id }?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0`;

  const getCategoryEntry = async () => {
    await contentful.get( linkSingleEntry ).then(
      data => {
        setCategory( data.data );
        setLoading(false)
      } );
  };

  useEffect( () => {
    getSingleAsset();
    getCategoryEntry();
  }, [] );

  if (category) {
    const categoryAvatar = category.fields.avatar.sys.id;
    contentful.get(
      `/assets/${ categoryAvatar }?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0` )
      .then( res => {
        setCategoryAvatarUrl( res.data.fields.file.url );
        setCategoryAvatarLoading(false)
      } );
  }

  const viewRef = useRef();
  const shareImage = async () => {
    try {
      // capture component
      const uri = await captureRef( viewRef, {
        format: 'png',
      } );
      setModal( false );

      // share
      const shareResponse = await Share.open( {
        url    : uri,
        message: 'curiozitati.app',
      } );
    }
    catch (error) {
      setModal( false );
      // console.log( 'error', error )
    } finally {
      setModal( false );
    }
  };

  if (loading) {
    return <ContentLoader
      speed={0.5}
      width={Dimensions.get( 'window' ).width}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#d9d9d9"
      foregroundColor="#b9baa7"
     >
      <Circle cx="31" cy="31" r="15" />
      <Rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
      <Rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
      <Rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
    </ContentLoader>
  }

  return (
    <View style={ [styles.post, { marginTop: 20 }] }>
      <Modal
        animationType="none"
        transparent={ true }
        visible={ modal }
      >
        <View style={ styles.centeredView }>
          <View style={ styles.modalView }>
            <ActivityIndicator
              size="small"
              color="black"
            />
          </View>
        </View>
      </Modal>
      { !categoryScreen && <View style={ styles.postHeader }>
        <TouchableOpacity
          activeOpacity={ 0.4 }
          onPress={ () => navigation.navigate( 'Category', {
            category  : category.fields.denumirea,
            categoryId: category.sys.id,
          } ) }
        >
          { categoryAvatarLoading ? <ContentLoader
            speed={0.5}
            width={40}
            height={40}
            // viewBox="0 0 400 48"
            backgroundColor="#d9d9d9"
            foregroundColor="#b9baa7"
          >
            <Circle cx="20" cy="20" r="20" />
          </ContentLoader> : <Image
            style={ styles.postUserImage }
            source={ {
              uri: `https:${ categoryAvatarUrl }?w=50&h=50`,
            } }
          /> }
        </TouchableOpacity>
        <Text style={ styles.postUsernameText }>{ category
        && category.fields.denumirea }</Text>
        <Pressable
          onPress={ () => {
            setModal( true );
            shareImage();
          } }
          style={ ({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#eceff1' : 'white',
            },
          ] }
        >
          { ({ pressed }) => (
            <Image
              source={ require( '../assets/share.png' ) }
              style={ {
                width    : 25,
                height   : 25,
                alignSelf: 'center',
                marginTop: 5,
              } }
            />
          ) }
        </Pressable>
      </View> }
      {categoryScreen ? <TouchableOpacity activeOpacity={0.8} onPress={ () => {
        setModal( true );
        shareImage();
      } }>
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
      />}

      <View style={ styles.postDescView }>
        { description.length !== 0 && <View>
          <Text style={ styles.postDescUsernameText }>
            <Text style={ styles.postDescText }>
              { shortDescription } <Text
              style={ styles.readMore }
              onPress={ () => {
                setShortDescription( description );
                setReadMore( null );
              } }
            >{ readMore }</Text>
            </Text>
          </Text>
        </View> }
        <View style={ { marginTop: 10 } }>
          <Text
            style={ { color: '#333' } }
          >{ formatDistanceToNowStrict( new Date( data ), { locale: ro } ) } în urmă</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create( {
  image               : {
    height      : Dimensions.get( 'window' ).width,
    width       : Dimensions.get( 'window' ).width,
    // marginTop: 20,
    // marginBottom: 5,
    borderRadius: 4,
    overflow    : 'hidden',
  },
  post                : {
  },
  postHeader          : {
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
  postUserImage       : {
    width       : 40,
    height      : 40,
    borderRadius: 100,
  },
  postUsernameText    : {
    flex      : 1,
    marginLeft: 10,
  },
  postDescView        : {
    backgroundColor  : '#fff',
    paddingHorizontal: 10,
    paddingBottom    : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4ea',
  },
  postDescText        : {
    fontSize  : 16,
    fontWeight: '300',
  },
  postDescUsernameText: {
    fontWeight: 'bold',
    marginTop : 6,
    fontSize  : 16,
  },
  centeredView        : {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
    marginTop     : 22,
  },
  modalView           : {
    margin         : 20,
    backgroundColor: 'white',
    borderRadius   : 20,
    padding        : 25,
    alignItems     : 'center',
    shadowColor    : '#000',
    shadowOffset   : {
      width : 0,
      height: 2,
    },
    shadowOpacity  : 0.25,
    shadowRadius   : 3.84,
    elevation      : 5,
  },
  button              : {
    height: 35,
    width: 35,
    marginRight: 5,
    borderRadius: 4,
  },
  readMore            : {
    fontSize: 14,
    color   : 'gray',
  },
} );

