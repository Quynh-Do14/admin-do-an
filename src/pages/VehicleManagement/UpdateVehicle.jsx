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
function UpdateVehicle(data) {
    const [serviceName, setServiceName] = useState(data.data.serviceName)
    const [place, setPlace] = useState(data.data.place)
    const [seat, setSeat] = useState(data.data.seat)
    const [producer, setProducer] = useState(data.data.producer)
    const [vehicleName, setVehicleName] = useState(data.data.vehicleName)
    const [remaining, setRemaining] = useState(data.data.remaining)
    const [color, setColor] = useState(data.data.color)
    const { id } = useParams()
    const history = useHistory()

    const [provinces, setProvinces] = useState([])

    const backPage = () => {
        history.push('/MainLayout/hotel-management')
    }

    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`https://provinces.open-api.vn/api/`)
            setProvinces(await response.json())
        };
        DataList(provinces)

    }, [])

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
            url: `http://localhost:8080/review/api/updatevehicle/${id}`,
            data: formdata
        };;
        axios(config)
            .then(res => {
                console.log(res);
                notification.open({
                    message: 'Th??m th??nh c??ng',
                    description:
                        'D??? li???u c???a b???n ???? ???????c ?????y l??n th??nh c??ng',
                    icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
                });
                history.push('/MainLayout/vehicle-management')
            })
            .catch(err => {
                console.log(err);
                notification.open({
                    message: 'Th??m th???t b???i',
                    description:
                        'D??? li???u c???a b???n ???? ???????c ?????y l??n th???t b???i',
                    icon: <InfoCircleOutlined style={{ color: '#ff4d4f' }} />,
                });
            })
    }

    return (
        <div>

            <form onSubmit={(e) => handleSubmit(e)} className='form-add'>

                <label>T??n D???ch vu:</label>
                <input type="text" class="form-control"
                    required
                    onChange={e => setServiceName(e.target.value)} value={serviceName}
                />

                <label>Nh?? s???n xu???t:</label>
                <textarea type="text" class="form-control"
                    required
                    onChange={e => setProducer(e.target.value)} value={producer}
                />

                <label>T??n xe</label>
                <input type="text" class="form-control"
                    required
                    onChange={e => setVehicleName(e.target.value)} value={vehicleName}
                />

                <label>?????a ??i???m</label>
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

                <label>Ch??? ng???i:</label>
                <input type="number" class="form-control"
                    required
                    onChange={e => setSeat(e.target.value)} value={seat}
                />

                <label>S??? l?????ng:</label>
                <input type="number" class="form-control"
                    required
                    onChange={e => setRemaining(e.target.value)} value={remaining}
                />

                <label>M??u s???c:</label>
                <textarea type="text" class="form-control"
                    required
                    onChange={e => setColor(e.target.value)} value={color}
                />

                <label>???nh:</label>
                <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />
                <br />
                <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9' }} > Nh???p </button>

            </form>
        </div>
    )
}

export default UpdateVehicle