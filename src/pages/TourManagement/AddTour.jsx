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

// const initialState = {
//   nametour: '',
//   time: '',
//   place: '',
//   arrival: '',
//   start: '',
//   tourId: '',
//   price: '',
//   priceKid: '',
//   priceKid2: '',
//   priceKid3: '',
//   remaining: '',
//   description: '',
//   note: '',
//   imgURL: '',
// }

function AddTour() {
  const [nametour, setNametour] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState('')
  const [tourId, setTourId] = useState('')
  const [price, setPrice] = useState()
  const [priceKid, setPriceKid] = useState()
  const [priceKid2, setPriceKid2] = useState()
  const [priceKid3, setPriceKid3] = useState()
  const [remaining, setRemaining] = useState()
  const [description, setDescription] = useState('')
  const [note, setNote] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [scheduleday, setsSheduleday] = useState('')
  // const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  const [file, setFile] = useState()

  const [locationList, setLocationList] = useState([])
  const [provinces, setProvinces] = useState([])

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const DataList = async () => {
      const response = await fetch(`http://localhost:8080/review/api/listLocation`)
      setLocationList(await response.json())
    };
    DataList(locationList)
  }, [])

  useEffect(() => {
    const DataList = async () => {
      const response = await fetch(`https://provinces.open-api.vn/api/`)
      setProvinces(await response.json())
    };
    DataList(provinces)
  }, [])

  const history = useHistory()
  const backPage = () => {
    history.push('/MainLayout/tour-management')
  }

  const handleSubmit = (e) => {
    var formdata = new FormData();
    formdata.append('nametour', nametour);
    formdata.append('time', time);
    formdata.append('place', place);
    formdata.append('tourId', tourId);
    formdata.append('price', price);
    formdata.append('priceKid', priceKid);
    formdata.append('priceKid2', priceKid2);
    formdata.append('priceKid3', priceKid3);
    formdata.append('remaining', remaining);
    formdata.append('description', description);
    formdata.append('note', note);
    formdata.append('scheduleday', scheduleday);
    formdata.append(
      "imgURL",
      document.getElementById("imgURL").files[0],
      document.getElementById('imgURL').value
    );
    var config = {
      method: 'post',
      url: 'http://localhost:8080/review/api/addtour',
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
        history.push('/MainLayout/tour-management')
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

  // const handleChange = (e) => {
  //   const { nametour, value } = e.target;
  //   setState({ ...state, [nametour]: value });
  // }

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

        <label>Tên Tour:</label>
        <input type="text" class="form-control"
          required
          onChange={e => setNametour(e.target.value)}
          // onChange={handleChange}
          value={nametour}
        />

        <label>Địa điểm</label>
        <br />
        <select onChange={e => setLocation(e.target.value)}
          class="form-control"
          value={location}
        >
          {locationList.map(item => (
            <option value={item.location}>
              {item.location}
            </option>
          ))}
        </select>
        <br />

        <label>Thời gian</label>
        <input type="text"
          required
          onChange={e => setTime(e.target.value)}
          // onChange={handleChange}
          value={time}
        />

        {/* <label>Tỉnh thành</label>
        <br />
        <select onChange={e => setPlace(e.target.value)}
          value={place}
        >
          {provinces.map(item => (
            <option value={item.name}>
              {item.name}
            </option>
          ))}
        </select> */}
        <FormSelectProvince
          label={'Tỉnh thành'}
          value={place}
          setValue={setPlace}
        />

        <br />

        <label>Mã Tour:</label>
        <input type="number" class="form-control"
          required
          onChange={e => setTourId(e.target.value)}
          // onChange={handleChange}
          value={tourId}
        />

        <label>Giá tiền:</label>
        <input type="number" class="form-control"
          required
          onChange={e => setPrice(e.target.value)}
          // onChange={handleChange}
          value={price}
        />

        <label>Giá tiền trẻ em (5-12)tuổi:</label>
        <input type="number" class="form-control"
          required
          onChange={e => setPriceKid(e.target.value)}
          // onChange={handleChange}
          value={priceKid}
        />

        <label>Giá tiền trẻ em (2-5)tuổi:</label>
        <input type="number" class="form-control"
          required
          onChange={e => setPriceKid2(e.target.value)}
          // onChange={handleChange}
          value={priceKid2}
        />

        <label>Giá tiền trẻ em (2)tuổi:</label>
        <input type="number" class="form-control"
          required
          onChange={e => setPriceKid3(e.target.value)}
          // onChange={handleChange}
          value={priceKid3}
        />

        <label>Số lượng:</label>
        <input type="number" class="form-control"
          required
          onChange={e => setRemaining(e.target.value)}
          // onChange={handleChange}
          value={remaining}
        />

        <label>Mô tả:</label>
        <textarea type="text" class="form-control"
          required
          onChange={e => setDescription(e.target.value)}
          // onChange={handleChange}
          value={description}
        />
        <br />
        <label>Ghi chú:</label>
        <textarea type="text" class="form-control"
          required
          onChange={e => setNote(e.target.value)}
          // onChange={handleChange}
          value={note}
        />
        <br />
        <label>Lịch trình:</label>
        <textarea type="text" class="form-control"
          style={{ height: '400px' }}
          required
          onChange={e => scheduleday(e.target.value)}
          // onChange={handleChange}
          value={scheduleday}
        />
        <label>Ảnh:</label>
        <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />

        <button class="btn-primary" onClick={backPage} style={{ backgroundColor: '#ff4d4f' }} > Quay lại </button>

        <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9' }} > Nhập </button>

      </form>
      <FullPageLoading isLoading={isLoading} />
    </div >
  )
}

export default AddTour