import {
    Button, Table, Dropdown, Space, Menu,
    Breadcrumb, Input, Form, Modal, notification
}
    from 'antd';
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    EditOutlined, FormOutlined
    , PlusCircleOutlined, DeleteOutlined, InfoCircleOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import { BrowserRouter, BrowserRouter as Router, Routes, Route, Link, Switch, NavLink, useRouteMatch } from "react-router-dom";
import { Typography } from 'antd';
import axios from 'axios';
const { Title } = Typography;

const ListUserManagement = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])

    const DataList = async () => {
        const response = await fetch(`http://localhost:8080/review/api/listUser`)
        setData(await response.json())
    };
    useEffect(() => {
        DataList(data)
    }, [])

    const start = () => {
        setLoading(true); // ajax request after empty completing

        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };


    let { path, url } = useRouteMatch();

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Bạn có muốn xóa',
            onOk: () => {
                axios.delete(`http://localhost:8080/review/api/deleteUser/${id}`)
                    .then((res) => {
                        console.log('res', res);
                        notification.open({
                            message: 'Xóa thành công',
                            description:
                                'Dữ liệu đã xóa thành công',
                            icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
                        })
                        DataList()
                    }
                    )
            }
        })
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
                    >Quản lý Người dùng</Title>
                    <Form.Item label="Tìm kiếm"><Input /> </Form.Item>
                </div>
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        padding: '0.2%'
                    }}
                >
                    <Breadcrumb.Item>Quản lí Người dùng</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={start} loading={loading}>
                    {/* <Link to='/addTour'>Thêm mới </Link> */}
                    <a href='./AddTour'>Thêm mới</a>
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
                bordered
            >

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
                    title='Tên người dùng'
                    dataIndex="username"
                    key={"username"}
                    width={"120px"}
                />
                <Column
                    title='Email'
                    dataIndex="email"
                    key={"email"}
                    width={"80px"}
                />
                <Column
                    title='Số điện thoại'
                    dataIndex="phonenumber"
                    key={"phonenumber"}
                    width={"100px"}
                />
                <Column
                    title='Địa chỉ'
                    dataIndex="address"
                    key={"address"}
                    width={"100px"}
                />
                <Column
                    title='Ngày tạo'
                    dataIndex="createdAt"
                    key={"createdAt"}
                    width={"100px"}

                />
                <Column
                    title='Trạng thái'
                    dataIndex="status"
                    key={"status"}
                    width={"100px"}
                    render={(status) => {
                        if (status == 1) {
                            return <div style={{ color: 'red' }}>Đang đi du lịch </div>
                        }
                        else {
                            return <div style={{ color: 'green' }}>Có thể đặt tour </div>
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
                                    <NavLink to={`${url}/viewUser/${record.id}`}> <div style={{ color: 'blue' }}><InfoCircleOutlined /> Chi tiết</div></NavLink>
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
        </div>
    );
};

export default ListUserManagement;