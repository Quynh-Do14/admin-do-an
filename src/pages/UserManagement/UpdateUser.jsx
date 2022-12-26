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
function UpdateUser(data) {
    const [username, setUsername] = useState(data.data.username)
    const [email, setEmail] = useState(data.data.email)
    const [phonenumber, setPhonenumber] = useState(data.data.phonenumber)
    const [address, setAddress] = useState(data.data.address)

    const [provinces, setProvinces] = useState([])

    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`https://provinces.open-api.vn/api/`)
            setProvinces(await response.json())
        };
        DataList()
    }, [])

    const { id } = useParams()

    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/review/api/updateUser/${id}`, {
            username: username,
            email: email,
            phonenumber: phonenumber,
            address: address
        })
            .then(res => {
                console.log(res);
                notification.open({
                    message: 'Thêm thành công',
                    email:
                        'Dữ liệu của bạn đã được đẩy lên thành công',
                    icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
                });
                history.push('/MainLayout/user-management')
            })
            .catch(err => {
                console.log(err);
                notification.open({
                    message: 'Thêm thất bại',
                    email:
                        'Dữ liệu của bạn đã được đẩy lên thất bại',
                    icon: <InfoCircleOutlined style={{ color: '#ff4d4f' }} />,
                });
            })
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className='form-add'>

                <label>Tên Người dùng:</label>
                <input type="text" class="form-control"
                    onChange={e => setUsername(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={username}
                />

                <label>Email:</label>
                <input type="text" class="form-control"
                    required
                    onChange={e => setEmail(e.target.value)}
                    // onChange={(e)=>handleChange(e)}
                    value={email}
                />
                <label>Số điện thoại:</label>
                <input type="text" class="form-control"
                    onChange={e => setPhonenumber(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={phonenumber}
                />

                <label>Địa chỉ</label>
                <br />
                <select onChange={e => setAddress(e.target.value)}
                    value={address}
                >
                    {provinces.map(item => (
                        <option value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <br />
                <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9', marginTop: '20px' }} > Nhập </button>

            </form>
        </div>
    )
}

export default UpdateUser