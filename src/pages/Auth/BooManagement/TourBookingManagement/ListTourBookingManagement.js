import {
    Button, Table, Dropdown, Space, Menu,
    Breadcrumb, Input, Form, Modal, notification
}
    from 'antd';
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    PlusCircleOutlined,
    EditOutlined, FormOutlined, DeleteOutlined,
    CheckCircleOutlined

} from '@ant-design/icons';
import { BrowserRouter, BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';
import { Typography } from 'antd';
const { Title } = Typography;

const ListTourBookingManagement = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([])
    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`http://localhost:8080/review/api/info/listbookTour`)
            setData(await response.json())
        };
        DataList(data)
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


    const SetStatus1 = (id) => {

        Modal.confirm({
            title: 'Trạng thái sẽ được chuyển sang Đang diễn ra',
            onOk: () => {
                axios.post(`http://localhost:8080/review/api/info/SetStatusBookTourFromAccuracyToHappenning/${id}`)
                    .then((res) => {
                        console.log('res', res);
                        notification.open({
                            message: 'Chuyển trạng thái thành công',
                            description:
                                'Trạng thái đã được chuyển sang Đang diễn ra',
                            icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
                        })
                    }
                    )
            }
        })
    }

    const SetStatus2 = (id) => {

        Modal.confirm({
            title: 'Trạng thái sẽ được chuyển sang Hoàn thành chuyến',
            onOk: () => {
                axios.post(`http://localhost:8080/review/api/info/SetStatusBookTourFromHappenningToComplete/${id}`)
                    .then((res) => {
                        console.log('res', res);
                        notification.open({
                            message: 'Chuyển trạng thái thành công',
                            description:
                                'Trạng thái đã được chuyển sang Hoàn thành chuyến',
                            icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
                        })
                    }
                    )
            }
        })
    }

    const SetStatus3 = (id) => {

        Modal.confirm({
            title: 'Trạng thái sẽ được chuyển sang Hủy chuyến',
            onOk: () => {
                axios.post(`http://localhost:8080/review/api/info/SetStatusBookTourToCancelled/${id}`)
                    .then((res) => {
                        console.log('res', res);
                        notification.open({
                            message: 'Chuyển trạng thái thành công',
                            description:
                                'Trạng thái đã được chuyển sang Hủy chuyến',
                            icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
                        })
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
                    >Quản lý danh sách đặt tour</Title>
                    <Form.Item label="Tìm kiếm"><Input /> </Form.Item>
                </div>

                <Breadcrumb
                    style={{
                        margin: '16px 0',
                        fontWeight: '500',
                                    textTransform: 'uppercase',
            backgroundColor:'#fff',
            borderRadius: '10px',
            padding:'0.2%'
                    }}
                >
                    <Breadcrumb.Item>Quản lí Đặt</Breadcrumb.Item>
                    <Breadcrumb.Item>Quản lí Đặt Tour</Breadcrumb.Item>
                </Breadcrumb>
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
                    title='Tên người dùng'
                    dataIndex="fullname"
                    key={"fullname"}
                    width={"120px"}
                />
                <Column
                    title='Số CMT/CCCD'
                    dataIndex="cmt"
                    key={"cmt"}
                    width={"80px"}
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
                    key="address"
                    width={"100px"}
                />
                <Column
                    title='Tên Tour'
                    dataIndex="nametour"
                    key={"nametour"}
                    width={"180px"}
                />
                <Column
                    title='Khởi hành'
                    dataIndex="start"
                    key={"start"}
                    width={"100px"}
                />
                <Column
                    title='Giá tiền'
                    dataIndex="priceTour"
                    key={"priceTour"}
                    width={"120px"}
                    render={(priceTour) => {
                        let priceFormat = priceTour.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                        return <div>{priceFormat} VNĐ</div>
                    }}
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
                    render={(status, record) => {
                        if (status == 1) {
                            return <div style={{ color: 'purple' }}>Đang chờ xác nhận </div>
                        }
                        if (status == 2
                            && (new Date(record.start).toLocaleDateString() <= new Date().toLocaleDateString()) == true
                        ) {
                            return <div style={{ color: 'blue' }}>Đang diễn ra </div>
                        }
                        if (status == 3) {
                            return <div style={{ color: 'green' }}>Đã hoàn thành</div>
                        }
                        if (status == 4) {
                            return <div style={{ color: 'red' }}>Đã hủy</div>
                        }
                        else {
                            return <div style={{ color: 'orange' }}>Đang chờ</div>
                        }

                    }}
                />

                <Column
                    title='Thao tác'
                    dataIndex="action"
                    key="action"
                    width={"5%"}
                    render={(value, record) => {
                        if (record.status == 1) {
                            return <Dropdown overlay={
                                <Menu>
                                    <Menu.Item>
                                        <div onClick={() => SetStatus1(record.id)} style={{ color: 'blue' }}>Xác nhận </div>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <div onClick={() => SetStatus3(record.id)} style={{ color: 'red' }}>Hủy chuyến</div>
                                    </Menu.Item>
                                </Menu>
                            }>
                                <a onClick={e => e.preventDefault()}>
                                    <Space>
                                        <FormOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        }

                        if (record.status == 2) {
                            return <Dropdown overlay={
                                <Menu>
                                    <Menu.Item>
                                        <div style={{ color: 'green' }}>Hoàn thành</div>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <div onClick={() => SetStatus3(record.id)} style={{ color: 'red' }}>Hủy chuyến</div>
                                    </Menu.Item>
                                </Menu>
                            }>
                                <a onClick={e => e.preventDefault()}>
                                    <Space>
                                        <FormOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        }

                        if (record.status == 3) {
                            return <Dropdown overlay={
                                <Menu>
                                    <Menu.Item>
                                        <div style={{ color: 'green' }}>Đã hoàn thành</div>
                                    </Menu.Item>
                                </Menu>
                            }>
                                <a onClick={e => e.preventDefault()}>
                                    <Space>
                                        <FormOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        }

                        else {
                            return <Dropdown overlay={
                                <Menu>
                                    <Menu.Item>
                                        <div style={{ color: 'red' }}>Đã hủy</div>
                                    </Menu.Item>
                                </Menu>
                            }>
                                <a onClick={e => e.preventDefault()}>
                                    <Space>
                                        <FormOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        }

                    }}
                />
            </Table>
        </div>
    );
};

export default ListTourBookingManagement;