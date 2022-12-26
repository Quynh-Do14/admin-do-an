import axios from 'axios'
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Login.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('quynhdo')
    const [password, setPassword] = useState('quynhdo')
    // const [isLogin, setIsLogin] = useState(sessionStorage.getItem('accessToken')!=null)

    const history = useHistory()
    let setParams = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const LoginSubmit = (e) => {
        e.preventDefault()
        var myHeaders = new Headers()
        myHeaders.append('Contenr-Type', 'application/x-www-form-urlencoded');

        var urlencoded = new URLSearchParams
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/auth/signin", requestOptions)
            .then(res => {
                console.log((res));
                if (res.ok) {
                    return res.json()
                }
                throw new Error(res.status)
            })
            .then(result => {
                console.log((result));
                sessionStorage.setItem('accessToken', result.accessToken)
                sessionStorage.setItem('user_name', result.username)
                // setIsLogin(true)
                history.push('/MainLayout')
            })
            .catch(err => {
                console.log(err);
                alert('Tài khoản hoặc mật khẩu sai')
            })
    }

    // let onLogout =()=>{
    //     setIsLogin(false)
    // }

    // const URL = 'http://localhost:8080/api/auth/signin'
    // function LoginSubmit(e) {
    //     e.preventDefault()
    //     axios.post(URL, {
    //         username: username,
    //         password: password
    //     }).then(res => {
    //         console.log(res)
    //         alert('Đăng nhập thành công')
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         alert('Đăng nhập thất bại')
    //       })
    // }
    return (
        <div className='login'>
        <div className="form-tt">
            <form className="form-signin" onSubmit={LoginSubmit}>
                <h2 className="form-signin-heading"> Please sign in </h2>
                <label for="inputUsername" className="sr-only"> User Name
                </label>
                <input type="text" name="username" value={username} onChange={setParams} placeholder="Nhập tên đăng ký" />
                <label for="inputUsername" className="sr-only"> User Name
                </label>
                <input type="password" name="password" value={password} onChange={setParams} placeholder="Nhập mật khẩu" />
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={LoginSubmit}> Sign in
                </button>
            </form>
        </div>
        </div>
    )
}
export default Login

