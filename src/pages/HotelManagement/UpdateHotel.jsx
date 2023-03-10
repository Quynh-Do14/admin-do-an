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
function UpdateHotel(data) {
    const [hotelName, setHotelName] = useState(data.data.hotelName)
    const [hotline, setHotline] = useState(data.data.hotline)
    const [place, setPlace] = useState(data.data.place)
    const [price, setPrice] = useState(data.data.price)
    const [remaining, setRemaining] = useState(data.data.remaining)
    const [description, setDescription] = useState(data.data.description)
    const [note, setNote] = useState(data.data.note)
    const [policy, setPolicy] = useState(data.data.policy)
    const [overview, setOverview] = useState(data.data.overview)

    const [provinces, setProvinces] = useState([])

    const { id } = useParams()
    const history = useHistory()

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
        formdata.append('hotelName', hotelName);
        formdata.append('hotline', hotline);
        formdata.append('place', place);
        formdata.append('price', price);
        formdata.append('remaining', remaining);
        formdata.append('overview', overview);
        formdata.append('policy', policy);
        formdata.append('description', description);
        formdata.append('note', note);
        formdata.append(
            "imgURL",
            document.getElementById("imgURL").files[0],
            document.getElementById('imgURL').value
        );
        var config = {
            method: 'post',
            url: `http://localhost:8080/review/api/updatehotel/${id}`,
            data: formdata
        };
        e.preventDefault();
        axios(config)
            .then(res => {
                console.log(res);
                notification.open({
                    message: 'Th??m th??nh c??ng',
                    description:
                        'D??? li???u c???a b???n ???? ???????c ?????y l??n th??nh c??ng',
                    icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
                });
                history.push('/MainLayout/hotel-management')
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

                <label>T??n Kh??ch s???n:</label>
                <input type="text" class="form-control"
                    onChange={e => setHotelName(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={hotelName}
                />

                <label>Th???i gian</label>
                <input type="text" class="form-control"
                    onChange={e => setHotline(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={hotline}
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
                <br />
                <label>Gi?? ti???n:</label>
                <input type="number" class="form-control"
                    onChange={e => setPrice(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={price}
                />

                <label>S??? l?????ng:</label>
                <input type="number" class="form-control"
                    onChange={e => setRemaining(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={remaining}
                />

                <label>T???ng quan:</label>
                <input type="text" class="form-control"
                    onChange={e => setOverview(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={overview}
                />

                <label>??i???u kho???n:</label>
                <input type="number" class="form-control"
                    onChange={e => setPolicy(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={policy}
                />

                <label>M?? t???:</label>
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

                <label>Ghi ch??:</label>
                <textarea type="text" class="form-control"
                    onChange={e => setNote(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={note}
                />
                <label>???nh:</label>
                <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />
                <br />
                <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9', marginTop: '20px' }} > Nh???p </button>


            </form>
        </div>
    )
}

export default UpdateHotel