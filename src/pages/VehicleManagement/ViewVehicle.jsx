import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom';

import '../../common/Style/FormView.css'
import axios from 'axios';
import {
    Button, Checkbox, DatePicker, Form, Input,
    InputNumber, Upload, notification, Modal,
    Breadcrumb, Typography
}
    from 'antd';
import {
    CheckCircleOutlined,
    InfoCircleOutlined
}
    from '@ant-design/icons';
import { Editor } from "@tinymce/tinymce-react";
import FormViewImage from '../../common/controller/FormViewImage';
import FormView from '../../common/controller/FormView';
import UpdateVehicle from './UpdateVehicle';

const { Text } = Input;
const { Title } = Typography;
function ViewVehicle() {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [isUpdate, setIsUpdate] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(`http://localhost:8080/review/api/detailvehicle/${id}`);
            let a = await response.json()
            console.log(a);
            setData(a);
        }
        getProduct();
    }, []);

    const backPage = () => {
        history.push('/MainLayout/vehicle-management')
    }

    const onUpdate = () => {
        setIsUpdate(true)
    }

    const onOutUpdate = () => {
        setIsUpdate(false)
    }

    return (
        <div className='view-page'>
            <div className='head-tbl'>
                <Title level={2} italic={true}
                    style={{ textTransform: "capitalize" }}
                >Mô tả chi tiết</Title>
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
                <Breadcrumb.Item onClick={backPage}>Quản lý Dịch vụ Phương tiện</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết Dịch vụ Phương tiện</Breadcrumb.Item>
            </Breadcrumb>


            {
                JSON.stringify(data) != '{}' && isUpdate == false
                    ?
                    <div className='form-view'>
                        <div className='form-view-data'>
                            <FormViewImage
                                label={'Ảnh'}
                                data={"http://localhost:8080/uploads/" + data.imgURL}
                            />
                            <FormView
                                label={'Tên Dịch vụ'}
                                data={data.serviceName}
                                scroll={false}
                            />
                            <FormView
                                label={'Nhà Sản xuất'}
                                data={data.producer}
                                scroll={false}
                            />
                            <FormView
                                label={'Tên Xe'}
                                data={data.vehicleName}
                                scroll={false}
                            />
                            <FormView
                                label={'Địa điểm'}
                                data={data.place}
                                scroll={false}
                            />
                            <FormView
                                label={'Ghi chú'}
                                data={data.seat}
                                scroll={false}
                            />
                            <FormView
                                label={'Màu sắc'}
                                data={data.color}
                                scroll={false}
                            />
                            <FormView
                                label={'Số lượng'}
                                data={
                                    data.remaining == 0
                                        ?
                                        "Đã hết"
                                        :
                                        data.remaining
                                }
                                scroll={false}
                            />



                        </div>
                        <button class="btn-primary" onClick={backPage} style={{ backgroundColor: '#ff4d4f' }} > Quay lại </button>

                        <button class="btn-primary" onClick={onUpdate} type='submit' style={{ backgroundColor: '#108ee9' }} > Cập nhật </button>
                    </div>

                    :
                    <div>
                        <UpdateVehicle data={data} />
                        <button class="btn-primary" onClick={backPage} style={{ backgroundColor: '#ff4d4f' }} > Quay lại </button>

                        <button class="btn-primary" onClick={onOutUpdate} type='submit' style={{ backgroundColor: '#108ee9' }} > Chi tiết </button>
                    </div>
            }





        </div >
    )
}

export default ViewVehicle;
