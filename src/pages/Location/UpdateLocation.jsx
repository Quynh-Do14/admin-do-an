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
function UpdateLocation(data) {

    const [location, setLocation] = useState(data.data.location)
    const [categoryName, setCategoryName] = useState(data.data.categoryName)
    const [postName, setPostName] = useState(data.data.postName)
    const [description, setDescription] = useState(data.data.description)
    const [imgURL, setImgURL] = useState(data.data.imgURL)
    const [file, setFile] = useState()

    const [isUpdate, setIsUpdate] = useState(false)
    const [cateList, setCateList] = useState([])
    const [postList, setPostList] = useState([])

    const { id } = useParams()

    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`http://localhost:8080/api/category/listCategory`)
            setCateList(await response.json())
        };
        DataList()
    }, [])

    const history = useHistory()

    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`http://localhost:8080/api/post/listpost`)
            setPostList(await response.json())
        };
        DataList()
    }, [])

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
            url: `http://localhost:8080/review/api/updateLocation/${id}`,
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
                history.push('/MainLayout/location-management')
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

                <label>Tên Địa điểm:</label>
                <input type="text" class="form-control"
                    onChange={e => setLocation(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    value={location}
                />

                <label>Danh mục</label>
                <br />
                <select onChange={e => setCategoryName(e.target.value)}
                    value={categoryName}
                >
                    {cateList.map(item => (
                        <option value={item.categoryName}>
                            {item.categoryName}
                        </option>
                    ))}
                </select>
                <br />
                <label>Bài viết</label>
                <br />
                <select onChange={e => setPostName(e.target.value)}
                    value={postName}
                >
                    {postList.map(item => (
                        <option value={item.postName}>
                            {item.postName}
                        </option>
                    ))}
                </select>
                <br />


                <label>Mô tả:</label>
                <textarea type="text" class="form-control"
                    style={{ height: '400px' }}
                    required
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

export default UpdateLocation