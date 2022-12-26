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
import axios from 'axios';
import {
    BrowserRouter, BrowserRouter as Router, Routes,
    Route, Link, Switch, useRouteMatch, NavLink
} from "react-router-dom";
import { Typography } from 'antd';
import { FullPageLoading } from '../../common/controller/FullPageLoading';
const { Title } = Typography;

const LocationManagement = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    let { path, url } = useRouteMatch();

    const [data, setData] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    const DataList = async () => {
        const response = await fetch(`http://localhost:8080/review/api/listLocation`)
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


    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Bạn có muốn xóa',
            onOk: () => {
                axios.delete(`http://localhost:8080/review/api/deleteLocation/${id}`)
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

    const rowSelection = {
        columnWidth: 10,
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
                    >Quản lý danh mục</Title>
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
                    <Breadcrumb.Item>Quản lí Địa điểm</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={start} loading={loading}>
                    <Link to={`${url}/addLocation`}>Thêm mới </Link>
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
                //    rowSelection={rowSelection}
                dataSource={data}
                bordered
                size='middle'
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
                    title='Tên Địa điểm'
                    dataIndex="location"
                    key="location"
                    width={"500px"}
                />
                <Column
                    title='Tên Danh mục'
                    dataIndex="categoryName"
                    key="categoryName"
                    width={"500px"}
                />
                <Column
                    title='Tên Bài viết'
                    dataIndex="postName"
                    key="postName"
                    width={"500px"}
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
                                    <NavLink to={`${url}/viewLocation/${record.id}`}> <div style={{ color: 'blue' }}><InfoCircleOutlined /> Chi tiết</div></NavLink>
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

export default LocationManagement;