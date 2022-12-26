import React, { useEffect, useState } from 'react'
import {
    Button, Checkbox, DatePicker, Form, Input,
    InputNumber, Upload, notification, Modal,
    Breadcrumb
}
    from 'antd';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Typography } from 'antd';
import {
    CheckCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import '../../common/Style/InsertForm.css'
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import FormSelectProvince from '../../common/controller/FormSelectProvince';
import { FullPageLoading } from '../../common/controller/FullPageLoading';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { TextArea } = Input;
const { Title } = Typography;

function AddPost() {

    const [postName, setPostName] = useState('')
    const [description, setDescription] = useState('')

    const [isLoading, setIsLoading] = useState(false);


    const history = useHistory()
    const backPage = () => {
        history.push('/MainLayout/location-management')
    }

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
            url: 'http://localhost:8080/review/api/addPost',
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
        <div className='page-add'>
            <div className='head-tbl'>
                <Title level={2} italic={true}
                    style={{ textTransform: "capitalize" }}
                >Thêm mới</Title>
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
                <Breadcrumb.Item>Quản lý bài viết</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
            </Breadcrumb>
            <form onSubmit={(e) => handleSubmit(e)} className='form-add'>

                <label>Tên Bài viết:</label>
                <input type="text" class="form-control"
                    required
                    onChange={e => setPostName(e.target.value)}
                    // onChange={handleChange}
                    value={postName}
                />
                <label>Mô tả</label>
                <textarea type="text" class="form-control"
                    style={{ height: '400px' }}
                    required
                    onChange={e => setDescription(e.target.value)}
                    // onChange={handleChange}
                    value={description}
                />

                {/* <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onReady={editor => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setDescription(data);
                    }}
                /> */}

                <label>Ảnh:</label>
                <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />
                <button class="btn-primary" onClick={backPage} style={{ backgroundColor: '#ff4d4f' }} > Quay lại </button>

                <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9' }} > Nhập </button>

            </form>
            <FullPageLoading isLoading={isLoading} />
        </div>
    )
}

export default AddPost