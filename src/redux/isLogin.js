import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLogin: false,
  isMenu : false,
  url : '',
}

export const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },

    setIsMenu: (state, action) => {
      state.isMenu = action.payload
    },

    setUrl: (state, action) => {
      state.url = action.payload
    },
  },
})

export const {setIsMenu, setIsLogin, setUrl } = isLoginSlice.actions;

export default isLoginSlice.reducer;