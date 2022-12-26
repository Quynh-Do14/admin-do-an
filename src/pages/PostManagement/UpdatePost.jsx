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
function UpdatePost(data) {
    const [postName, setPostName] = useState(data.data.postName)
    const [description, setDescription] = useState(data.data.description)

    const { id } = useParams()

    const history = useHistory()
    const handleSubmit = (e) => {
        var formdata = new FormData();
        formdata.append('postName', postName);
        formdata.append('description', description);
        formdata.append(
            "imgURL",
            document.getElementById("imgURL").files[0],
            document.getElementById('imgURL').value
        );
        var config = {
            method: 'post',
            url: `http://localhost:8080/review/api/updatePost/${id}`,
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
                history.push('/MainLayout/post-management')
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

                <label>Tên Bài viết:</label>
                <input type="text" class="form-control"
                    onChange={e => setPostName(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={postName}
                />

                <label>Mô tả:</label>
                <textarea type="text" class="form-control"
                    required
                    style={{ height: '400px' }}
                    onChange={e => setDescription(e.target.value)}
                    // onChange={(e)=>handleChange(e)}
                    value={description}
                />

                <label>Ảnh:</label>
                <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />
                <br />
                <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9', marginTop: '20px' }} > Nhập </button>

            </form>
        </div>
    )
}

export default UpdatePost