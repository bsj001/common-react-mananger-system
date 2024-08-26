import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    //：React对boolean类型的attribute的识别方式问题,
    // 解决方案：可以使用1和0的方式来代替true和false。
    collapsed: 0,
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页'
      }
    ],
    currentMenu: {}
  },
  reducers: {
    collapseMenu: state => {
      state.collapsed = !state.collapsed
    },
    selectMenuList: (state, { payload: val }) => {
      if (val.name !== 'home') {
        state.currentMenu = val
        const result = state.tabList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabList.push(val)
        }
      } else if (val.name === 'home' && state.tabList.length === 1) {
        state.currentMenu = {}
      }
    },
    handleCloseTab: (state, { payload: val }) => {
      let res = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(res, 1)
    },
    setCurrentMenu: (state, { payload: val }) => {
      if (val.name === 'home') {
        state.currentMenu = {}
      } else {
        state.currentMenu = val
      }
    },
  }
})

export const { collapseMenu, selectMenuList, handleCloseTab, setCurrentMenu } = tabSlice.actions
export default tabSlice.reducer