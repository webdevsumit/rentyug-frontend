import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  searchString: '',
}

export const searchStringSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.count = action.payload
    },
  },
})

export const {setSearchString } = searchStringSlice.actions;

export default searchStringSlice.reducer;