import * as Icon from '@ant-design/icons';
import { Card, Col, Row, Table } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';
import { getData } from '../../api';
import MyEcharts from '../../components/echarts';
import './home.css';

//动态获取icon
const iconToElement = (data) => React.createElement(Icon[data])

//table列的数据
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
//订单统计的数据
const countData = [
  {
    'name': '今日支付订单',
    'value': 1234,
    'icon': 'CheckCircleOutlined',
    'color': '#0000FF'
  },
  {
    'name': '今日收藏订单',
    'value': 3421,
    'icon': 'CheckCircleOutlined',
    'color': '#0000FF'
  },
  {
    'name': '今日未支付订单',
    'value': 1234,
    'icon': 'CloseCircleOutlined',
    'color': '#0000FF'
  },
  {
    'name': '本月支付订单',
    'value': 1234,
    'icon': 'CloseCircleOutlined',
    'color': '#0000FF'
  },
  {
    'name': '本月收藏订单',
    'value': 1234,
    'icon': 'CloseCircleOutlined',
    'color': '#808080'
  },
  {
    'name': '今日支付订单',
    'value': 1234,
    'icon': 'InfoCircleOutlined',
    'color': '#808080'
  },
  {
    'name': '今日支付订单',
    'value': 1234,
    'icon': 'QuestionCircleOutlined',
    'color': '#808080'
  },
  {
    'name': '今日支付订单',
    'value': 1234,
    'icon': 'QuestionCircleOutlined',
    'color': '#808080'
  }
];

const chartData = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'line',
      /*
      所有的类型
      typeNames: {
            pie: string;
            bar: string;
            line: string;
            scatter: string;
            effectScatter: string;
            radar: string;
            tree: string;
            treemap: string;
            boxplot: string;
            candlestick: string;
            k: string;
            heatmap: string;
            map: string;
            parallel: string;
            lines: string;
            graph: string;
            sankey: string;
            funnel: string;
            gauge: string;
            pictorialBar: string;
            themeRiver: string;
            sunburst: string;
            custom: string;
            chart: string;
        };
      */
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}

const Home = () => {
  const userImg = require('../../assets/user.png')
  useEffect(() => {
    getData().then((res) => {
      const tableData = res.data;
      setTableData(tableData);
    }, [])

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });


  }, [])

  const [tableData, setTableData] = useState([])
  return (
    <div>
      <Row className='home'>
        <Col span={8}>
          <Card hoverable>
            <div className='user'>
              <img src={userImg} />
              <div className='userInfo'>
                <p className='name'>Admin</p>
                <p className='access'>超级管理员</p>
              </div>
            </div>
            <div className='loginInfo'>
              <p>上次登录时间：<span>2024-01-01</span></p>
              <p>上次登录地点：<span>上海</span></p>
            </div>
          </Card>
          <Card>
            <Table columns={columns} dataSource={tableData} pagination={false} />
          </Card>
        </Col>
        <Col span={16}>
          <div className='num'>
            {
              countData.map((item, index) => {
                return (
                  <Card key={index}>
                    <div className='icon-box' style={{ background: item.color }}>
                      {iconToElement(item.icon)}
                    </div>
                    <div className='detail'>
                      <p className='num'>${item.value}</p>
                      <p className='text'>{item.name}</p>
                    </div>
                  </Card>
                )
              })
            }
          </div>
          <div id="main" style={{ height: '400px' }}></div>
          {chartData && <MyEcharts chartData={chartData} style={{ height: '300px' }} />}
        </Col>
      </Row>
    </div>
  )
}

export default Home