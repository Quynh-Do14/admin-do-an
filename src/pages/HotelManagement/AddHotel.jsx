import React, { useEffect, useState } from 'react'
import {
  Button, Checkbox, DatePicker, Form, Input,
  InputNumber, Upload, notification, Modal
}
  from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Typography } from 'antd';
import {
  CheckCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import '../../common/Style/InsertForm.css'
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;


function AddHotel() {
  const [hotelName, setHotelName] = useState('')
  const [place, setPlace] = useState('')
  const [price, setPrice] = useState()
  const [description, setDescription] = useState('')
  const [hotline, sethotline] = useState('')
  const [remaining, setRemaining] = useState()
  const [note, setNote] = useState('')
  const [policy, setPolicy] = useState('')
  const [overview, setOverview] = useState()

  const [provinces, setProvinces] = useState([])

  const history = useHistory()
  const backPrev = () => {
    history.push('/hotel-management')
  }

  const handleSubmit = (e) => {
    var formdata = new FormData();
    formdata.append('hotelName', hotelName);
    formdata.append('hotline', hotline);
    formdata.append('place', place);
    formdata.append('price', price);
    formdata.append('overview', overview);
    formdata.append('policy', policy);
    formdata.append('remaining', remaining);
    formdata.append('description', description);
    formdata.append('note', note);
    formdata.append(
      "imgURL",
      document.getElementById("imgURL").files[0],
      document.getElementById('imgURL').value
    );
    var config = {
      method: 'post',
      url: 'http://localhost:8080/review/api/addhotel',
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
        history.push('/MainLayout/hotel-management')
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

  useEffect(() => {
    const DataList = async () => {
      const response = await fetch(`https://provinces.open-api.vn/api/`)
      setProvinces(await response.json())
    };
    DataList(provinces)

  }, [])

  return (
    <div className='page-add'>
      <Title level={2}>Thêm Tour mới</Title>
      <form onSubmit={(e) => handleSubmit(e)} className='form-add'>

        <label>Tên Khách sạn:</label>
        <input type="text" class="form-control"
          required
          onChange={e => setHotelName(e.target.value)} value={hotelName}
        />

        <label>Hotline</label>
        <input type="text" class="form-control"
          required
          onChange={e => sethotline(e.target.value)} value={hotline}
        />

        <label>Địa điểm</label>
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

        <label>Giá tiền:</label>
        <input type="number" class="form-control"
          required
          onChange={e => setPrice(e.target.value)} value={price}
        />

        <label>Số lượng:</label>
        <input type="number" class="form-control"
          required
          onChange={e => setRemaining(e.target.value)} value={remaining}
        />

        <label>Mô tả:</label>
        <textarea type="text" class="form-control"
          required
          onChange={e => setDescription(e.target.value)} value={description}
        />

        <label>Tổng quan:</label>
        <textarea type="text" class="form-control"
          required
          onChange={e => setOverview(e.target.value)} value={overview}
        />
        <label>Chú ý:</label>
        <textarea type="text" class="form-control"
          required
          onChange={e => setNote(e.target.value)} value={note}
        />

        <label>Điều khoản:</label>
        <textarea type="text" class="form-control"
          required
          onChange={e => setPolicy(e.target.value)} value={policy}
        />

        <label>Ảnh:</label>
        <input style={{ border: 'none' }} type="file" class="form-control" id="imgURL" />

        <button class="btn-primary" onClick={backPrev} style={{ backgroundColor: '#ff4d4f' }} > Quay lại </button>

        <button class="btn-primary" type='submit' style={{ backgroundColor: '#108ee9' }} > Nhập </button>

      </form>
    </div>
  )
}

export default AddHotel