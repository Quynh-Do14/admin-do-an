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
function UpdateTour(data) {

    const [nametour, setNametour] = useState(data.data.nametour)
    const [time, setTime] = useState(data.data.time)
    const [place, setPlace] = useState(data.data.place)
    const [tourId, setTourId] = useState(data.data.tourId)
    const [price, setPrice] = useState(data.data.price)
    const [priceKid, setPriceKid] = useState(data.data.priceKid)
    const [priceKid2, setPriceKid2] = useState(data.data.priceKid2)
    const [priceKid3, setPriceKid3] = useState(data.data.priceKid3)
    const [remaining, setRemaining] = useState(data.data.remaining)
    const [description, setDescription] = useState(data.data.description)
    const [note, setNote] = useState(data.data.note)
    const [scheduleday, setsSheduleday] = useState(data.data.scheduleday)

    const [location, setLocation] = useState(data.data.location)

    const [isUpdate, setIsUpdate] = useState(false)
    const [locationList, setLocationList] = useState([])
    const [provinces, setProvinces] = useState([])

    const { id } = useParams()
    const history = useHistory()

    const backPage = () => {
        history.push('/MainLayout/tour-management')
    }

    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`http://localhost:8080/review/api/listLocation`)
            setLocationList(await response.json())
        };
        DataList(locationList)
    }, [])

    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`https://provinces.open-api.vn/api/`)
            setProvinces(await response.json())
        };
        DataList(provinces)

    }, [])

    const handleSubmit = (e) => {
        var formdata = new FormData();
        formdata.append('nametour', nametour);
        formdata.append('time', time);
        formdata.append('place', place);
        formdata.append('tourId', tourId);
        formdata.append('price', price);
        formdata.append('priceKid', priceKid);
        formdata.append('priceKid2', priceKid2);
        formdata.append('priceKid3', priceKid3);
        formdata.append('remaining', remaining);
        formdata.append('description', description);
        formdata.append('note', note);
        formdata.append('scheduleday', scheduleday);
        formdata.append(
            "imgURL",
            document.getElementById("imgURL").files[0],
            document.getElementById('imgURL').value
        );
        var config = {
            method: 'post',
            url: `http://localhost:8080/review/api/updatetour/${id}`,
            data: formdata
        };
        e.preventDefault();
        axios(config)
            .then(res => {
                console.log(res);
                notification.open({
                    message: 'Thêm thành công',
                    description:
                        'Dữ liệu của bạn đã được đẩy lên thành công',
                    icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
                });
                history.push('/MainLayout/hotel-management')
            })
            .catch(err => {
                console.log(err);
                notification.open({
                    message: 'Thêm thất bại',
                    description:
                        'Dữ liệu của bạn đã được đẩy lên thất bại',
                    icon: <InfoCircleOutlined style={{ color: '#ff4d4f' }} />,
                });
            })
    }

    return (
        <div>

            <form onSubmit={(e) => handleSubmit(e)} className='form-add'>

                <label>Tên Tour:</label>
                <input type="text" class="form-control"
                    onChange={e => setNametour(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={nametour}
                />

                <label>Địa điểm</label>
                <br />
                <select onChange={e => setLocation(e.target.value)}
                    value={location}
                >
                    {locationList.map(item => (
                        <option value={item.location}>
                            {item.location}
                        </option>
                    ))}
                </select>
                <br />

                <label>Thời gian</label>
                <input type="text" class="form-control"
                    onChange={e => setTime(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={time}
                />
                <label>Địa điểm</label>
                <br />
                <select onChange={e => setPlace(e.target.value)}
                    value={place}
                >
                    {provinces.map(item => (
                        <option value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <br />

                <label>Mã Tour:</label>
                <input type="number" class="form-control"
                    onChange={e => setTourId(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={tourId}
                />

                <label>Giá tiền:</label>
                <input type="number" class="form-control"
                    onChange={e => setPrice(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={price}
                />

                <label>Giá tiền trẻ em (5-12)tuổi:</label>
                <input type="number" class="form-control"
                    onChange={e => setPriceKid(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={priceKid}
                />

                <label>Giá tiền trẻ em (2-5)tuổi:</label>
                <input type="number" class="form-control"
                    onChange={e => setPriceKid2(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={priceKid2}
                />

                <label>Giá tiền trẻ em (2)tuổi:</label>
                <input type="number" class="form-control"
                    onChange={e => setPriceKid3(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={priceKid3}
                />

                <label>Số lượng:</label>
                <input type="number" class="form-control"
                    onChange={e => setRemaining(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={remaining}
                />

                <label>Mô tả:</label>
                <textarea type="text" class="form-control"
                    required
                    onChange={e => setDescription(e.target.value)}
                    // onChange={(e)=>handleChange(e)}
                    value={description}
                />
                {/* <Editor
                    init={{
                        plugins: 'link image code',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    }}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                // onChange={(e) => handleChange(e)}
                /> */}

                <label>Ghi chú:</label>
                <textarea type="text" class="form-control"
                    onChange={e => setNote(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={note}
                />
                <br />
                <label>Lịch trình:</label>
                <textarea type="text" class="form-control"
                    style={{ height: '400px' }}
                    required
                    onChange={e => scheduleday(e.target.value)}
                    // onChange={handleChange}
                    value={scheduleday}
                />
                <label>Ảnh:</label>
                <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />
                <br />
                <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9', marginTop: '20px' }} > Nhập </button>


            </form>
        </div>
    )
}

export default UpdateTour