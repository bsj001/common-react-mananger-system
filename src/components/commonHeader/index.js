import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { collapseMenu } from '../../store/reducers/tab';
import './index.css';
const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  const logout = () => { }

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => logout} target="_blank" rel="noopener noreferrer">
          退出
        </a>
      ),
    }
  ];

  const dispatch = useDispatch()

  //点击展开收起按钮
  const setCollapsed = () => {
    dispatch(collapseMenu())
  }

  const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
  return (
    <Header className='header-container'
    >
      <Button
        onClick={() => setCollapsed()}
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{
          fontSize: '16px',
          width: 64,
          height: 32,
          background: '#fff'
        }}
      />
      <Dropdown
        menu={{ items }}
      >
        <Avatar size={36} src={<img src={url} alt="avatar" />} />
      </Dropdown>
    </Header>
  )
}


export default CommonHeader