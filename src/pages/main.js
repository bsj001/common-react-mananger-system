import React from 'react';
// import React, { Component, useState } from 'react'
// import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonHeader';
import CommonTag from '../components/commonTag';
const { Content } = Layout;

const Main = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //获取展开收取的状态
  const collapsed = useSelector(state => state.tab.collapsed)
  return (
    <Layout className="main-container">
      <CommonAside collapsed={collapsed} />
      <Layout>
        <CommonHeader collapsed={collapsed} />
        <CommonTag />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default Main