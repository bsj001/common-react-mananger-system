import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

//echarts的配置数据
const axisOption = {
  textStyle: {
    color: '#333',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      lineStyle: {
        color: '#17b3a3',
      }
    },
    axisLabel: {
      interval: 0,
      color: '#333',
    }
  },
  yAixs: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#17b3a3',
        }
      },
    },

  ],
  color: ['#2ec7c9', '#b6a2de', '#5eb1ef', '#ffb980', '#d87a80', '#8d98b3'],
  series: [],
}

const normalOption = {
  tooltip: {
    trigger: 'item',
  },
  color: ['#2ec7c9', '#b6a2de', '#5eb1ef', '#ffb980', '#d87a80', '#8d98b3'],
  series: []
}

const Echarts = ({ style, chartData, isAxisChart = true }) => {
  //获取dom实例
  const echartRef = useRef({})
  let echartObj = useRef({})
  useEffect(() => {
    let options;
    //echarts的初始化
    echartObj.current = echarts.init(echartRef.current)
    //设置option
    if (isAxisChart)
    {
      axisOption.xAxis.data = chartData.xAxis;
      axisOption.yAxis = chartData.yAxis;
      axisOption.series = chartData.series;
      options = axisOption;
    } else
    {
      normalOption.series = chartData.series;
      options = normalOption;
    }
    echartObj.current.setOption(options);
  }, [])

  return (
    <div style={style} ref={echartRef}></div>
  )
}


export default Echarts