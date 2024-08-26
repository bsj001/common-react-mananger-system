import Mock from 'mockjs';
import userApi from '../mockServerData/user';
//拦截接口
Mock.mock(/home\/getData/, function () {
  const tableData = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  return tableData;
});

Mock.mock(/user\/getUser/, userApi.getUserList)