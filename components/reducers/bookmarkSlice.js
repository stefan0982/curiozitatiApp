import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit'

// state model
// {
//   id               : '1',
//   imgUrl           : 'https://',
//   title            : 'title',
//   description      : 'description',
//   categoryAvatarUrl: 'https://',
//   categoryTitle    : 'categoria',
// },

export const bookmarkSlice = createSlice( {
  name        : 'bookmark',
  initialState: {
    savedFacts: [],
  },

  reducers    : {
    addSavedFact: (state, { payload }) => (
      {
        ...state,
        savedFacts: [
          ...state.savedFacts, {
            id               : payload.id,
            title            : payload.title,
            description: payload.description,
            imgUrl           : payload.imgUrl,
            categoryAvatarUrl: payload.categoryAvatarUrl,
            categoryTitle    : payload.categoryTitle,
          },
        ],
      }
    ),
    removeSavedFact(state, { payload }) {
      const newFacts = state.savedFacts.filter(
        savedFact => savedFact.id !== payload )
      state.savedFacts = newFacts
    },
  },
} )

export const {
               addSavedFact,
               removeSavedFact
             } = bookmarkSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectBookmark = state => state.bookmark.saved

export default bookmarkSlice.reducer
