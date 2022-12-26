import React, { useEffect, useState } from 'react'
import {
    Button, Checkbox, DatePicker, Form, Input,
    InputNumber, Upload, notification, Modal
}
    from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Typography } from 'antd';
import {
    CheckCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import '../../common/Style/InsertForm.css'
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;


function AddVehicle() {
    const [serviceName, setServiceName] = useState('')
    const [place, setPlace] = useState('')
    const [seat, setSeat] = useState()
    const [producer, setProducer] = useState('')
    const [vehicleName, setVehicleName] = useState('')
    const [remaining, setRemaining] = useState()
    const [color, setColor] = useState('')

    const [provinces, setProvinces] = useState([])

    const history = useHistory()
    const backPrev = () => {
        history.push('/vehicle-management')
    }

    const handleSubmit = (e) => {
        var formdata = new FormData();
        formdata.append('serviceName', serviceName);
        formdata.append('vehicleName', vehicleName);
        formdata.append('place', place);
        formdata.append('seat', seat);
        formdata.append('remaining', remaining);
        formdata.append('producer', producer);
        formdata.append('color', color);
        formdata.append(
            "imgURL",
            document.getElementById("imgURL").files[0],
            document.getElementById('imgURL').value
        );
        var config = {
            method: 'post',
            url: 'http://localhost:8080/review/api/addvehicle',
            data: formdata
        };
        e.preventDefault();
        axios(config)
            .then(res => {
                console.log(res);
                notification.open({
                    message: 'Thêm thành công',
                    producer:
                        'Dữ liệu của bạn đã được đẩy lên thành công',
                    icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
                });
                history.push('/MainLayout/vehicle-management')
            })
            .catch(err => {
                console.log(err);
                notification.open({
                    message: 'Thêm thất bại',
                    producer:
                        'Dữ liệu của bạn đã được đẩy lên thất bại',
                    icon: <InfoCircleOutlined style={{ color: '#ff4d4f' }} />,
                });
            })
    }


    return (
        <div className='page-add'>
            <Title level={2}>Thêm Tour mới</Title>
            <form onSubmit={(e) => handleSubmit(e)} className='form-add'>

                <label>Tên Dịch vu:</label>
                <input type="text" class="form-control"
                    required
                    onChange={e => setServiceName(e.target.value)} value={serviceName}
                />

                <label>Nhà sản xuất:</label>
                <textarea type="text" class="form-control"
                    required
                    onChange={e => setProducer(e.target.value)} value={producer}
                />

                <label>Tên xe</label>
                <input type="text" class="form-control"
                    required
                    onChange={e => setVehicleName(e.target.value)} value={vehicleName}
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

                <label>Chỗ ngồi:</label>
                <input type="number" class="form-control"
                    required
                    onChange={e => setSeat(e.target.value)} value={seat}
                />

                <label>Số lượng:</label>
                <input type="number" class="form-control"
                    required
                    onChange={e => setRemaining(e.target.value)} value={remaining}
                />

                <label>Màu sắc:</label>
                <textarea type="text" class="form-control"
                    required
                    onChange={e => setColor(e.target.value)} value={color}
                />

                <label>Ảnh:</label>
                <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />

                <button class="btn-primary" onClick={backPrev} style={{ backgroundColor: '#ff4d4f' }} > Quay lại </button>

                <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9' }} > Nhập </button>

            </form>
        </div>
    )
}

export default AddVehicle