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
import UpdateTour from './UpdateTour';
import FormViewImage from '../../common/controller/FormViewImage';
import FormView from '../../common/controller/FormView';

const { Text } = Input;
const { Title } = Typography;
function ViewTour() {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [isUpdate, setIsUpdate] = useState(false)
    const history = useHistory()

    const [updateData, setUpdateData] = useState({
        nametour: data.nametour,
        time: data.time,
        place: data.place,
        arrival: data.arrival,
        start: data.start,
        tourId: data.tourId,
        price: data.price,
        priceKid: data.priceKid,
        priceKid2: data.priceKid2,
        priceKid3: data.priceKid3,
        remaining: data.remaining,
        description: data.description,
        note: data.note,
        imgURL: data.imgURL,
        scheduleday1: data.scheduleday1,
        scheduleday2: data.scheduleday2,
        scheduleday3: data.scheduleday3,
        scheduleday4: data.scheduleday4,
        position: data.position
    })

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(`http://localhost:8080/review/api/detailtour/${id}`);
            let a = await response.json()
            console.log(a);
            setData(a);
            setUpdateData(a)
        }
        getProduct();
    }, []);

    const backPage = () => {
        history.push('/MainLayout/tour-management')
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
                <Breadcrumb.Item onClick={backPage}>Quản lí Tour</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết Tour</Breadcrumb.Item>
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
                                label={'Tên Tour'}
                                data={data.nametour}
                                scroll={false}
                            />
                            <FormView
                                label={'Địa điểm'}
                                data={data.location}
                                scroll={false}
                            />
                            <FormView
                                label={'Thời gian'}
                                data={data.time}
                                scroll={false}
                            />
                            <FormView
                                label={'Điểm đến'}
                                data={data.place}
                                scroll={false}
                            />

                            <FormView
                                label={'Giá tiền'}
                                data={(data.price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'VNĐ'}
                                scroll={false}

                            />
                            <FormView
                                label={'Giá tiền trẻ em( 5-11 tuổi )'}
                                data={(data.priceKid).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'VNĐ'}
                                scroll={false}
                            />
                            <FormView
                                label={'Giá tiền trẻ em( 2-5 tuổi )'}
                                data={(data.priceKid2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'VNĐ'}
                                scroll={false}
                            />
                            <FormView
                                label={'Giá tiền trẻ em( < 2 tuổi )'}
                                data={(data.priceKid3).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'VNĐ'}
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
                            <FormView
                                className='scroll-flow'
                                label={'Mô tả'}
                                data={data.description}
                                scroll={true}

                            />
                            <FormView
                                className='scroll-flow'
                                label={'Lịch trình'}
                                data={data.scheduleday}
                                scroll={true}
                            />
                            <FormView
                                className='scroll-flow'
                                label={'Ghi chú'}
                                data={data.note}
                                scroll={true}
                            />
                        </div>
                        <button class="btn-primary" onClick={backPage} style={{ backgroundColor: '#ff4d4f' }} > Quay lại </button>

                        <button class="btn-primary" onClick={onUpdate} type='submit' style={{ backgroundColor: '#108ee9' }} > Cập nhật </button>
                    </div>

                    :
                    <div>
                        <UpdateTour data={data} />
                        <button class="btn-primary" onClick={backPage} style={{ backgroundColor: '#ff4d4f' }} > Quay lại </button>

                        <button class="btn-primary" onClick={onOutUpdate} type='submit' style={{ backgroundColor: '#108ee9' }} > Chi tiết </button>
                    </div>
            }





        </div >
    )
}

export default ViewTour;


// const [nametour, setNametour] = useState(data.nametour)
// const [time, setTime] = useState(data.time)
// const [place, setPlace] = useState(data.place)
// const [arrival, setArrival] = useState(data.arrival)
// const [start, setStart] = useState(data)
// const [tourId, setTourId] = useState(data)
// const [price, setPrice] = useState(data.price)
// const [priceKid, setPriceKid] = useState(data.priceKid)
// const [priceKid2, setPriceKid2] = useState(data.priceKid2)
// const [priceKid3, setPriceKid3] = useState(data.priceKid3)
// const [remaining, setRemaining] = useState(data.remaining)
// const [description, setDescription] = useState(data.description)
// const [note, setNote] = useState(data.note)
// const [imgURL, setImgURL] = useState(data.imgURL)
// const [scheduleday1, setsSheduleday1] = useState(data.scheduleday1)
// const [scheduleday2, setsSheduleday2] = useState(data.scheduleday2)
// const [scheduleday3, setsSheduleday3] = useState(data.scheduleday3)
// const [scheduleday4, setsSheduleday4] = useState(data.scheduleday4)
// const [position, setPosition] = useState(data.position)
// const [file, setFile] = useState()