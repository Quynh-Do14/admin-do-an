import React, { useEffect, useState } from 'react'
import {
  PieChartOutlined,
  UserOutlined,
  UnorderedListOutlined,
  DownOutlined,
  CarOutlined,
  GroupOutlined,
  BankOutlined,
  AppstoreOutlined,
  FileProtectOutlined,
  AccountBookOutlined,
  ExportOutlined,
  ReadOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, Dropdown, Space } from 'antd';
import './MainLayout.css'
import AddTour from '../TourManagement/AddTour';
import RoutesMain from '../../routes/main.routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { useRouter } from 'next/router';
import logo from '../../Assets/logo.png'
import SubMenu from 'antd/lib/menu/SubMenu';
import avatar from '../../Assets/avatar.png';
import ListTourManagement from '../TourManagement/ListTourManagement';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  let { path, url } = useRouteMatch();

  const history = useHistory()
  const logOut = () => {
    history.push('/')
    sessionStorage.clear()
  }
  const menu = () => {
    return (
      <Menu>
        <Menu.Item>
          <Button onClick={logOut}><ExportOutlined /> Logout</Button>
        </Menu.Item>
      </Menu>
    )
  }

  // useEffect(()=>{
  //     if(!sessionStorage.getItem('accessToken')) {
  //         history.push('/')
  //     }
  // },[])

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout>
        <Sider collapsible collapsed={collapsed} theme="light"
          className='left-menu'
          onCollapse={(value) => setCollapsed(value)}>

          <div className="logo"> <img className='logo-admin' src={logo} /></div>
          <Menu className='menu-layout' defaultSelectedKeys={['1']} mode="inline">

            <Menu.Item key="/Dashboard" icon={<PieChartOutlined />}> <a href={`${url}/Dashboard`} >  Dashboard </a> </Menu.Item>

            <Menu.Item key="/Category" icon={<AppstoreOutlined />} > <a href={`${url}/category-management`} > Quản lý Danh Mục Địa Điểm </a> </Menu.Item>

            <Menu.Item key="/post-management" icon={<ReadOutlined />} > <a href={`${url}/post-management`} > Quản lý Bài viết </a> </Menu.Item>

            <Menu.Item key="/location-management" icon={<EnvironmentOutlined />} > <a href={`${url}/location-management`} > Quản lý Địa Điểm </a> </Menu.Item>

            <SubMenu key={'/cate-management'} title="Quản lý Danh mục" icon={<UnorderedListOutlined />}>
              <Menu.Item key="/tour-management" icon={<GroupOutlined />}> <a href={`${url}/tour-management`} > Quản lý Tour </a> </Menu.Item>
              <Menu.Item key="/hotel-management" icon={<BankOutlined />}> <a href={`${url}/hotel-management`} >Quản lý Khách sạn </a> </Menu.Item>
              <Menu.Item key="/vehicle-management" icon={<CarOutlined />}> <a href={`${url}/vehicle-management`} >Quản lý Phương tiện </a> </Menu.Item>
            </SubMenu>

            <SubMenu key={'/booking-management'} title="Quản lý Đặt" icon={<AccountBookOutlined />}>
              <Menu.Item key="/tour-book" icon={<GroupOutlined />}> <a href={`${url}/booking-tour-management`} >Quản lý đặt Tour </a>  </Menu.Item>
              <Menu.Item key="/hotel-book" icon={<BankOutlined />}> <a href={`${url}/booking-hotel-management`}>Quản lý đặt Khách sạn </a> </Menu.Item>
              {/* <Menu.Item key="/vehicle-book" icon={<CarOutlined />} > <a href={`${url}/booking-vehicle-management`} >Quản lý đặt Xe </a> </Menu.Item> */}
            </SubMenu>

            <Menu.Item key="/user-management" icon={<UserOutlined />}> <a href={`${url}/user-management`} > Quản lý người dùng </a> </Menu.Item>
            {/* <Menu.Item key="/report-management" icon={<FileProtectOutlined />}><a href={`${url}/report`} > Báo cáo </a> </Menu.Item> */}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background layout-header">
            <div className='header-item'>
              <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()}>
                  <Space >
                    <div ><img className='avatar' src={avatar} /></div>
                    <div className='user_name'>{sessionStorage.getItem('user_name')}
                      <DownOutlined />
                    </div>
                  </Space>
                </a>
              </Dropdown>

            </div>
          </Header>

          <Content
            style={{
              margin: '0 16px',
              padding: '0 12px'
            }}
          >

            <div
              className="site-layout-background main-layout"
              style={{
                minHeight: 360,
              }}
            >
              <RoutesMain />
              {/* 
              <Router>
                <Switch>
                  <Route path='/addTour'><AddTour /> </Route>
                  <Route path='/updateTour/:id'><UpdateTour /> </Route>
                  <Route path={`${url}/tour-management`}><ListTourManagement /> </Route>

                  <Route path='/hotel-management'><ListHotelManagement /> </Route>
                  <Route path='/addHotel'><AddHotel /> </Route>

                  <Route path='/user-management'><ListUserManagement /> </Route>

                  <Route path='/booking-tour-management'><ListTourBookingManagement /> </Route>

                  <Route path='/booking-hotel-management'> <ListHotelBookingManagement /> </Route>

                  <Route path='/booking-vehicle-management'> </Route>
                </Switch>
              </Router> */}

            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout >
  );
}

export default MainLayout
