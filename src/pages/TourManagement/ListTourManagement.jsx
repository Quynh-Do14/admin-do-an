import {
  Button, Table, Dropdown, Space, Menu,
  Breadcrumb, Input, Form, Modal, notification
}
  from 'antd';
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined, DeleteOutlined, PlusCircleOutlined,
  LoadingOutlined, CheckCircleOutlined, EditOutlined,
  DownOutlined, FormOutlined, InfoCircleOutlined
} from '@ant-design/icons';
import {
  BrowserRouter, BrowserRouter as Router, Routes
  , Route, Link, NavLink, Switch, useRouteMatch,
  useHistory
} from "react-router-dom";
import axios from 'axios';
import { Typography } from 'antd';
import { FullPageLoading } from '../../common/controller/FullPageLoading';
const { Title } = Typography;

const ListTourManagement = () => {
  let { path, url } = useRouteMatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory()

  const DataList = async () => {
    const response = await fetch(`http://localhost:8080/review/listtour`)
    setData(await response.json())
  };

  useEffect(() => {
    DataList()
  }, [])

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };


  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };



  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa',
      onOk: () => {
        axios.delete(`http://localhost:8080/review/api/deletetour/${id}`)
          .then((res) => {
            console.log('res', res);
            notification.open({
              message: 'Xóa thành công',
              description:
                'Dữ liệu đã xóa thành công',
              icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
            })
            setIsLoading(true)
            DataList()
          }
          )
      }
    })
  }

  const ViewDetail = (record) => {
    history.push(`${url}/viewTour/${record.id}`)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className='form-list'>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button> */}
        <div className='head-tbl'>
          <Title level={2} italic={true}
            style={{ textTransform: "capitalize" }}
          >Quản lý danh sách Tour</Title>
          <Form.Item label="Tìm kiếm"><Input /> </Form.Item>
        </div>

        <Breadcrumb
          style={{
            margin: '16px 0',
            fontWeight: '500',
            textTransform: 'uppercase',
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '0.2%',
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '0.2%'
          }}
        >
          <Breadcrumb.Item>Quản lý danh mục</Breadcrumb.Item>
          <Breadcrumb.Item>Quản lý Tour</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={start} loading={loading}>
          {/* <Link to='/addTour'>Thêm mới </Link> */}
          <Link to={`${url}/addTour`}>Thêm mới</Link>
        </Button>

        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        // rowSelection={rowSelection} 
        dataSource={data}
        size='middle'
        bordered >
        <Column
          title='STT'
          dataIndex="STT"
          key="STT"
          width='10px'
          render={(value, record, index) => {
            return <div style={{ textAlign: 'center' }}>{index + 1} </div>
          }}

        />
        <Column
          title='Tên Tour'
          dataIndex="nametour"
          key="nametour"
          width={"200px"}
          render={(value, record) => {
            console.log('record', record)
            console.log('record.id', record.id)
            return (
              <div>
                <NavLink to={`${url}/viewTour/${record.id}`}>{record.nametour}</NavLink>
              </div>
            )
          }
          }
        />
        <Column
          title='Giá tiền'
          dataIndex="price"
          key="price"
          width={"80px"}
          render={(price) => {
            let priceFormat = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            return <div>{priceFormat} VNĐ</div>
          }}
        />
        <Column
          title='Thời gian'
          dataIndex="time"
          key="time"
          width={"100px"}
        />
        <Column
          title='Điểm đến'
          dataIndex="place"
          key="place"
          width={"100px"}
        />
        <Column
          title='Địa điểm'
          dataIndex="location"
          key="location"
          width={"100px"}
        />

        <Column
          title='Số lượng'
          dataIndex="remaining"
          key="remaining"
          width={"100px"}
          render={(remaining) => {
            if (remaining == 0) {
              return (
                <div style={{ color: 'red' }}>Đã hết</div>
              )
            }
            else {
              return <div style={{ color: 'green' }}>{remaining} </div>
            }
          }}
        />

        <Column
          title='Thao tác'
          dataIndex="action"
          key="action"
          width={"5%"}
          render={(value, record) => (
            <Dropdown overlay={
              <Menu>

                <Menu.Item>
                  <NavLink to={`${url}/viewTour/${record.id}`}> <div style={{ color: 'blue' }}><InfoCircleOutlined /> Chi tiết</div></NavLink>
                </Menu.Item>

                <Menu.Item>
                  <div onClick={() => handleDelete(record.id)}
                    style={{ color: 'red' }}
                  ><DeleteOutlined /> Xóa</div>
                </Menu.Item>
              </Menu>
            }>
              <a onClick={e => e.preventDefault()}>
                <Space>
                  <FormOutlined />
                </Space>
              </a>
            </Dropdown>

          )}
        />

      </Table>
      <FullPageLoading isLoading={isLoading} />
    </div>
  );
};

export default ListTourManagement;