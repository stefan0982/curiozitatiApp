import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
}                      from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
}                      from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage    from '@react-native-async-storage/async-storage'
import bookmarkReducer from '../reducers/bookmarkSlice'

const persistConfig = {
  key    : 'root',
  version: 1,
  storage: AsyncStorage,
}

const reducers = combineReducers( {
  bookmark: bookmarkReducer,
} )

const persistedReducer = persistReducer( persistConfig, reducers )

// state
export const store = configureStore( {
  reducer   : persistedReducer,
  middleware: getDefaultMiddleware( {
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  } ),
} )

export const persistor = persistStore( store )
