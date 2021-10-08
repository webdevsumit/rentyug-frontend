import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLogin: false,
  isMenu : false,
  url : '',
  unreadMsg : 0
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
    setUnreadMsg: (state, action) => {
      state.unreadMsg = action.payload
    },
  },
})

export const {setIsMenu, setIsLogin, setUrl, setUnreadMsg } = isLoginSlice.actions;

export default isLoginSlice.reducer;