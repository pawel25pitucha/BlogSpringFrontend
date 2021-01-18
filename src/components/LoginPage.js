import React, { useState } from 'react'
import '../Styles/LoginPage.css';
import axios from 'axios';
import logIN from '../actions/login';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");


    const passwordChange = (e) => {
        setPassword(e.target.value);
    }
    const nicknameChange = (e) => {
        setNickname(e.target.value);
    }
    const submitHandle=()=> {
        axios({
            method: 'POST',
            url: `${props.url}/api/user/login`,
            data: {
            name:nickname,
            password: password
            }
          }).then(res=> {
            if(Object.keys(res.data).length === 0) alert("Nie udało się zalogować!")
            else{
                    props.loginStatusChange(res.data)
                    dispatch(logIN());
                };
        });
        setNickname("");
        setPassword("");
    }


    return (
        <div className="LoginPage">
            <div className="login-container">
                <h1>Login</h1>
                <h3>Nickname</h3>
                <input value={nickname} onChange={e => nicknameChange(e)} placeholder="your nickname"></input>
                <h3>Hasło</h3>
                <input value={password} onChange={e => passwordChange(e)} type="password" placeholder="password"></input>
                <button onClick={submitHandle}>Login</button>
                <div>
                    <h2>Nie masz konta?</h2><Link to="/register">Zarejestruj się!</Link>
                    <h2>Możesz kontynuować bez logowania:</h2>
                    <Link to="/home" >Przejdź bez logowania</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
