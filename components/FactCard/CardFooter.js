import React, { useState }                    from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { formatDistanceToNowStrict }          from 'date-fns'
import { ro }                        from 'date-fns/locale'

const CardFooter = ({description, shortDescription, setShortDescription, data}) => {
  const [readMore, setReadMore] = useState( '... mai mult' )

  return (
    <View style={ styles.postDescView }>
      { description.length !== 0 && <View>
        <Text style={ styles.postDescUsernameText }>
          <Text style={ styles.postDescText }>
            { shortDescription } <Text
            style={ styles.readMore }
            onPress={ () => {
              setShortDescription( description )
              setReadMore( null )
            } }
          >{ description.length > 75 && readMore }</Text>
          </Text>
        </Text>
      </View> }
      <View style={ { marginTop: 10 } }>
        <Text
          style={ { color: '#333' } }
        >{ formatDistanceToNowStrict( new Date( data ), { locale: ro } ) } în
                                                                           urmă</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
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
  readMore            : {
    fontSize: 14,
    color   : 'gray',
  },
} )


export default CardFooter
