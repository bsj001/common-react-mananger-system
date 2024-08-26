import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuConfig from '../../config/index';
import { selectMenuList } from '../../store/reducers/tab';
const { Sider } = Layout

//动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

//处理菜单的数据
const items = MenuConfig.map((item) => {
  //没有子菜单
  const child = {
    key: item.path,
    icon: iconToElement(item.icon),
    label: item.label
  }
  //有子菜单
  if (item.children) {
    child.children = item.children.map(i => {
      return {
        key: i.path,
        label: i.label
      }
    })
  }

  return child
})



const CommonAside = ({ collapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //添加数据到store
  const setTabsList = (val) => {
    dispatch(selectMenuList(val));
  }


  const selectMenu = (e) => {
    let data;
    MenuConfig.forEach(item => {
      //找到当前的数据
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item
        //如果是有二级菜单
        if (e.keyPath.length > 1) {
          data = item.children.find(child => {
            return child.path == e.key
          })
        }
      }
    })
    setTabsList({
      path: data.path,
      name: data.name,
      label: data.label
    })
    navigate(e.key)
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className='app-name'>{collapsed ? '通用后台' : '通用后台管理系统'}</h3>
      <Menu
        collapsed={collapsed}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          height: '100%'
        }}
        onClick={selectMenu}
      />
    </Sider>
  )
}
export default CommonAside