import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isCategory: false,
  isMenu : false,
}

export const isCategorySlice = createSlice({
  name: 'isCategory',
  initialState,
  reducers: {
    setIsCategory: (state, action) => {
      state.isCategory = action.payload
    },

    setIsMenu: (state, action) => {
      state.isMenu = action.payload
    },
  },
})

export const {setIsMenu, setIsCategory } = isCategorySlice.actions;

export default isCategorySlice.reducer;