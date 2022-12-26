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

function AddCategory() {

  const [categoryName, setCategoryName] = useState('')

  const [isLoading, setIsLoading] = useState(false);


  const history = useHistory()
  const backPage = () => {
    history.push('/MainLayout/location-management')
  }

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
      url: 'http://localhost:8080/review/api/addCategory',
      data : formdata
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
        <Breadcrumb.Item>Quản lý danh mục</Breadcrumb.Item>
        <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
      </Breadcrumb>
      <form onSubmit={(e) => handleSubmit(e)} className='form-add'>

        <label>Tên Danh mục:</label>
        <input type="text" class="form-control"
          required
          onChange={e => setCategoryName(e.target.value)}
          // onChange={handleChange}
          value={categoryName}
        />


         <label>Ảnh:</label>
          <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL"/> 
        <button class="btn-primary" onClick={backPage} style={{ backgroundColor: '#ff4d4f' }} > Quay lại </button>

        <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9' }} > Nhập </button>

      </form>
      <FullPageLoading isLoading={isLoading} />
    </div>
  )
}

export default AddCategory