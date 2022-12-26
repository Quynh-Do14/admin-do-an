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
function UpdateCategory(data) {

    const [categoryName, setCategoryName] = useState(data.data.categoryName)

    const { id } = useParams()

    const history = useHistory()

    const handleSubmit = (e) => {
        var formdata = new FormData();
        formdata.append('categoryName', categoryName);
        formdata.append(
            "imgURL",
            document.getElementById("imgURL").files[0],
            document.getElementById('imgURL').value
        );
        var config = {
            method: 'post',
            url: `http://localhost:8080/review/api/updateCategory/${id}`,
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
                history.push('/MainLayout/category-management')
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

                <label>Tên Danh mục:</label>
                <input type="text" class="form-control"
                    onChange={e => setCategoryName(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={categoryName}
                />


                <label>Ảnh:</label>
                <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />
                <br />
                <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9', marginTop: '20px' }} > Nhập </button>

            </form>
        </div>
    )
}

export default UpdateCategory