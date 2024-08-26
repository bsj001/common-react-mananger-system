import { Button, Card, Form, Input, InputNumber, Modal, Popconfirm, Select, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import './user.css';
const { Option } = Select;
const User = () => {

  const confirm = (rowData) => {
    console.log(rowData)
  }
  const cancel = () => { }

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
      title: '性别',
      dataIndex: 'sex',
      key: 'gender',
      render: (gender) => {
        return gender ? '男' : '女'
      }
    },
    {
      title: '操作',
      render: (rowData) => {
        return (
          <div className='flex-box'>
            <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)} type='primary'>编辑</Button>
            <Popconfirm
              title="提示"
              description="是否要删除删除这个用户？"
              onConfirm={(rowData) => confirm(rowData)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"

            >
              <Button danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ];


  const [tableData, setTableData] = useState({})

  const getTableData = () => {
    getUser().then((res) => {
      const tableData = res.data;
      setTableData(tableData);
    })
  }

  useEffect(() => {
    getTableData()
  }, [])

  const handleClick = (operation, data) => {
    setIsModalOpen(true);
    setModalType(operation === 'edit' ? true : false);
    if (operation === 'edit')
    {
      const cloneData = { ...data }
      //表单数据回填
      form.setFieldsValue(cloneData)
    }
  }

  const handleFinish = (e) => {
    console.log(e)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  const initModalType = () => {
    setModalType(true);
  };

  const [messageApi] = message.useMessage();

  const handleOk = () => {
    form.validateFields()
      .then((data) => {
        console.log(data)
      })
      .catch((e) => {
        error()
      })
    form.resetFields();
    setIsModalOpen(false);
  };

  const error = (e) => {
    messageApi.open({
      type: 'error',
      content: e,
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    console.log(value)
    switch (value)
    {
      case 1:
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        break;
      case 0:
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        break;
      default:
    }
  };


  return (
    <div>
      <Card>
        <div className='user'>
          <Button type='primary' onClick={() => handleClick('add', {})}>+新增</Button>
          <Form
            layout='inline'
            onFinish={handleFinish}
          >
            <Form.Item name='keyword'>
              <Input placeholder='请输入用户名'></Input>
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type='primary'>搜索</Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
      <Card>
        <Table rowKey={'id'} columns={columns} dataSource={tableData.list} pagination={false} />
      </Card>
      <Modal
        open={isModalOpen}
        title={modalType ? '编辑用户' : '新增用户'}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='确定'
        cancelText='取消'
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          labelAlign='left'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {
            modalType &&
            <Form.Item
              name='id'
              hidden
            ></Form.Item>
          }
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              {
                required: true,
                message: '请输入年龄',
              },
              {
                type: 'number',
                message: '年龄必须是数字'
              }
            ]}
          >
            <InputNumber
              min='0'
              max='200'
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="请选择性别"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="1">男</Option>
              <Option value="0">女</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User