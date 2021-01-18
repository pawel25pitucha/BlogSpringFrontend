import React, { useState } from 'react'
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
function Register(props) {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const url="http://localhost:8080";

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }
    const nicknameChange = (e) => {
        setNickname(e.target.value);
    }
    const submitHandle=()=> {
        axios({
            method: 'POST',
            url: `${url}/api/user/register`,
            data: {
            name:nickname,
            password: password
            }
          }).then(res=> {
           if(res.data===true) alert("Dziękujmy za rejestrację! Wróć do logowania")
           else alert("Coś poszło nie tak")
        });
        setNickname("");
        setPassword("");
    }
    return (
        <div>
            <div className="LoginPage">
            <div className="login-container">
                <h1>Register</h1>
                <h3>Nickname</h3>
                <input value={nickname} onChange={e => nicknameChange(e)} placeholder="your nickname"></input>
                <h3>Hasło</h3>
                <input value={password} onChange={e => passwordChange(e)} type="password" placeholder="password"></input>
                <PasswordStrengthBar password={password} />
                <button onClick={submitHandle}>Zarejestruj się!</button>
            </div>
            </div>
        </div>
    )
}

export default Register
