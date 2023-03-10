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
import { Editor } from "@tinymce/tinymce-react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FormSelectProvince from '../../common/controller/FormSelectProvince';
import { FullPageLoading } from '../../common/controller/FullPageLoading';

const { TextArea } = Input;
const { Title } = Typography;

function AddLocation() {

    const [location, setLocation] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [imgURL, setImgURL] = useState('')
    const [postName, setPostName] = useState('')
    const [description, setDescription] = useState('')

    const [categoryList, setCategoryList] = useState([])
    const [postList, setPostList] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`http://localhost:8080/api/category/listCategory`)
            setCategoryList(await response.json())
        };
        DataList()
    }, [])

    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`http://localhost:8080/api/post/listpost`)
            setPostList(await response.json())
        };
        DataList()
    }, [])

    const history = useHistory()
    const backPage = () => {
        history.push('/MainLayout/location-management')
    }

    const handleSubmit = (e) => {
        var formdata = new FormData();
        formdata.append('location', location);
        formdata.append('categoryName', categoryName);
        formdata.append('postName', postName);
        formdata.append('description', description);
        formdata.append(
            "imgURL",
            document.getElementById("imgURL").files[0],
            document.getElementById('imgURL').value
        );
        var config = {
            method: 'post',
            url: 'http://localhost:8080/review/api/addLocation',
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
                history.push('/MainLayout/location-management')
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
        <div className='page-add'>
            <div className='head-tbl'>
                <Title level={2} italic={true}
                    style={{ textTransform: "capitalize" }}
                >Th??m m???i</Title>
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
                <Breadcrumb.Item>Qu???n l?? danh m???c</Breadcrumb.Item>
                <Breadcrumb.Item>Th??m m???i</Breadcrumb.Item>
            </Breadcrumb>
            <form onSubmit={(e) => handleSubmit(e)} className='form-add'>

                <label>T??n ?????a ??i???m:</label>
                <input type="text" class="form-control"
                    required
                    onChange={e => setLocation(e.target.value)}
                    // onChange={handleChange}
                    value={location}
                />

                <label>Danh m???c</label>
                <br />
                <select onChange={e => setCategoryName(e.target.value)}
                    value={categoryName}
                > <option value={''}>
                        Kh??ng c?? danh m???c ?????a ??i???m
                    </option>
                    {categoryList.map(item => (
                        <option value={item.categoryName}>
                            {item.categoryName}
                        </option>
                    ))}
                </select>
                <br />

                <label>B??i vi???t</label>
                <br />
                <select onChange={e => setPostName(e.target.value)}
                    value={postName}
                >
                    <option value={''}>
                        Kh??ng c?? b??i vi???t
                    </option>
                    {postList.map(item => (
                        <option value={item.postName}>
                            {item.postName}
                        </option>
                    ))}
                </select>
                <br />

                <label>M?? t???</label>
                <textarea type="text" class="form-control"
                    style={{ height: '400px' }}
                    required
                    onChange={e => setDescription(e.target.value)}
                    // onChange={handleChange}
                    value={description}
                />
                <label>???nh:</label>
                <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />
                <button class="btn-primary" onClick={backPage} style={{ backgroundColor: '#ff4d4f' }} > Quay l???i </button>

                <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9' }} > Nh???p </button>

            </form>
            <FullPageLoading isLoading={isLoading} />
        </div>
    )
}

export default AddLocation