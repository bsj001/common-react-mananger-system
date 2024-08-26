import { Space, Tag } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleCloseTab, setCurrentMenu } from '../../store/reducers/tab';
import './index.css';



const CommonTag = () => {
  const tabList = useSelector(state => state.tab.tabList)
  const currentMenu = useSelector(state => state.tab.currentMenu)
  const dispatch = useDispatch()
  const action = useLocation()
  const navigate = useNavigate()
  const handleClose = (tag, index) => {
    let length = tabList.length - 1
    dispatch(handleCloseTab(tag));
    //关闭的不是当前的tag
    if (tag.path !== action.pathname) {
      return
    }
    if (index === length) {
      //设置当前数据
      const curData = tabList[index - 1]
      dispatch(setCurrentMenu(curData))
      navigate(curData.path)
    } else {
      if (tabList.length > 1) {
        const nextData = tabList[index + 1]
        dispatch(setCurrentMenu(nextData))
        navigate(nextData.path)
      }
    }
  };

  const handleChange = (tag) => {
    dispatch(setCurrentMenu(tag))
    navigate(tag.path)
  };

  const setTag = (flag, tab, index) => {
    return (
      flag ?
        <Tag color='#55acee' closeIcon onClose={() => handleClose(tab, index)} key={tab.name}>{tab.label}</Tag>
        :
        <Tag closeIcon onClick={() => handleChange(tab)} onClose={() => handleClose(tab, index)} key={tab.name}>{tab.label}</Tag>
    )
  }
  return (
    <div>
      <Space className='commonTag' size={[0, 8]} wrap>
        {
          currentMenu.name &&
          tabList.map((tab, index) => (setTag(tab.path === currentMenu.path, tab, index)))
        }
      </Space>
    </div>
  )

}

export default CommonTag