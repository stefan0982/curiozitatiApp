import React                                          from 'react'
import {
  ActivityIndicator, Dimensions,
  Modal,
  StyleSheet,
  View,
} from 'react-native'

const LoadingModal = ({modal}) => {
  return (
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
  )
}

const styles = StyleSheet.create( {
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
} )


export default LoadingModal
